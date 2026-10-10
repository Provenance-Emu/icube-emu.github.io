#!/usr/bin/env node
/**
 * Writes data/releases.json: the iCube GitHub releases the Downloads page shows
 * with expandable changelogs. Page-only data -- the AltStore/SideStore feed is
 * built from public/builds by buildParser.ts and never reads this file.
 *
 * What goes in:
 *   - the rolling `alpha` release, whose body carries the real commit list;
 *   - the newest immutable `alpha-<n>` snapshots. Their bodies are boilerplate
 *     with no changelog, so the commits are taken from the compare API between
 *     consecutive snapshots' SHAs. A snapshot at the same commit as the rolling
 *     alpha is dropped (it is the same build);
 *   - any other published release (e.g. 4.1.0beta5), using its own notes.
 *
 * A failed fetch only warns and keeps the previous file: the section is
 * decoration, so it must never fail a deploy.
 */
import fs from 'node:fs';
import path from 'node:path';

const REPO = process.env.RELEASES_REPO || 'Provenance-Emu/iCube';
const OUT = path.join(process.cwd(), 'data', 'releases.json');
const TOKEN = process.env.GITHUB_TOKEN || process.env.GH_TOKEN || '';
const SNAPSHOTS_SHOWN = 6;
const OTHERS_SHOWN = 3;
const MAX_COMMITS = 40;

const headers = (accept) => ({
  accept,
  'user-agent': 'icube-site-build',
  ...(TOKEN ? { authorization: `Bearer ${TOKEN}` } : {}),
});

async function api(url, accept = 'application/vnd.github+json') {
  const res = await fetch(url, { headers: headers(accept) });
  if (!res.ok) throw new Error(`GET ${url} returned HTTP ${res.status}`);
  return res.json();
}

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** [{sha, subject}] -> <ul> with each short SHA linking to the commit. */
function commitsHtml(commits) {
  if (!commits.length) return '';
  const shown = commits.slice(0, MAX_COMMITS);
  const items = shown
    .map((c) => `<li><a href="https://github.com/${REPO}/commit/${c.sha}"><code>${c.sha.slice(0, 7)}</code></a> ${esc(c.subject)}</li>`)
    .join('');
  const more = commits.length > shown.length ? `<p>…and ${commits.length - shown.length} more commits.</p>` : '';
  return `<ul>${items}</ul>${more}`;
}

const isNoise = (subject) => /^Merge /.test(subject) || /\[skip ci\]/.test(subject);

try {
  const all = [];
  for (let page = 1; ; page += 1) {
    const batch = await api(`https://api.github.com/repos/${REPO}/releases?per_page=100&page=${page}`, 'application/vnd.github.full+json');
    all.push(...batch.filter((r) => !r.draft));
    if (batch.length < 100) break;
  }

  const ipaOf = (r) => r.assets.find((a) => a.name === 'Non-Jailbroken.ipa') ?? r.assets.find((a) => /\.ipa$/i.test(a.name));
  const entry = (r, extra) => {
    const ipa = ipaOf(r);
    return {
      tag: r.tag_name,
      title: r.name || r.tag_name,
      prerelease: !!r.prerelease,
      date: (r.published_at || r.created_at || '').slice(0, 10),
      releaseURL: r.html_url,
      downloadURL: ipa?.browser_download_url,
      size: ipa?.size,
      ...extra,
    };
  };

  const rolling = all.find((r) => r.tag_name === 'alpha');
  const rollingSha = rolling?.body?.match(/Alpha Build `([0-9a-f]{7,40})`/)?.[1];
  const out = [];

  if (rolling) {
    // "### Commits since last alpha" is followed by a fenced block of "<sha> <subject>" lines.
    const block = rolling.body?.match(/Commits since last alpha[\s\S]*?```\n([\s\S]*?)```/)?.[1] ?? '';
    const commits = block
      .split('\n')
      .map((l) => l.match(/^([0-9a-f]{7,40}) (.+)$/))
      .filter(Boolean)
      .map((m) => ({ sha: m[1], subject: m[2] }))
      .filter((c) => !isNoise(c.subject));
    out.push(entry(rolling, { kind: 'alpha', commit: rollingSha, changelogHtml: commitsHtml(commits) }));
  }

  // alpha-<n> snapshots, newest first. Their bodies name the commit as (`sha`).
  const snapshots = all
    .map((r) => ({ r, n: Number(/^alpha-(\d+)$/.exec(r.tag_name)?.[1]) }))
    .filter((x) => Number.isFinite(x.n))
    .map((x) => ({ ...x, sha: x.r.body?.match(/\(`([0-9a-f]{7,40})`\)/)?.[1] }))
    .sort((a, b) => b.n - a.n);

  for (let i = 0; i < snapshots.length && out.filter((o) => o.kind === 'snapshot').length < SNAPSHOTS_SHOWN; i += 1) {
    const { r, n, sha } = snapshots[i];
    if (sha && rollingSha && (sha.startsWith(rollingSha) || rollingSha.startsWith(sha))) continue; // same build as the rolling alpha
    const prev = snapshots[i + 1];
    let changelogHtml = '';
    if (sha && prev?.sha) {
      try {
        const cmp = await api(`https://api.github.com/repos/${REPO}/compare/${prev.sha}...${sha}`);
        const commits = (cmp.commits ?? [])
          .map((c) => ({ sha: c.sha, subject: c.commit.message.split('\n')[0] }))
          .filter((c) => !isNoise(c.subject))
          .reverse();
        changelogHtml = commitsHtml(commits);
      } catch (e) {
        console.warn(`fetch-releases: no changelog for ${r.tag_name}: ${e.message}`);
      }
    }
    out.push(entry(r, { kind: 'snapshot', title: `Alpha build ${n}`, commit: sha, changelogHtml }));
  }

  const others = all
    .filter((r) => r.tag_name !== 'alpha' && !/^alpha-\d+$/.test(r.tag_name))
    .sort((a, b) => b.published_at.localeCompare(a.published_at))
    .slice(0, OTHERS_SHOWN);
  for (const r of others) out.push(entry(r, { kind: 'release', changelogHtml: r.body_html || '' }));

  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  fs.writeFileSync(OUT, JSON.stringify({ repo: REPO, fetchedAt: new Date().toISOString(), releases: out }, null, 2) + '\n');
  console.log(`fetch-releases: ${out.length} release(s) from ${REPO} -> ${path.relative(process.cwd(), OUT)}`);
} catch (e) {
  console.warn(`fetch-releases: ${e.message} -- keeping the previous data/releases.json if there is one`);
}

import fs from 'fs';
import path from 'path';

export interface ReleaseEntry {
  tag: string;
  title: string;
  kind: 'alpha' | 'snapshot' | 'release';
  prerelease: boolean;
  date: string;
  releaseURL: string;
  downloadURL?: string;
  size?: number;
  commit?: string;
  /** HTML built by scripts/fetch-releases.mjs from GitHub's own sanitised output or escaped commit subjects. */
  changelogHtml: string;
}

/** Written by scripts/fetch-releases.mjs; absent when the fetch failed (the section is then hidden). */
export function readReleases(): ReleaseEntry[] {
  try {
    const raw = fs.readFileSync(path.join(process.cwd(), 'data', 'releases.json'), 'utf8');
    const parsed = JSON.parse(raw) as { releases?: ReleaseEntry[] };
    return parsed.releases ?? [];
  } catch {
    return [];
  }
}

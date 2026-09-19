/**
 * Live metadata for the rolling `alpha` prerelease on GitHub.
 *
 * The alpha entry in the AltStore/SideStore feeds used to be hardcoded: `size: 1`,
 * `buildVersion: 'alpha'`, and `date: new Date()` (the SITE build time, not the IPA's).
 * All three are wrong in ways that matter:
 *
 *   * `size` is what the store shows before downloading, and SideStore treats a
 *     wildly wrong value as a corrupt source. One byte is not the 87 MB IPA.
 *   * `buildVersion` is how AltStore and SideStore decide an update exists. A value
 *     that never changes cannot signal one, so users sit on an old alpha forever
 *     even though the rolling asset behind the URL has moved on.
 *   * `date` drove nothing but confused everyone reading the feed, because it was
 *     whenever this site last rebuilt.
 *
 * The site is a static export (`output: 'export'`), so this runs at build time. The
 * deploy workflow rebuilds on the companion-release dispatch that iCube's CI sends
 * after publishing the alpha, and again hourly, so the values track the real asset.
 *
 * Every failure path falls back to the previous hardcoded behaviour: a feed that is
 * slightly stale is much better than a build that fails.
 */

export const ALPHA_RELEASE_API =
  'https://api.github.com/repos/Provenance-Emu/iCube/releases/tags/alpha';

export const ALPHA_IPA_ASSET = 'Non-Jailbroken.ipa';

export type AlphaReleaseInfo = {
  /** Real byte count of the published IPA. */
  size: number;
  /** When the asset itself was last replaced, ISO 8601. */
  date: string;
  /**
   * Monotonic build identifier derived from the asset's update time, e.g.
   * `2026.09.19.0208`. The stores compare this against the installed build to
   * decide whether to offer an update, and the rolling tag gives us nothing else
   * that increases. Reading the real CFBundleVersion would mean downloading and
   * unzipping 87 MB during every site build, which is not worth it.
   */
  buildVersion: string;
};

function buildVersionFromTimestamp(iso: string): string {
  const d = new Date(iso);
  const p = (n: number, w = 2) => String(n).padStart(w, '0');
  return [
    d.getUTCFullYear(),
    p(d.getUTCMonth() + 1),
    p(d.getUTCDate()),
    `${p(d.getUTCHours())}${p(d.getUTCMinutes())}`,
  ].join('.');
}

/**
 * Fetch the rolling alpha asset's real size and publish time. Returns null on any
 * failure (offline build, rate limit, renamed asset) so callers keep their defaults.
 */
export async function fetchAlphaReleaseInfo(): Promise<AlphaReleaseInfo | null> {
  try {
    const headers: Record<string, string> = {
      Accept: 'application/vnd.github+json',
      'User-Agent': 'icube-emu.com-feed',
    };
    // Unauthenticated is 60 requests/hour per IP, which is plenty for one build,
    // but use the token when the workflow provides one.
    const token = process.env.GITHUB_TOKEN || process.env.GH_TOKEN;
    if (token) headers.Authorization = `Bearer ${token}`;

    const res = await fetch(ALPHA_RELEASE_API, { headers });
    if (!res.ok) {
      console.warn(`[alphaRelease] GitHub returned ${res.status}; keeping fallback values`);
      return null;
    }

    const body = (await res.json()) as {
      assets?: { name?: string; size?: number; updated_at?: string }[];
    };
    const asset = body.assets?.find((a) => a.name === ALPHA_IPA_ASSET);
    if (!asset?.size || !asset.updated_at) {
      console.warn('[alphaRelease] alpha release has no usable IPA asset; keeping fallback values');
      return null;
    }

    return {
      size: asset.size,
      date: new Date(asset.updated_at).toISOString(),
      buildVersion: buildVersionFromTimestamp(asset.updated_at),
    };
  } catch (error) {
    console.warn('[alphaRelease] lookup failed; keeping fallback values:', error);
    return null;
  }
}

/** Apply live alpha metadata onto the feed's alpha entry, in place of the placeholders. */
export function applyAlphaReleaseInfo<
  T extends { version: string; buildVersion?: string; size: number; date: string }
>(versions: T[], info: AlphaReleaseInfo | null): T[] {
  if (!info) return versions;
  return versions.map((v) =>
    // The alpha entry is the only one whose version starts with "alpha"; the hosted
    // versioned builds carry real version numbers and already have correct sizes.
    v.version.startsWith('alpha')
      ? { ...v, size: info.size, date: info.date, buildVersion: info.buildVersion }
      : v
  );
}

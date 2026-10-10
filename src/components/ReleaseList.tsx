import type { ReleaseEntry } from '@/lib/releases';

const formatDate = (d: string) =>
  new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
const formatSize = (bytes: number) => `${(bytes / (1024 * 1024)).toFixed(1)} MB`;

/**
 * Recent GitHub releases, each with its changelog in a native <details> (no
 * client JS). Page-only: the AltStore/SideStore feed does not read this.
 */
export default function ReleaseList({ releases }: { releases: ReleaseEntry[] }) {
  if (releases.length === 0) return null;
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">📝 Releases &amp; changelogs</h2>
      <p className="text-gray-600 dark:text-gray-300 mb-6">
        The latest builds from GitHub. Expand one to see what changed.
      </p>
      <div className="space-y-4">
        {releases.map((r) => (
          <div key={r.tag} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {r.kind === 'alpha' ? 'Latest alpha' : r.title}
                  {r.prerelease && (
                    <span className="ml-2 text-sm bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 px-2 py-1 rounded">
                      Pre-release
                    </span>
                  )}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {formatDate(r.date)}
                  {r.commit ? <> • <code className="text-xs">{r.commit.slice(0, 7)}</code></> : null}
                  {r.size ? ` • ${formatSize(r.size)}` : ''}
                </p>
              </div>
              <div className="flex flex-col items-stretch sm:items-end gap-2">
                {r.downloadURL && (
                  <a
                    href={r.downloadURL}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors text-center whitespace-nowrap"
                  >
                    Download IPA
                  </a>
                )}
                <a
                  href={r.releaseURL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 dark:text-blue-400 hover:underline text-center sm:text-right"
                >
                  View on GitHub ↗
                </a>
              </div>
            </div>
            {r.changelogHtml && (
              <details className="mt-4 border-t border-gray-200 dark:border-gray-700 pt-3">
                <summary className="cursor-pointer select-none text-sm font-semibold text-blue-600 dark:text-blue-400">
                  What&apos;s new
                </summary>
                <div className="changelog mt-3" dangerouslySetInnerHTML={{ __html: r.changelogHtml }} />
              </details>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

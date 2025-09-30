import { parseBuilds } from '@/lib/buildParser';
import path from 'path';
import Link from 'next/link';

export const dynamic = 'force-static';
export const revalidate = 3600;

export default function DownloadsPage() {
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL || 'https://icube-emu.com';
  const buildsDir = path.join(process.cwd(), 'public', 'builds');
  const versions = parseBuilds(buildsDir, baseURL);

  // Group versions by platform
  const iosVersions = versions.filter(v => v.platform === 'iOS');
  const tvosVersions = versions.filter(v => v.platform === 'tvOS');

  const formatFileSize = (bytes: number) => {
    const mb = bytes / (1024 * 1024);
    return `${mb.toFixed(2)} MB`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-blue-900">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 text-center">
            Downloads
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 text-center max-w-2xl mx-auto">
            Download iCube for iOS or tvOS. For sideloading with AltStore or SideStore, add our source feed.
          </p>

          {/* AltStore/SideStore Source */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              📱 AltStore / SideStore Source
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Add our source to AltStore or SideStore for easy installation and automatic updates:
            </p>
            <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 mb-4">
              <code className="text-sm text-blue-600 dark:text-blue-400 break-all">
                {baseURL}/api/altstore
              </code>
            </div>
            <div className="flex flex-wrap gap-4">
              <a
                href={`altstore://source?url=${encodeURIComponent(`${baseURL}/api/altstore`)}`}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Add to AltStore
              </a>
              <a
                href={`sidestore://source?url=${encodeURIComponent(`${baseURL}/api/sidestore`)}`}
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Add to SideStore
              </a>
              <Link
                href="/api/altstore"
                className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                View JSON Feed
              </Link>
            </div>
          </div>

          {/* External Download Sources */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              🌐 Other Download Sources
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              You can also download iCube from these platforms. These may have different versions or additional release notes:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <a
                href="https://github.com/Provenance-Emu/iCube/releases"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <div className="text-3xl">📦</div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                    GitHub Releases
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    Download directly from GitHub with full release notes and changelogs.
                  </p>
                  <span className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
                    View Releases →
                  </span>
                </div>
              </a>
              <a
                href="https://provenance-emu.itch.io/icube"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <div className="text-3xl">🎮</div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                    itch.io
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    Download from itch.io with optional pay-what-you-want support.
                  </p>
                  <span className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
                    Visit itch.io →
                  </span>
                </div>
              </a>
            </div>
            <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
              <p className="text-sm text-blue-800 dark:text-blue-200">
                <strong>💡 Tip:</strong> Check GitHub Releases for detailed changelogs and release notes for each version.
              </p>
            </div>
          </div>

          {/* iOS Downloads */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <span>📱</span> iOS Builds
            </h2>
            {iosVersions.length === 0 ? (
              <p className="text-gray-600 dark:text-gray-400">No iOS builds available yet.</p>
            ) : (
              <div className="space-y-4">
                {iosVersions.map((version, idx) => (
                  <div
                    key={idx}
                    className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                          {version.version}
                          {version.isBeta && (
                            <span className="ml-2 text-sm bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 px-2 py-1 rounded">
                              Beta {version.betaNumber}
                            </span>
                          )}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          Build {version.buildVersion} • {formatDate(version.date)}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
                          Size: {formatFileSize(version.size)} • Min iOS: {version.minOSVersion}
                        </p>
                      </div>
                      <a
                        href={version.downloadURL}
                        download
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors text-center whitespace-nowrap"
                      >
                        Download IPA
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* tvOS Downloads */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <span>📺</span> tvOS Builds
            </h2>
            {tvosVersions.length === 0 ? (
              <p className="text-gray-600 dark:text-gray-400">No tvOS builds available yet.</p>
            ) : (
              <div className="space-y-4">
                {tvosVersions.map((version, idx) => (
                  <div
                    key={idx}
                    className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                          {version.version}
                          {version.isBeta && (
                            <span className="ml-2 text-sm bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 px-2 py-1 rounded">
                              Beta {version.betaNumber}
                            </span>
                          )}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          Build {version.buildVersion} • {formatDate(version.date)}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
                          Size: {formatFileSize(version.size)} • Min tvOS: {version.minOSVersion}
                        </p>
                      </div>
                      <a
                        href={version.downloadURL}
                        download
                        className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors text-center whitespace-nowrap"
                      >
                        Download IPA
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Installation Instructions */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              📖 Installation Instructions
            </h2>
            <div className="space-y-4 text-gray-600 dark:text-gray-300">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Using AltStore / SideStore (Recommended)
                </h3>
                <ol className="list-decimal list-inside space-y-2 ml-4">
                  <li>Install <a href="https://altstore.io" className="text-blue-600 dark:text-blue-400 hover:underline">AltStore</a> or <a href="https://sidestore.io" className="text-blue-600 dark:text-blue-400 hover:underline">SideStore</a> on your device</li>
                  <li>Tap the &quot;Add to AltStore&quot; or &quot;Add to SideStore&quot; button above</li>
                  <li>Browse to iCube in the app and tap &quot;Install&quot;</li>
                  <li>Enjoy automatic updates!</li>
                </ol>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Manual Installation
                </h3>
                <ol className="list-decimal list-inside space-y-2 ml-4">
                  <li>Download the IPA file for your platform</li>
                  <li>Use a sideloading tool like AltStore, SideStore, or Sideloadly</li>
                  <li>Sign and install the IPA on your device</li>
                  <li>Trust the certificate in Settings → General → VPN & Device Management</li>
                </ol>
              </div>
              <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                <p className="text-sm text-yellow-800 dark:text-yellow-200">
                  <strong>Note:</strong> Beta builds may contain bugs and are intended for testing purposes. 
                  For the most stable experience, use the latest non-beta release.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

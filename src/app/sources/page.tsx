import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sideload Sources',
  description: 'Every AltStore and SideStore feed for iCube and the rest of the Provenance family, including the combined Provenance feed and the iFly feed.',
  alternates: { canonical: 'https://icube-emu.com/sources/' },
};

type SourceEntry = {
  name: string;
  description: string;
  altstoreURL: string;
  sidestoreURL: string;
};

export default function SourcesPage() {
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL || 'https://icube-emu.com';

  const sources: SourceEntry[] = [
    {
      name: 'Provenance (combined feed)',
      description: 'Recommended: one source for every Provenance app.',
      altstoreURL: 'https://provenance-emu.com/apps.json',
      sidestoreURL: 'https://provenance-emu.com/apps.json',
    },
    {
      name: 'iCube',
      description: "iCube's own feed, updated whenever a new build ships.",
      altstoreURL: `${baseURL}/api/altstore`,
      sidestoreURL: `${baseURL}/api/sidestore`,
    },
    {
      name: 'iFly',
      description: "iFly's own feed, updated whenever a new build ships.",
      altstoreURL: 'https://ifly-emu.com/api/altstore',
      sidestoreURL: 'https://ifly-emu.com/api/sidestore',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-blue-900">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 text-center">
            Sideload Sources
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-4 text-center max-w-2xl mx-auto">
            Add any of these sources to AltStore or SideStore to install and auto-update iCube, or any other Provenance app.
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-8 text-center max-w-2xl mx-auto">
            Sideloaded and self-built copies include every Plus feature at no cost. Plus purchases apply to the App Store build.
          </p>

          <div className="space-y-8">
            {sources.map((source) => (
              <div key={source.name} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {source.name}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {source.description}
                </p>
                <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 mb-4">
                  <code className="text-sm text-blue-600 dark:text-blue-400 break-all">
                    {source.altstoreURL}
                  </code>
                </div>
                <div className="flex flex-wrap gap-4">
                  <a
                    href={`altstore://source?url=${encodeURIComponent(source.altstoreURL)}`}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                  >
                    Add to AltStore
                  </a>
                  <a
                    href={`sidestore://source?url=${encodeURIComponent(source.sidestoreURL)}`}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                  >
                    Add to SideStore
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Licenses & Acknowledgements',
  description:
    'Open-source components used in iCube and corresponding source code, per GPL-2.0 and other applicable licenses.',
  alternates: { canonical: 'https://icube-emu.com/licenses/' },
};

type Component = {
  name: string;
  license: string;
  url: string;
  note?: string;
};

const components: Component[] = [
  {
    name: 'Dolphin',
    license: 'GPL-2.0+',
    url: 'https://github.com/JoeMatt/dolphin',
    note: 'Custom modifications by Joseph Mattiello. Corresponding source available at the link above.',
  },
  {
    name: 'MoltenVK',
    license: 'Apache-2.0',
    url: 'https://github.com/KhronosGroup/MoltenVK',
  },
  {
    name: 'ZIPFoundation',
    license: 'MIT',
    url: 'https://github.com/weichsel/ZIPFoundation',
  },
  {
    name: 'Zip',
    license: 'MIT',
    url: 'https://github.com/marmelroy/Zip',
  },
  {
    name: 'GCDWebServer',
    license: 'BSD-3-Clause',
    url: 'https://github.com/swisspol/GCDWebServer',
  },
  {
    name: 'Bugsnag',
    license: 'MIT',
    url: 'https://github.com/bugsnag/bugsnag-cocoa',
  },
  {
    name: 'libretro database',
    license: 'See repository',
    url: 'https://github.com/libretro/libretro-database',
  },
];

export default function Licenses() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-blue-900">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-3 text-center">
            Licenses &amp; Acknowledgements
          </h1>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-10">
            Open-source components used in iCube.
          </p>

          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-8 space-y-8 shadow-lg">
            <section>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                iCube is built on Dolphin and a number of open-source libraries. Each project
                is credited below alongside its license. Where required by license, links point
                to corresponding source.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Components</h2>
              <ul className="space-y-4">
                {components.map(c => (
                  <li key={c.name} className="border-l-2 border-blue-500/40 pl-4">
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <a
                        href={c.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-base font-semibold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-300 hover:underline transition-colors"
                      >
                        {c.name}
                      </a>
                      <span className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-500">
                        {c.license}
                      </span>
                    </div>
                    {c.note && (
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{c.note}</p>
                    )}
                    <p className="text-xs text-gray-500 dark:text-gray-600 mt-1 break-all">{c.url}</p>
                  </li>
                ))}
              </ul>
              <p className="text-xs text-gray-500 dark:text-gray-500 mt-6">
                This list may not be exhaustive. Additional in-tree licenses ship with the app
                bundle and the Dolphin source repository.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Copyright</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                © Joseph Mattiello. iCube and its custom Dolphin modifications
                developed by Joseph Mattiello.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">GPL-2.0 corresponding source</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Per the GPL-2.0+ license under which Dolphin is distributed, the corresponding
                source for the version of Dolphin used in iCube is available at{" "}
                <a
                  href="https://github.com/JoeMatt/dolphin"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:underline transition-colors"
                >
                  github.com/JoeMatt/dolphin
                </a>.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

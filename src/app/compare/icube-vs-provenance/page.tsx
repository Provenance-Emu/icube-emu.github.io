import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'iCube vs. Provenance',
  description:
    'iCube, a standalone GameCube/Wii app, compared to the GameCube core inside Provenance: single-system focus vs. multi-system library, from the same team.',
  alternates: { canonical: 'https://icube-emu.com/compare/icube-vs-provenance/' },
};

const rows: [string, string, string][] = [
  ['Focus', 'GameCube and Wii only', 'Multi-system library (38+ systems, including a GameCube core)'],
  ['Platforms', 'iOS, iPadOS, tvOS', 'iOS, iPadOS, tvOS'],
  ['Distribution', 'Sideload (SideStore / Sideloadly)', 'App Store, or sideload'],
  ['Price', 'Free, open source', 'Free (App Store or sideload); Plus is an optional paid tier'],
  ['iCloud sync', 'Not documented', 'Yes, via Provenance Plus (save states and library sync)'],
  ['Emulation core', 'Dolphin fork, tuned specifically for GameCube/Wii on iOS/tvOS', 'Dolphin core for GameCube (Provenance also bundles cores for many other systems)'],
  ['GameCube formats', 'ISO/GCM, GCZ, RVZ, WIA, WBFS, CISO, NKit', '.iso, .gcm, .gcz, .rvz, .wbfs, .ciso'],
  ['Controllers', 'MFi, PlayStation, Xbox, Switch Pro (Game Controller framework); touch controls; touchscreen Wii IR; DSU motion', 'MFi, Xbox, and PlayStation wireless controllers'],
  ['Save states', 'Yes', 'Yes'],
  ['Memory card emulation', 'Yes', 'Yes'],
  ['Team', 'Joseph Mattiello / Provenance team', 'Joseph Mattiello / Provenance team'],
];

export default function IcubeVsProvenance() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-blue-900">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            iCube vs. Provenance
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-center max-w-2xl mx-auto mb-10">
            Both come from the same team and share Dolphin-lineage GameCube emulation. The
            difference is scope: a dedicated GameCube/Wii app vs. one core inside a much larger
            multi-system emulator.
          </p>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="py-2 pr-4 font-semibold text-gray-900 dark:text-white">Feature</th>
                  <th className="py-2 pr-4 font-semibold text-gray-900 dark:text-white">iCube</th>
                  <th className="py-2 font-semibold text-gray-900 dark:text-white">Provenance (GameCube core)</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 dark:text-gray-300">
                {rows.map(([feature, icube, provenance]) => (
                  <tr key={feature} className="border-b border-gray-100 dark:border-gray-700/50 align-top">
                    <td className="py-3 pr-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">{feature}</td>
                    <td className="py-3 pr-4">{icube}</td>
                    <td className="py-3">{provenance}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Where Provenance stands out
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Provenance is a single app for a whole library of consoles &mdash; NES, SNES, N64,
              PS1, Genesis, and dozens more, alongside GameCube and Wii. If you want one app to
              cover multiple systems, or you want App Store distribution and iCloud sync of your
              library via Provenance Plus, Provenance is the better fit.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Where iCube stands out
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              iCube is built around GameCube and Wii specifically, so features can go deeper on
              just those two systems &mdash; broader disc-format support (including RVZ, WIA,
              and NKit), a touchscreen Wii IR pointer tuned for that one input style, and DSU
              motion-controller support. If GameCube and Wii are all you care about, iCube&apos;s
              narrower focus means fewer settings to dig through to get there.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              See also
            </h2>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/compare/icube-vs-dolphin/" className="text-blue-600 dark:text-blue-400 hover:underline">
                iCube vs. Dolphin &rarr;
              </Link>
              <a
                href="https://provenance-emu.com/systems/gamecube/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                Provenance&apos;s GameCube page &rarr;
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

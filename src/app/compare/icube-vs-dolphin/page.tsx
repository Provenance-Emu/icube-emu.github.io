import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'iCube vs. Dolphin',
  description:
    'How iCube for iOS/tvOS compares to desktop Dolphin: platforms, install method, JIT vs. interpreter, controllers, netplay, and where each one fits.',
  alternates: { canonical: 'https://icube-emu.com/compare/icube-vs-dolphin/' },
};

const rows: [string, string, string][] = [
  ['Platforms', 'iOS, iPadOS, tvOS (Apple TV)', 'Windows, macOS, Linux (unofficial Android builds also exist)'],
  ['Install method', 'Sideload via SideStore (iOS/iPadOS) or Sideloadly (tvOS)', 'Direct download / package manager install, no sideloading needed'],
  ['Execution mode', 'ARM64-optimized CPU interpreter, JIT-less by default (JIT can be enabled via a debugger tool like StikDebug for extra speed)', 'JIT recompiler by default — generally faster than any interpreter'],
  ['Graphics backend', '1,000+ native Metal shaders, tuned for Apple GPUs', 'Vulkan, Direct3D 11/12, OpenGL, and Metal (macOS) backends'],
  ['Controller support', 'MFi, PlayStation, Xbox, and Switch Pro controllers via Apple’s Game Controller framework; touch controls; touchscreen Wii IR pointer; DSU (Cemuhook) motion input', 'Broad controller support including official GameCube USB adapters, DSU pass-through, and extensive remapping'],
  ['Netplay', 'Not documented', 'Built-in netplay for online/LAN multiplayer'],
  ['Save states & memory cards', 'Save states plus virtual memory card emulation', 'Save states plus virtual and raw memory card support'],
  ['Configuration depth', 'Streamlined settings tuned for mobile/tvOS use', 'Extensive per-game graphics, audio, and core configuration'],
  ['Price', 'Free, open source', 'Free, open source'],
  ['Foundation', 'Built on a Dolphin fork', 'The original Dolphin project'],
];

export default function IcubeVsDolphin() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-blue-900">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            iCube vs. Dolphin
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-center max-w-2xl mx-auto mb-10">
            Both are built on the Dolphin emulation core, but they target very different
            hardware. Here&apos;s the honest comparison.
          </p>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="py-2 pr-4 font-semibold text-gray-900 dark:text-white">Feature</th>
                  <th className="py-2 pr-4 font-semibold text-gray-900 dark:text-white">iCube</th>
                  <th className="py-2 font-semibold text-gray-900 dark:text-white">Dolphin (desktop)</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 dark:text-gray-300">
                {rows.map(([feature, icube, dolphin]) => (
                  <tr key={feature} className="border-b border-gray-100 dark:border-gray-700/50 align-top">
                    <td className="py-3 pr-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">{feature}</td>
                    <td className="py-3 pr-4">{icube}</td>
                    <td className="py-3">{dolphin}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Where Dolphin stands out
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Desktop Dolphin is the reference implementation and, on a modern PC, the more
              complete emulator: a full JIT recompiler, more graphics backends, built-in
              netplay, and deep per-game configuration. If you have a Windows, macOS, or Linux
              machine and just want the best-supported GameCube/Wii experience, desktop Dolphin
              is the stronger choice.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Where iCube stands out
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              iCube exists for the platforms Dolphin doesn&apos;t officially reach: iPhone,
              iPad, and Apple TV. Its ARM64-optimized interpreter and 1,000+ native Metal
              shaders are built specifically to get GameCube and Wii games running well on
              Apple silicon without requiring a jailbreak, and its touch controls and
              touchscreen Wii IR pointer are tailored to a phone or tablet screen. If your
              platform is iOS, iPadOS, or tvOS, iCube is the only option of the two.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              See also
            </h2>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/compare/icube-vs-provenance/" className="text-blue-600 dark:text-blue-400 hover:underline">
                iCube vs. Provenance &rarr;
              </Link>
              <a
                href="https://dolphin-emu.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                Dolphin Emulator (official site) &rarr;
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

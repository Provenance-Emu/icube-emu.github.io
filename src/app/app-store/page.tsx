import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'iCube for iPhone, iPad and Apple TV',
  description: 'Import games you own, configure controllers and display settings, and get help with the App Store build of iCube.',
  alternates: { canonical: 'https://icube-emu.com/app-store/' },
};

export default function AppStoreGuide() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-blue-900">
      <div className="container mx-auto px-4 py-16 max-w-3xl">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">iCube on iPhone, iPad and Apple TV</h1>
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 space-y-6 text-gray-700 dark:text-gray-300">
          <p>iCube plays GameCube and Wii games that you own. Bring your own game files: no games, BIOS or console system software are included.</p>
          <p>The App Store build uses interpreter emulation. It does not require a jailbreak, a debugger or JIT setup. Performance depends on the device and game.</p>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Get started</h2>
          <ul className="list-disc pl-6 space-y-3">
            <li>On iPhone or iPad, use Import Game to choose a game file from Files.</li>
            <li>On Apple TV, choose Upload via Wi-Fi in the library, or open Settings → Sync &amp; Network → Web UI &amp; WebDAV. Open the displayed address on a computer on the same network and upload your file.</li>
            <li>Choose a game in the library to play. Touch controls are available on iPhone and iPad; a compatible game controller is recommended.</li>
            <li>Use the pause menu for save states and settings. Keep using the game&apos;s own save feature for long-term progress.</li>
          </ul>
          <p>Crash and performance diagnostics use Sentry and can be turned off in Settings → Privacy → Share Crash Reports.</p>
          <nav aria-label="App Store help" className="flex flex-wrap gap-4 text-blue-600 dark:text-blue-400">
            <Link href="/guide/importing/" className="hover:underline">Importing games</Link>
            <Link href="/guide/wii-system-files/" className="hover:underline">Wii system files</Link>
            <Link href="/controllers/" className="hover:underline">Controllers</Link>
            <Link href="/help/save-state-compatibility/" className="hover:underline">Save state compatibility</Link>
            <Link href="/privacy/" className="hover:underline">Privacy policy</Link>
            <Link href="/support/" className="hover:underline">Support</Link>
          </nav>
          <p className="text-sm">GameCube and Wii are trademarks of Nintendo. iCube is not affiliated with Nintendo. Only use content you are entitled to use.</p>
        </div>
      </div>
    </div>
  );
}

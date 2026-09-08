import type { Metadata } from 'next';
import Link from 'next/link';
import SocialButton, { BmcIcon, PatreonIcon } from '@/components/SocialButton';

export const metadata: Metadata = {
  title: 'Support',
  description: 'Get help with iCube: FAQs, JIT setup, controller pairing, game compatibility, and how to report bugs.',
  alternates: { canonical: 'https://icube-emu.com/support/' },
};

export default function Support() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-blue-900">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Support
          </h1>

          {/* FAQ callout */}
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 mb-8 text-center">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Looking for a quick answer?
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Check the FAQ &amp; Troubleshooting page first &mdash; it covers installation,
              controllers, compatibility, and performance.
            </p>
            <Link
              href="/guide/faq/"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2.5 rounded-lg transition-colors"
            >
              Go to FAQ &amp; Troubleshooting →
            </Link>
          </div>

          {/* Guides Section */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
              Guides
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <Link href="/guide/" className="block p-6 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-2">
                  Full Guide →
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Importing games, supported formats, BIOS setup, and FAQ, all in one place.
                </p>
              </Link>

              <Link href="/guide/bios/" className="block p-6 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-2">
                  GameCube BIOS (IPL) →
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  What the GameCube IPL is, when it&apos;s required, and how to install your
                  own in iCube.
                </p>
              </Link>

              <Link href="/guide/importing/" className="block p-6 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-2">
                  Importing Games →
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Use iCube&apos;s built-in web server to drag and drop ROM/ISO files from
                  your computer.
                </p>
              </Link>

              <Link href="/controllers/" className="block p-6 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-2">
                  Controllers →
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  MFi, PlayStation, Xbox, and Switch controllers, touch controls, and DSU
                  motion support.
                </p>
              </Link>
            </div>
          </div>

          {/* Contact Section */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
              Getting Help
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="text-center p-6 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="text-3xl mb-4">📧</div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Email Support
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Send us your questions or bug reports
                </p>
                <a href="mailto:provenance.emu+icube-support@gmail.com?subject=iCube%20Support"
                   className="text-blue-600 dark:text-blue-400 hover:underline">
                  provenance.emu+icube-support@gmail.com
                </a>
              </div>

              <div className="text-center p-6 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="text-3xl mb-4">💬</div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Discord
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Connect with other users and get help in our Discord server
                </p>
                <a href="https://discord.com/invite/4TK7PU5" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
                  Join Discord
                </a>
              </div>
            </div>
          </div>

          {/* Donate Section (compact) */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Support Development</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">If you find iCube helpful, consider supporting the project.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <SocialButton href="https://buymeacoffee.com/joemattiello" label="Buy Me a Coffee" leftIcon={<BmcIcon className="w-5 h-5" />} variant="bmc" />
              <SocialButton href="https://www.patreon.com/provenance" label="Support on Patreon" leftIcon={<PatreonIcon className="w-5 h-5" />} variant="patreon" />
            </div>
          </div>

          {/* Troubleshooting Section */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
              Troubleshooting Tips
            </h2>

            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="text-green-500 text-xl">✓</div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">Restart the app</h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    Close iCube completely and reopen it to resolve minor issues.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="text-green-500 text-xl">✓</div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">Check available storage</h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    Ensure you have at least 1GB of free space on your device for games and save files.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="text-green-500 text-xl">✓</div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">Update to latest version</h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    Make sure you&apos;re running the latest available build of iCube.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="text-green-500 text-xl">✓</div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">Disable Low Power Mode</h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    For best performance, ensure your device is not in Low Power Mode and has sufficient battery.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="text-green-500 text-xl">✓</div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">Use VBI/CPU tuning</h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    Use the VBI/CPU over/underclock quick sheet in the emulation window to fine-tune smoothness at the cost of frame rate.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="text-green-500 text-xl">✓</div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">Restart your device</h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    A device restart can resolve performance issues and free up memory.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import SocialButton, { BmcIcon, PatreonIcon } from '@/components/SocialButton';

export default function Support() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-blue-900">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Support
          </h1>

          {/* FAQ Section */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
              Frequently Asked Questions
            </h2>

            <div className="space-y-6">
              <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  How do I install games on iCube?
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  You&apos;ll need to provide your own GameCube (ISO) and Wii (WBFS/ISO) game files.
                  These can be imported through iTunes file sharing, cloud storage, or other file management apps.
                  Make sure you own the original games before using ROM files.
                </p>
              </div>

              <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  How do I install iCube (sideload)?
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  iCube is distributed via sideloading for iOS and tvOS. <br /> We recommend using{' '}
                  <a href="https://sideloadly.io" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">Sideloadly</a>{' '}
                  to install the app on your device. For enabling JIT on Apple TV, we recommend{' '}
                  <a href="https://apps.apple.com/us/app/stikdebug/id6744045754" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">StikDebug</a>.
                </p>
              </div>

              <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Which controllers are supported?
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  iCube supports MFi (Made for iPhone) controllers, PlayStation DualShock 4,
                  PlayStation DualSense, Xbox Wireless Controllers, and the Siri Remote on Apple TV.
                  Touch controls are also available on iPhone and iPad.
                </p>
              </div>

              <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  What devices are compatible?
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  iCube requires iOS 16.0 or later for iPhone and iPad, and tvOS 17.0 or later for Apple TV.
                  For optimal performance, we recommend newer devices like iPhone 16 or later,
                  iPad (7th generation) or later, and Apple TV 4K (4th generation).
                </p>
              </div>

              <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Can I save my game progress?
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Yes! iCube supports both in-game saves (like the original consoles) and save states,
                  which allow you to save and load your progress at any point during gameplay.
                  All saves are stored locally on your device.
                </p>
              </div>

              <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Why are some games not working properly?
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  While iCube has high compatibility, some games may have issues due to their complexity
                  or specific hardware requirements. We&apos;re constantly working to improve compatibility
                  through regular updates.
                </p>
              </div>

              <div className="pb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  How can I improve performance?
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  For better performance, try reducing the internal resolution, disabling enhanced features
                  like anti-aliasing, closing other apps, and ensuring your device isn&apos;t overheating.
                  Performance varies based on the game and your device&apos;s capabilities.
                </p>
              </div>
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
                <a href="mailto:support@provenance-emu.com?subject=iCube%20Support"
                   className="text-blue-600 dark:text-blue-400 hover:underline">
                  support@provenance-emu.com
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

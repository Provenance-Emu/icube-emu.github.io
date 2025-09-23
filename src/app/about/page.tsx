import DownloadSection from '@/components/DownloadSection';
import SocialButton, { DiscordIcon, XIcon, BmcIcon, PatreonIcon } from '@/components/SocialButton';

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-blue-900">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            About iCube
          </h1>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              What is iCube?
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              iCube is a GameCube and Wii emulator designed specifically for iOS and tvOS platforms.
              It brings the beloved Nintendo gaming experience to your iPhone, iPad, and Apple TV,
              allowing you to play your favorite GameCube and Wii games anywhere.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Built on Dolphin
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              iCube is based on the renowned Dolphin emulator, which has been the gold standard
              for GameCube and Wii emulation for over a decade. By leveraging Dolphin&apos;s proven
              emulation core and adapting it for iOS, iCube delivers authentic gaming performance
              with high compatibility.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Platform Support
            </h2>
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="text-3xl mb-2">📱</div>
                <h3 className="font-semibold text-gray-900 dark:text-white">iPhone</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Optimized touch controls and responsive design
                </p>
              </div>
              <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="text-3xl mb-2">📋</div>
                <h3 className="font-semibold text-gray-900 dark:text-white">iPad</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Larger screen experience with enhanced controls
                </p>
              </div>
              <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="text-3xl mb-2">📺</div>
                <h3 className="font-semibold text-gray-900 dark:text-white">Apple TV</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Big screen gaming with gamepad support
                </p>
              </div>
            </div>

            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Key Features
            </h2>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2 mb-6">
              <li>High compatibility with GameCube and Wii games</li>
              <li>Native iOS integration and performance optimization</li>
              <li>Support for MFi controllers and gamepad accessories</li>
              <li>Save state functionality and game management</li>
              <li>Customizable controls and settings</li>
              <li>Regular updates and improvements</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              System Requirements
            </h2>
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <ul className="text-gray-600 dark:text-gray-300 space-y-1">
                <li><strong>iOS:</strong> iOS 16.0 or later</li>
                <li><strong>tvOS:</strong> tvOS 17.0 or later</li>
                <li><strong>Device:</strong> iPhone 12 or newer, iPad (6th generation) or newer, Apple TV 4K with JIT support</li>
                <li><strong>Recommendation:</strong> iPhone 16 or newer, iPad (7th generation) or newer, Apple TV 4K (4th generation) without JIT support</li>
                <li><strong>Storage:</strong> Varies by game size</li>
              </ul>
            </div>
          </div>

          <DownloadSection className="mt-8" showEmbed />

          {/* Community Section */}
          <section className="container mx-auto px-4 py-8">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Community</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Join our community for updates, tips, and support.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <SocialButton href="https://discord.com/invite/4TK7PU5" label="Join our Discord" leftIcon={<DiscordIcon className="w-5 h-5" />} variant="discord" />
                <SocialButton href="https://x.com/ProvenanceApp" label="Follow on X/Twitter" leftIcon={<XIcon className="w-5 h-5" />} variant="x" />
              </div>
            </div>
          </section>

          {/* Donate Section (compact) */}
          <section className="container mx-auto px-4 py-8">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Support Development</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">If you find iCube helpful, consider supporting the project.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <SocialButton href="https://buymeacoffee.com/joemattiello" label="Buy Me a Coffee" leftIcon={<BmcIcon className="w-5 h-5" />} variant="bmc" />
                <SocialButton href="https://www.patreon.com/provenance" label="Support on Patreon" leftIcon={<PatreonIcon className="w-5 h-5" />} variant="patreon" />
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

// (no direct button imports needed here since we use DownloadSection)
import DownloadSection from '@/components/DownloadSection';
import SocialButton, { DiscordIcon, XIcon, BmcIcon, PatreonIcon } from '@/components/SocialButton';

export default function Links() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-blue-900">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Links & Resources
          </h1>

          {/* Download Links */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
              Download iCube
            </h2>
            <DownloadSection showEmbed />
          </div>

          {/* Dolphin Resources */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
              Dolphin Emulator Resources
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              iCube is built on the Dolphin emulator. Learn more about the project and get additional resources:
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              <a href="https://dolphin-emu.org/"
                 target="_blank"
                 rel="noopener noreferrer"
                 className="flex items-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors">
                <div className="text-2xl mr-4">🐬</div>
                <div>
                  <h3 className="font-semibold text-blue-900 dark:text-blue-300">Official Dolphin Website</h3>
                  <p className="text-sm text-blue-700 dark:text-blue-400">Learn about the Dolphin project</p>
                </div>
              </a>

              <a href="https://dolphinios.oatmealdome.me"
                 target="_blank"
                 rel="noopener noreferrer"
                 className="flex items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                <div className="text-2xl mr-4">💻</div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Dolphin GitHub</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Source code and development</p>
                </div>
              </a>

              <a href="https://wiki.dolphin-emu.org/"
                 target="_blank"
                 rel="noopener noreferrer"
                 className="flex items-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors">
                <div className="text-2xl mr-4">📚</div>
                <div>
                  <h3 className="font-semibold text-green-900 dark:text-green-300">Dolphin Wiki</h3>
                  <p className="text-sm text-green-700 dark:text-green-400">Compatibility and game guides</p>
                </div>
              </a>

              <a href="https://forums.dolphin-emu.org/"
                 target="_blank"
                 rel="noopener noreferrer"
                 className="flex items-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors">
                <div className="text-2xl mr-4">💬</div>
                <div>
                  <h3 className="font-semibold text-purple-900 dark:text-purple-300">Dolphin Forums</h3>
                  <p className="text-sm text-purple-700 dark:text-purple-400">Community discussions</p>
                </div>
              </a>
            </div>
          </div>

          {/* Community Links */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
              Community & Social
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
              <SocialButton href="https://discord.com/invite/4TK7PU5" label="Join our Discord" leftIcon={<DiscordIcon className="w-5 h-5" />} variant="discord" />
              <SocialButton href="https://x.com/ProvenanceApp" label="Follow on X/Twitter" leftIcon={<XIcon className="w-5 h-5" />} variant="x" />
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <a href="https://x.com/ProvenanceApp"
                  className="flex items-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors">
                <div className="text-2xl mr-4">🐦</div>
                <div>
                  <h3 className="font-semibold text-blue-900 dark:text-blue-300">X / Twitter</h3>
                  <p className="text-sm text-blue-700 dark:text-blue-400">@ProvenanceApp</p>
                </div>
              </a>

              <a href="https://reddit.com/r/EmulationOniOS"
                  className="flex items-center p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-900/30 transition-colors">
                <div className="text-2xl mr-4">📱</div>
                <div>
                  <h3 className="font-semibold text-indigo-900 dark:text-indigo-300">Reddit</h3>
                  <p className="text-sm text-indigo-700 dark:text-indigo-400">r/EmulationOniOS</p>
                </div>
              </a>

              <a href="https://discord.com/invite/4TK7PU5"
                  className="flex items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                <div className="text-2xl mr-4">💬</div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Discord</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Join our server</p>
                </div>
              </a>
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

          {/* Related Projects */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
              Related Projects
            </h2>

            <div className="space-y-4">
              <a href="https://github.com/Provenance-Emu/Provenance"
                 target="_blank"
                 rel="noopener noreferrer"
                 className="flex items-center p-4 bg-red-50 dark:bg-red-900/20 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors">
                <div className="text-2xl mr-4">🎮</div>
                <div>
                  <h3 className="font-semibold text-red-900 dark:text-red-300">Provenance</h3>
                  <p className="text-sm text-red-700 dark:text-red-400">
                    Multi-emulator frontend for iOS featuring many classic consoles
                  </p>
                </div>
              </a>

              <a href="https://dolphinios.oatmealdome.me"
                 target="_blank"
                 rel="noopener noreferrer"
                 className="flex items-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors">
                <div className="text-2xl mr-4">🐬</div>
                <div>
                  <h3 className="font-semibold text-blue-900 dark:text-blue-300">DolphinIOS</h3>
                  <p className="text-sm text-blue-700 dark:text-blue-400">
                    iOS port of Dolphin emulator that inspired iCube
                  </p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

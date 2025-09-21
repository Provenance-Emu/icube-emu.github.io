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
            
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="text-center p-6 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="text-4xl mb-4">📱</div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  iOS App Store
                </h3>
                <div className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors cursor-pointer inline-block">
                  <div className="flex items-center gap-2">
                    <span className="text-xs">Download on the</span>
                  </div>
                  <div className="text-lg font-semibold">App Store</div>
                </div>
              </div>
              
              <div className="text-center p-6 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="text-4xl mb-4">📺</div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Apple TV App Store
                </h3>
                <div className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors cursor-pointer inline-block">
                  <div className="flex items-center gap-2">
                    <span className="text-xs">Available on</span>
                  </div>
                  <div className="text-lg font-semibold">Apple TV</div>
                </div>
              </div>
            </div>
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
              
              <a href="https://github.com/dolphin-emu/dolphin" 
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
            
            <div className="grid md:grid-cols-3 gap-4">
              <a href="#" 
                 className="flex items-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors">
                <div className="text-2xl mr-4">🐦</div>
                <div>
                  <h3 className="font-semibold text-blue-900 dark:text-blue-300">Twitter</h3>
                  <p className="text-sm text-blue-700 dark:text-blue-400">@iCubeApp</p>
                </div>
              </a>
              
              <a href="#" 
                 className="flex items-center p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-900/30 transition-colors">
                <div className="text-2xl mr-4">📱</div>
                <div>
                  <h3 className="font-semibold text-indigo-900 dark:text-indigo-300">Reddit</h3>
                  <p className="text-sm text-indigo-700 dark:text-indigo-400">r/iCubeApp</p>
                </div>
              </a>
              
              <a href="#" 
                 className="flex items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                <div className="text-2xl mr-4">💬</div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Discord</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Join our server</p>
                </div>
              </a>
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
              
              <a href="https://github.com/dolphin-emu/dolphin" 
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
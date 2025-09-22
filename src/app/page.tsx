import Image from 'next/image';
import iphone1 from '@/images/screenshots/ios/iphone1-library.jpg';
import iphone2 from '@/images/screenshots/ios/iphone2-search.jpg';
import iphone3 from '@/images/screenshots/ios/iphone3-emu.png';
import ipad1 from '@/images/screenshots/ipad/ipad1-library.jpg';
import ipad2 from '@/images/screenshots/ipad/ipad2-search.jpg';
import ButtonLink, { GitHubIcon, ItchIcon } from '@/components/ButtonLink';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-blue-900">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            iCube
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-4">
            GameCube & Wii Emulator
          </p>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            Experience classic Nintendo GameCube and Wii games on your iOS devices and Apple TV.
            Built on the proven Dolphin emulator foundation.
          </p>

          {/* App Store Button Placeholder */}
          {/*
            Temporarily disabled until App Store availability.
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <div className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors cursor-pointer">
                <div className="flex items-center gap-2">
                  <span className="text-xs">Download on the</span>
                </div>
                <div className="text-lg font-semibold">App Store</div>
              </div>
              <div className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors cursor-pointer">
                <div className="flex items-center gap-2">
                  <span className="text-xs">Available on</span>
                </div>
                <div className="text-lg font-semibold">Apple TV</div>
              </div>
            </div>
          */}

          {/* Sideloading links moved to Download section below */}
        </div>
      </section>

      {/* Download Section */}
      <section className="container mx-auto px-4 pb-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Download</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            iCube isn’t on the App Store. You can sideload it from the sources below:
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <ButtonLink
              href="https://github.com/Provenance-Emu/iCube/releases"
              leftIcon={<GitHubIcon className="w-5 h-5" />}
            >
              Sideload via GitHub
            </ButtonLink>
            <ButtonLink
              href="https://provenance.itch.io/icube"
              leftIcon={<ItchIcon className="w-5 h-5" />}
            >
              Sideload via itch.io
            </ButtonLink>
          </div>
        </div>
      </section>

      {/* Screenshots Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
          Screenshots
        </h2>

        {/* iPhone Screenshots */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-6 text-center">
            iPhone
          </h3>
          <div className="flex flex-wrap justify-center gap-6">
            {[iphone1, iphone2, iphone3].map((img, idx) => (
              <div key={`iphone-${idx}`} className="bg-gray-200 dark:bg-gray-700 rounded-lg p-4 shadow-lg">
                <div className="rounded-lg overflow-hidden w-64 h-96">
                  <Image
                    src={img}
                    alt={`iPhone screenshot ${idx + 1}`}
                    className="h-full w-full object-cover"
                    sizes="(max-width: 768px) 256px, 256px"
                    priority={idx === 0}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* iPad Screenshots */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-6 text-center">
            iPad
          </h3>
          <div className="flex flex-wrap justify-center gap-6">
            {[ipad1, ipad2].map((img, idx) => (
              <div key={`ipad-${idx}`} className="bg-gray-200 dark:bg-gray-700 rounded-lg p-4 shadow-lg">
                <div className="rounded-lg overflow-hidden w-80 h-60">
                  <Image
                    src={img}
                    alt={`iPad screenshot ${idx + 1}`}
                    className="h-full w-full object-cover"
                    sizes="(max-width: 768px) 320px, 320px"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Apple TV Screenshots */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-6 text-center">
            Apple TV
          </h3>
          <div className="flex flex-wrap justify-center gap-6">
            {[1, 2].map((i) => (
              <div key={`appletv-${i}`} className="bg-gray-200 dark:bg-gray-700 rounded-lg p-4 shadow-lg">
                <div className="w-96 h-54 bg-gray-300 dark:bg-gray-600 rounded-lg flex items-center justify-center">
                  <div className="text-center text-gray-600 dark:text-gray-400">
                    <div className="text-4xl mb-2">📺</div>
                    <div>Apple TV Screenshot {i}</div>
                    <div className="text-sm mt-2">Placeholder</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white dark:bg-gray-800 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Features
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-4">🎮</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">GameCube & Wii Support</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Play your favorite GameCube and Wii games with high compatibility and performance.
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">📱</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">iOS Native</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Optimized for iPhone, iPad, and Apple TV with touch controls and gamepad support.
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Dolphin Based</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Built on the proven Dolphin emulator for accurate emulation and great performance.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

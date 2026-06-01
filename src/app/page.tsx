import type { Metadata } from 'next';
import iphone1 from '@/images/screenshots/ios/iphone1-library.jpg';
import iphone2 from '@/images/screenshots/ios/iphone2-search.jpg';
import iphone3 from '@/images/screenshots/ios/iphone3-emu.webp';
import ipad1 from '@/images/screenshots/ipad/ipad1-library.jpg';
import ipad2 from '@/images/screenshots/ipad/ipad2-search.jpg';

export const metadata: Metadata = {
  title: { absolute: 'iCube – GameCube & Wii Emulator for iOS & tvOS' },
  description: 'Download iCube and play classic Nintendo GameCube and Wii games on your iPhone, iPad, and Apple TV. Fast, accurate emulation based on Dolphin.',
  alternates: { canonical: 'https://icube-emu.com/' },
};
import DownloadSection from '@/components/DownloadSection';
import SocialButton, { DiscordIcon, XIcon, BmcIcon, PatreonIcon } from '@/components/SocialButton';
import Features from '@/components/Features';
import DeviceFrame from '@/components/DeviceFrame';
import VideoShowcase from '@/components/VideoShowcase';
import tvos1 from '@/images/screenshots/tvos/tvos-pause.webp';
import tvos2 from '@/images/screenshots/tvos/tvos-settings.webp';
import tvos3 from '@/images/screenshots/tvos/tvos-sources.webp';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-blue-900">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            i<span className="text-blue-500">Cube</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-4">
            GameCube &amp; Wii Emulator
          </p>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            Experience classic Nintendo GameCube and Wii games on your iOS devices and Apple TV.
            Built on the proven Dolphin emulator foundation.
          </p>
        </div>
      </section>

      {/* Stats row */}
      <section className="container mx-auto px-4 pb-12">
        <div className="max-w-2xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-3">
          {([
            ['No JIT', 'Required'],
            ['Dolphin', 'Foundation'],
            ['3', 'Platforms'],
            ['Free', 'Open Source'],
          ] as const).map(([value, label]) => (
            <div key={label} className="text-center py-4 px-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm">
              <div className="text-xl font-black text-blue-600 dark:text-blue-400">{value}</div>
              <div className="text-xs text-gray-600 dark:text-gray-500 mt-1 uppercase tracking-wide">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Download Section */}
      <DownloadSection className="pb-4" showEmbed />

      {/* Community Section */}
      <section className="container mx-auto px-4 pb-8">
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
      <section className="container mx-auto px-4 pb-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Support Development</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">If you find iCube helpful, consider supporting the project.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <SocialButton href="https://buymeacoffee.com/joemattiello" label="Buy Me a Coffee" leftIcon={<BmcIcon className="w-5 h-5" />} variant="bmc" />
            <SocialButton href="https://www.patreon.com/provenance" label="Support on Patreon" leftIcon={<PatreonIcon className="w-5 h-5" />} variant="patreon" />
          </div>
        </div>
      </section>

      {/* Video Showcase — drop MP4 at public/video/gameplay.mp4 to activate */}
      <VideoShowcase />

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
            {([
              [iphone1, 'iCube game library on iPhone'],
              [iphone2, 'iCube game search on iPhone'],
              [iphone3, 'iCube running a GameCube game on iPhone'],
            ] as const).map(([img, alt], idx) => (
              <DeviceFrame key={`iphone-${idx}`} type="iphone" src={img} alt={alt} priority={idx === 0} />
            ))}
          </div>
        </div>

        {/* iPad Screenshots */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-6 text-center">
            iPad
          </h3>
          <div className="flex flex-wrap justify-center gap-6">
            {([
              [ipad1, 'iCube game library on iPad'],
              [ipad2, 'iCube game search on iPad'],
            ] as const).map(([img, alt], idx) => (
              <DeviceFrame key={`ipad-${idx}`} type="ipad" src={img} alt={alt} />
            ))}
          </div>
        </div>

        {/* Apple TV Screenshots */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-6 text-center">
            Apple TV
          </h3>
          <div className="flex flex-wrap justify-center gap-6">
            {([
              [tvos1, 'iCube pause menu on Apple TV'],
              [tvos2, 'iCube settings on Apple TV'],
              [tvos3, 'iCube game sources on Apple TV'],
            ] as const).map(([img, alt], idx) => (
              <DeviceFrame key={`appletv-${idx}`} type="appletv" src={img} alt={alt} />
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
          <Features compact />
          <div className="text-center mt-8">
            <a href="/features/" className="text-blue-600 dark:text-blue-400 hover:underline font-semibold">See all features →</a>
          </div>
        </div>
      </section>
    </div>
  );
}

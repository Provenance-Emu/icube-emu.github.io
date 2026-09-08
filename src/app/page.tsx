import type { Metadata } from 'next';
import { screenshots } from '@/data/screenshots';

export const metadata: Metadata = {
  title: { absolute: 'iCube – GameCube & Wii Emulator for iOS & tvOS' },
  description: 'Download iCube and play classic Nintendo GameCube and Wii games on your iPhone, iPad, and Apple TV. Fast, accurate emulation based on Dolphin.',
  alternates: { canonical: 'https://icube-emu.com/' },
};
import DownloadSection from '@/components/DownloadSection';
import SocialButton, { DiscordIcon, XIcon, BmcIcon, PatreonIcon } from '@/components/SocialButton';
import StoreBadge, { AltStoreGlyph, SideStoreGlyph } from '@/components/StoreBadge';
import { GitHubIcon } from '@/components/ButtonLink';
import Features from '@/components/Features';
import DeviceFrame from '@/components/DeviceFrame';
import VideoShowcase from '@/components/VideoShowcase';

const ALTSTORE_URL = 'altstore://source?url=' + encodeURIComponent('https://icube-emu.com/api/altstore');
const SIDESTORE_URL = 'sidestore://source?url=' + encodeURIComponent('https://icube-emu.com/api/sidestore');

export default function Home() {
  const iphoneShots = screenshots('iphone', { limit: 3 });
  const ipadShots = screenshots('ipad', { limit: 2 });
  const appletvShots = screenshots('appletv', { limit: 3 });
  const watchShots = screenshots('watch');
  const heroShot = iphoneShots[0];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-blue-900">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-20">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight text-balance">
              GameCube and Wii.
              <br />
              On your iPhone, iPad and Apple TV.
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-xl mx-auto md:mx-0">
              iCube brings classic Nintendo GameCube and Wii games to your Apple devices, built on
              the proven Dolphin emulator foundation. No JIT required.
            </p>
            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
              <StoreBadge
                href={ALTSTORE_URL}
                eyebrow="Add to"
                label="AltStore"
                icon={<AltStoreGlyph className="w-6 h-6" />}
                external={false}
              />
              <StoreBadge
                href={SIDESTORE_URL}
                eyebrow="Add to"
                label="SideStore"
                icon={<SideStoreGlyph className="w-6 h-6" />}
                external={false}
              />
              <StoreBadge
                href="https://github.com/Provenance-Emu/iCube/releases/latest"
                eyebrow="Download from"
                label="GitHub"
                icon={<GitHubIcon className="w-6 h-6" />}
              />
            </div>
          </div>
          {heroShot && (
            <div className="flex justify-center md:justify-end">
              <DeviceFrame
                type="iphone"
                src={heroShot.webp}
                alt={heroShot.alt}
                width={heroShot.width}
                height={heroShot.height}
                priority
                widthClassName="w-72"
              />
            </div>
          )}
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
      <DownloadSection className="pb-4" />

      {/* Community + Support Section */}
      <section className="container mx-auto px-4 pb-8">
        <div className="max-w-4xl mx-auto grid sm:grid-cols-2 gap-6">
          <div className="text-center bg-white/60 dark:bg-gray-900/60 border border-gray-200 dark:border-gray-800 rounded-xl p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Community</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Join our community for updates, tips, and support.
            </p>
            <div className="flex flex-col gap-3 items-center">
              <SocialButton href="https://discord.com/invite/4TK7PU5" label="Join our Discord" leftIcon={<DiscordIcon className="w-5 h-5" />} variant="discord" />
              <SocialButton href="https://x.com/ProvenanceApp" label="Follow on X/Twitter" leftIcon={<XIcon className="w-5 h-5" />} variant="x" />
            </div>
          </div>
          <div className="text-center bg-white/60 dark:bg-gray-900/60 border border-gray-200 dark:border-gray-800 rounded-xl p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Support Development</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">If you find iCube helpful, consider supporting the project.</p>
            <div className="flex flex-col gap-3 items-center">
              <SocialButton href="https://buymeacoffee.com/joemattiello" label="Buy Me a Coffee" leftIcon={<BmcIcon className="w-5 h-5" />} variant="bmc" />
              <SocialButton href="https://www.patreon.com/provenance" label="Support on Patreon" leftIcon={<PatreonIcon className="w-5 h-5" />} variant="patreon" />
            </div>
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
            {iphoneShots.map((shot, idx) => (
              <DeviceFrame
                key={shot.id}
                type="iphone"
                src={shot.webp}
                alt={shot.alt}
                width={shot.width}
                height={shot.height}
                priority={idx === 0}
              />
            ))}
          </div>
        </div>

        {/* iPad Screenshots */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-6 text-center">
            iPad
          </h3>
          <div className="flex flex-wrap justify-center gap-6">
            {ipadShots.map((shot) => (
              <DeviceFrame
                key={shot.id}
                type="ipad"
                src={shot.webp}
                alt={shot.alt}
                width={shot.width}
                height={shot.height}
              />
            ))}
          </div>
        </div>

        {/* Apple TV Screenshots */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-6 text-center">
            Apple TV
          </h3>
          <div className="flex flex-wrap justify-center gap-6">
            {appletvShots.map((shot) => (
              <DeviceFrame
                key={shot.id}
                type="appletv"
                src={shot.webp}
                alt={shot.alt}
                width={shot.width}
                height={shot.height}
              />
            ))}
          </div>
        </div>

        {/* Apple Watch Screenshots: DeviceFrame has no watch frame yet, so this
            renders only as a note that the manifest has items pending a frame. */}
        {watchShots.length > 0 && (
          <div className="mb-16">
            <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-6 text-center">
              Apple Watch
            </h3>
            <div className="flex flex-wrap justify-center gap-6">
              {watchShots.map((shot) => (
                <DeviceFrame
                  key={shot.id}
                  type="ipad"
                  src={shot.webp}
                  alt={shot.alt}
                  width={shot.width}
                  height={shot.height}
                />
              ))}
            </div>
          </div>
        )}
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

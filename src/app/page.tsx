import Image from 'next/image';
import type { Metadata } from 'next';
import { screenshots } from '@/data/screenshots';
import ScreenshotGallery from '@/components/ScreenshotGallery';

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
import VideoShowcase from '@/components/VideoShowcase';

const ALTSTORE_URL = 'altstore://source?url=' + encodeURIComponent('https://icube-emu.com/api/altstore');
const SIDESTORE_URL = 'sidestore://source?url=' + encodeURIComponent('https://icube-emu.com/api/sidestore');

export default function Home() {
  const iphoneShots = screenshots('iphone', { featured: true, limit: 1 });
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
              <a href={heroShot.jpg} className="block w-72 overflow-hidden rounded-2xl border border-white/15 shadow-2xl">
                <Image src={heroShot.webp} alt={heroShot.alt} width={heroShot.width} height={heroShot.height} sizes="288px" priority className="h-auto w-full" />
              </a>
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

      <VideoShowcase />

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

      <section id="screenshots" className="container mx-auto px-4 py-16">
        <h2 className="mb-5 text-center text-3xl font-bold text-gray-900 dark:text-white">See it in action</h2>
        <p className="mx-auto mb-12 max-w-2xl text-center text-sm text-gray-600 dark:text-gray-300">Actual app captures with homebrew games. Game files are imported separately.</p>
        <ScreenshotGallery device="iphone" title="iPhone" />
        <ScreenshotGallery device="ipad" title="iPad" />
        <ScreenshotGallery device="appletv" title="Apple TV" />
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

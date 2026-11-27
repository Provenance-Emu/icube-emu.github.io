import SharedMediaHero from '@provenance-emu/web-media/hero';
import MediaGallery from '@provenance-emu/web-media/gallery';
import type { Metadata } from 'next';
import { galleryGroups } from '@/data/gallery';

export const metadata: Metadata = {
  title: { absolute: 'iCube – GameCube & Wii Emulator for iOS & tvOS' },
  description: 'Download iCube and play classic Nintendo GameCube and Wii games on your iPhone, iPad, and Apple TV. Fast, accurate emulation based on Dolphin.',
  alternates: { canonical: 'https://icube-emu.com/' },
};
import DownloadSection from '@/components/DownloadSection';
import SocialButton, { DiscordIcon, XIcon, BmcIcon, PatreonIcon } from '@/components/SocialButton';
import StoreBadge, { AltStoreGlyph, SideStoreGlyph } from '@/components/StoreBadge';
import { GitHubIcon } from '@/components/ButtonLink';
import FeatureSpotlight from '@/components/FeatureSpotlight';
import VideoShowcase from '@/components/VideoShowcase';

const ALTSTORE_URL = 'altstore://source?url=' + encodeURIComponent('https://icube-emu.com/api/altstore');
const SIDESTORE_URL = 'sidestore://source?url=' + encodeURIComponent('https://icube-emu.com/api/sidestore');

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-blue-900">
      <SharedMediaHero
        brand="cube"
        title="GameCube and Wii. Anywhere."
        description="Play on iPhone, iPad, and Apple TV with native touch controls, controller skins, and Dolphin emulation."
        primary={{ src: '/video/hero/supertux-wii.mp4', poster: '/video/hero/supertux-wii.webp', label: 'SuperTux Wii · Wii', width: 768, height: 576 }}
        companion={{ src: '/video/hero/neverball-purple.mp4', poster: '/video/hero/neverball-purple.webp', label: 'Neverball · Purple GameCube skin', width: 432, height: 938 }}
        actions={<>
          <StoreBadge href={ALTSTORE_URL} eyebrow="Add to" label="AltStore" icon={<AltStoreGlyph className="w-6 h-6" />} external={false} />
          <StoreBadge href={SIDESTORE_URL} eyebrow="Add to" label="SideStore" icon={<SideStoreGlyph className="w-6 h-6" />} external={false} />
          <StoreBadge href="https://github.com/Provenance-Emu/iCube/releases/latest" eyebrow="Download from" label="GitHub" icon={<GitHubIcon className="w-6 h-6" />} />
        </>}
      />

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

      <section id="screenshots" className="container mx-auto scroll-mt-20 px-4 py-12 md:py-16">
        <h2 className="mb-5 text-center text-3xl font-bold text-gray-900 dark:text-white">See it in action</h2>
        <p className="mx-auto mb-12 max-w-2xl text-center text-sm text-gray-600 dark:text-gray-300">Actual app captures with homebrew games. Game files are imported separately.</p>
        <MediaGallery brand="cube" groups={galleryGroups} />
      </section>

      <section className="border-y border-indigo-950/15 dark:border-white/10 bg-white/65 dark:bg-white/[.035]">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <FeatureSpotlight
            title="Find your next game."
            description="Keep your GameCube and Wii collection together, revisit recently played games, and return to your saves from the library."
            href="/features/"
            linkLabel="Explore features"
          />
        </div>
      </section>

      {/* Community + Support Section */}
      <section className="container mx-auto px-4 py-12 md:py-16">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
          <div className="border-t pt-5 border-indigo-950/15 dark:border-white/15">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Community</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Ask for help or follow development.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <SocialButton href="https://discord.com/invite/4TK7PU5" label="Join our Discord" leftIcon={<DiscordIcon className="w-5 h-5" />} variant="discord" />
              <SocialButton href="https://x.com/ProvenanceApp" label="Follow on X/Twitter" leftIcon={<XIcon className="w-5 h-5" />} variant="x" />
            </div>
          </div>
          <div className="border-t pt-5 border-indigo-950/15 dark:border-white/15">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Support development</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">If you find iCube helpful, consider supporting the project.</p>
            <div className="flex flex-wrap items-center gap-3">
              <SocialButton href="https://buymeacoffee.com/joemattiello" label="Buy Me a Coffee" leftIcon={<BmcIcon className="w-5 h-5" />} variant="bmc" />
              <SocialButton href="https://www.patreon.com/provenance" label="Support on Patreon" leftIcon={<PatreonIcon className="w-5 h-5" />} variant="patreon" />
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

import type { Metadata } from 'next';
import Link from 'next/link';
import Features from '@/components/Features';
import FeatureSpotlight from '@/components/FeatureSpotlight';
import SocialButton, { DiscordIcon, XIcon } from '@/components/SocialButton';

export const metadata: Metadata = {
  title: 'Features',
  description: 'Explore iCube features: Dolphin-based emulation, MFi controller support, save states, tvOS big-screen gaming, and iOS-specific performance enhancements.',
  alternates: { canonical: 'https://icube-emu.com/features/' },
};

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-blue-900">
      <header className="container mx-auto px-4 pt-12 md:pt-16">
        <div className="mx-auto max-w-6xl">
          <FeatureSpotlight
            heading="h1"
            view="play"
            title="GameCube and Wii, with room to play"
            description="Explore controller skins, display filters, and the performance settings you can adjust in iCube. The guide covers setup for both consoles."
            href="/guide/"
            linkLabel="Read the setup guide"
          />
        </div>
      </header>
      <section className="container mx-auto px-4 py-12 md:py-16" aria-labelledby="feature-list">
        <div className="mx-auto max-w-5xl">
          <div className="mb-7 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
            <h2 id="feature-list" className="text-2xl font-bold text-slate-950 dark:text-white">Feature list</h2>
            <Link href="/#screenshots" className="inline-flex min-h-11 items-center gap-2 rounded-sm text-sm font-semibold underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 text-indigo-700 dark:text-indigo-300">
              Browse device screenshots <span aria-hidden="true">→</span>
            </Link>
          </div>
          <Features />

          <div className="text-center mt-12">
            <Link
              href="/"
              className="inline-block text-blue-600 dark:text-blue-400 hover:underline font-semibold"
            >
              Back to Home →
            </Link>
          </div>

          {/* Community CTA */}
          <div className="text-center mt-12">
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <SocialButton href="https://discord.com/invite/4TK7PU5" label="Join our Discord" leftIcon={<DiscordIcon className="w-5 h-5" />} variant="discord" />
              <SocialButton href="https://x.com/ProvenanceApp" label="Follow on X/Twitter" leftIcon={<XIcon className="w-5 h-5" />} variant="x" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

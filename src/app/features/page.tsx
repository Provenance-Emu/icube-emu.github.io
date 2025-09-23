import Features from '@/components/Features';
import Link from 'next/link';
import SocialButton, { DiscordIcon, XIcon } from '@/components/SocialButton';

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-blue-900">
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            Features
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-10 text-center max-w-3xl mx-auto">
            A modern, native-first Dolphin experience tailored for iPhone, iPad, and Apple TV. iCube pairs the latest
            Dolphin core with a SwiftUI interface, robust controller support, and iOS/tvOS-specific performance
            enhancements.
          </p>

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

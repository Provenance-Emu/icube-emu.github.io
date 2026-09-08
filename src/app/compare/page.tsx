import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Compare',
  description: 'How iCube compares to desktop Dolphin and to the GameCube core inside Provenance.',
  alternates: { canonical: 'https://icube-emu.com/compare/' },
};

const pages = [
  {
    href: '/compare/icube-vs-dolphin/',
    label: 'iCube vs. Dolphin',
    blurb: 'How the iOS/tvOS app compares to desktop Dolphin on Windows, macOS, and Linux.',
  },
  {
    href: '/compare/icube-vs-provenance/',
    label: 'iCube vs. Provenance',
    blurb: 'A standalone GameCube/Wii app vs. the GameCube core inside the Provenance multi-system emulator.',
  },
];

export default function ComparePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-blue-900">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Compare
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-center max-w-2xl mx-auto mb-10">
            iCube is one of several Dolphin-based ways to play GameCube and Wii games. Here&apos;s
            how it stacks up against the alternatives.
          </p>
          <div className="grid gap-6 sm:grid-cols-2">
            {pages.map((p) => (
              <Link
                key={p.href}
                href={p.href}
                className="block bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
              >
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{p.label}</h2>
                <p className="text-sm text-gray-600 dark:text-gray-300">{p.blurb}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

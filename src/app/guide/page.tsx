import type { Metadata } from 'next';
import Link from 'next/link';
import { GUIDE_PAGES } from './guideNav';

export const metadata: Metadata = {
  title: 'Guide',
  description:
    'How to import GameCube and Wii games into iCube, which disc formats it supports, GameCube BIOS (IPL) setup, and answers to common questions.',
  alternates: { canonical: 'https://icube-emu.com/guide/' },
};

export default function GuideIndex() {
  const pages = GUIDE_PAGES.filter((p) => p.href !== '/guide/');
  return (
    <>
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
        iCube Guide
      </h1>
      <p className="text-gray-600 dark:text-gray-300 max-w-2xl mb-8">
        Everything you need to get GameCube and Wii games running on iCube.
      </p>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
          First import in 3 steps
        </h2>
        <ol className="list-decimal list-inside text-gray-600 dark:text-gray-300 space-y-2">
          <li>
            Get your GameCube (ISO/GCM/RVZ) or Wii (ISO/WBFS) game files, dumped yourself from
            discs you own.
          </li>
          <li>
            Open iCube and import them via the Files app or the built-in Wi-Fi web server.
          </li>
          <li>
            Tap the game to play. The GameCube BIOS (IPL) is only needed for the GameCube Main
            Menu &mdash; most games run without it.
          </li>
        </ol>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {pages.map((p) => (
          <Link
            key={p.href}
            href={p.href}
            className="block bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
          >
            <h3 className="font-semibold text-gray-900 dark:text-white">{p.label}</h3>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">{p.blurb}</p>
          </Link>
        ))}
      </div>
    </>
  );
}

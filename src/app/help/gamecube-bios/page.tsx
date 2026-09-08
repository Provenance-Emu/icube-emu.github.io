import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'GameCube BIOS (IPL)',
  description: 'This page has moved to /guide/bios/.',
  alternates: { canonical: 'https://icube-emu.com/guide/bios/' },
  robots: { index: false, follow: true },
};

export default function GameCubeBiosRedirect() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-blue-900">
      <meta httpEquiv="refresh" content="0;url=/guide/bios/" />
      <div className="text-center px-4">
        <p className="text-gray-600 dark:text-gray-300 mb-2">This page has moved.</p>
        <Link href="/guide/bios/" className="text-blue-600 dark:text-blue-400 hover:underline font-semibold">
          Continue to GameCube BIOS (IPL) &rarr;
        </Link>
      </div>
    </div>
  );
}

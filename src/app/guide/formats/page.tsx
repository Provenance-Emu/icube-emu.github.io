import type { Metadata } from 'next';
import Link from 'next/link';
import { breadcrumbJsonLd } from '../guideNav';

export const metadata: Metadata = {
  title: 'Supported Formats',
  description:
    'Every GameCube and Wii disc format iCube reads — ISO/GCM, GCZ, RVZ, WIA, WBFS, CISO, and NKit — plus WAD channels and DOL/ELF homebrew, and which to prefer.',
  alternates: { canonical: 'https://icube-emu.com/guide/formats/' },
};

const discRows: [string, string, string][] = [
  ['.iso / .gcm', 'Raw disc image', 'An exact, uncompressed byte-for-byte copy of a GameCube or Wii disc. Works everywhere but takes the most storage.'],
  ['.gcz', 'Dolphin compressed', 'An older Dolphin-specific compressed container. Still readable, but superseded by RVZ for new dumps.'],
  ['.rvz', 'Dolphin compressed (recommended)', 'Dolphin\'s modern container. Compresses well while keeping fast load times, and can be converted back to a byte-exact ISO. Typically around half the size of the raw ISO for many discs, though this varies by game.'],
  ['.wia', 'Dolphin compressed (legacy)', 'The compressed format RVZ replaced. Still supported for older dumps, but RVZ is the current recommendation.'],
  ['.wbfs', 'Wii Backup File System', 'A Wii-only container originally used by USB loaders. Strips update partitions to save space; does not support GameCube discs.'],
  ['.ciso', 'Compact ISO', 'Shrinks a disc image by omitting unused/empty sectors while keeping used data uncompressed. Supported by Dolphin and many homebrew loaders.'],
  ['NKit (.iso/.wia/.rvz)', 'Scrubbed variant', 'A further space-saving pass on top of ISO/WIA/RVZ that discards redundant data, so the result is no longer byte-identical to the original disc. Per Dolphin\'s own documentation, NKit images should be converted back to a standard format before use.'],
];

const otherRows: [string, string, string][] = [
  ['.wad', 'Wii Channel', 'An installable Wii Channel package (not a disc game) — the format used for Wii system/virtual console channels.'],
  ['.dol / .elf', 'Homebrew executable', 'Raw GameCube/Wii homebrew executables, run directly without a disc image.'],
];

function FormatTable({ rows }: { rows: [string, string, string][] }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
      <table className="w-full text-left text-sm">
        <thead className="bg-gray-50 dark:bg-gray-900/40 text-gray-700 dark:text-gray-300">
          <tr>
            <th className="px-4 py-3 font-semibold">Extension</th>
            <th className="px-4 py-3 font-semibold">Kind</th>
            <th className="px-4 py-3 font-semibold">Notes</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 dark:divide-gray-700/50 text-gray-600 dark:text-gray-300">
          {rows.map(([ext, kind, notes]) => (
            <tr key={ext} className="align-top">
              <td className="px-4 py-3 whitespace-nowrap">
                <code className="font-mono text-blue-600 dark:text-blue-400">{ext}</code>
              </td>
              <td className="px-4 py-3 whitespace-nowrap">{kind}</td>
              <td className="px-4 py-3">{notes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function FormatsGuide() {
  const jsonLd = breadcrumbJsonLd('Supported Formats', 'https://icube-emu.com/guide/formats/');
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-8">
        Supported Formats
      </h1>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8">
        <p className="text-gray-600 dark:text-gray-300">
          iCube reads the same GameCube and Wii disc formats as the Dolphin core it&apos;s
          built on. GameCube games are large (typically 1&ndash;1.5&nbsp;GB per disc), so
          picking a compressed format matters if you&apos;re importing a lot of them.
        </p>
      </div>

      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 mb-8">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          Prefer RVZ for new dumps
        </h2>
        <p className="text-gray-700 dark:text-gray-300">
          <code className="font-mono text-sm bg-white dark:bg-gray-800 px-1.5 py-0.5 rounded">.rvz</code> is
          Dolphin&apos;s recommended format: it compresses well (typically roughly half the
          size of the raw ISO for most discs), loads quickly, and can be converted back to a
          byte-exact ISO whenever you need one. Avoid heavily &ldquo;scrubbed&rdquo; NKit
          dumps &mdash; Dolphin&apos;s documentation recommends converting those back to a
          standard format first.
        </p>
      </div>

      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
        Disc image formats
      </h2>
      <div className="mb-8">
        <FormatTable rows={discRows} />
      </div>

      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
        Channels and homebrew
      </h2>
      <div className="mb-8">
        <FormatTable rows={otherRows} />
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
          Getting your own dumps
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Use Dolphin on your Mac or PC, or a homebrew disc-dumping tool such as CleanRip on
          real hardware, to rip your own GameCube and Wii discs. See{' '}
          <Link href="/guide/importing/" className="text-blue-600 dark:text-blue-400 hover:underline">
            Importing Games
          </Link>{' '}
          for how to get the resulting files onto your device, and the{' '}
          <a
            href="https://wiki.provenance-emu.com/installation-and-usage/roms/formatting-roms"
            className="text-blue-600 dark:text-blue-400 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Provenance wiki guide on formatting ROMs
          </a>{' '}
          for folder conventions.
        </p>
      </div>
    </>
  );
}

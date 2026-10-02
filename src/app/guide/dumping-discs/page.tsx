import type { Metadata } from 'next';
import Link from 'next/link';
import { breadcrumbJsonLd } from '../guideNav';

export const metadata: Metadata = {
  title: 'Dumping GameCube & Wii Discs',
  description:
    'How to dump your own GameCube and Wii discs with CleanRip on a real Wii, join the part files, convert to RVZ, and verify the result before importing into iCube.',
  alternates: { canonical: 'https://icube-emu.com/guide/dumping-discs/' },
};

const code = 'font-mono text-sm bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded';
const pre =
  'font-mono text-sm bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100 p-4 rounded overflow-x-auto mb-4';
const link = 'text-blue-600 dark:text-blue-400 hover:underline';

export default function DumpingDiscsGuide() {
  const jsonLd = breadcrumbJsonLd(
    'Dumping GameCube & Wii Discs',
    'https://icube-emu.com/guide/dumping-discs/',
  );
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-8">
        Dumping GameCube &amp; Wii Discs
      </h1>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8">
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          iCube plays disc images, so before you can play a game you own, you need a copy of
          its disc as a file. This page covers the standard way to make one on a real Wii,
          how to join and shrink the result, and how to check it came out clean.
        </p>
        <p className="text-gray-600 dark:text-gray-300">
          iCube does not provide, link to, or endorse any source of pre-dumped games. Dump
          discs you own, from hardware you own.
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
          What you need
        </h2>
        <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2">
          <li>
            <strong>A Wii with the Homebrew Channel installed.</strong> The{' '}
            <a href="https://wii.hacks.guide/" className={link} target="_blank" rel="noopener noreferrer">
              Wii Hacks Guide
            </a>{' '}
            walks through installing it.
          </li>
          <li>
            <strong>GameCube discs need a Wii that can read them.</strong> The original Wii
            (model RVL-001, the one with GameCube controller ports) can. The Wii Family
            Edition, the Wii mini, and the Wii U&apos;s vWii cannot read GameCube discs at
            all, so they can dump Wii discs only.
          </li>
          <li>
            <strong>An SD card or USB drive formatted FAT32</strong> with at least 4.7 GB
            free for a Wii disc. A dual-layer Wii disc needs 8.5 GB. GameCube discs are up
            to 1.4 GB.
          </li>
          <li>
            <strong>CleanRip</strong>, a homebrew disc dumper. Its project page is on{' '}
            <a href="https://wiibrew.org/wiki/CleanRip" className={link} target="_blank" rel="noopener noreferrer">
              WiiBrew
            </a>
            , and the Wii Hacks Guide has a{' '}
            <a href="https://wii.hacks.guide/dump-games" className={link} target="_blank" rel="noopener noreferrer">
              dumping walkthrough
            </a>{' '}
            that links the current download.
          </li>
        </ul>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
          Dump with CleanRip
        </h2>
        <ol className="list-decimal list-inside text-gray-600 dark:text-gray-300 space-y-3 mb-4">
          <li>
            Copy CleanRip&apos;s <code className={code}>apps</code> folder to the root of the SD
            card or USB drive.
          </li>
          <li>
            Put the card or drive in the Wii, boot it, and open <strong>CleanRip</strong> from
            the Homebrew Channel.
          </li>
          <li>
            When it asks whether to calculate checksums, choose <strong>Yes</strong>. You&apos;ll
            want them in the verify step below.
          </li>
          <li>
            Choose where to write the dump (SD card or USB), then choose{' '}
            <strong>FAT (FAT32)</strong> as the file system.
          </li>
          <li>
            If your Wii is online, choose <strong>Yes</strong> when it offers to download the{' '}
            <code className={code}>redump.org</code> database files. CleanRip uses them to check
            the dump against known-good discs.
          </li>
          <li>
            Insert the disc and press <strong>A</strong>.
          </li>
        </ol>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          A GameCube disc produces one file. A Wii disc produces several part files, because
          FAT32 can&apos;t hold a single file larger than 4 GiB. The part names and the folder
          they land in depend on your CleanRip version, so check the card.
        </p>
        <p className="text-gray-600 dark:text-gray-300">
          A disc that plays fine can still throw an unrecovered read error during a dump. Clean
          the disc, restart CleanRip, and try again.
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
          Join the part files
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Skip this for GameCube discs. For a Wii disc, join the parts into one{' '}
          <code className={code}>.iso</code> before importing. Order matters: the first part goes
          first. The names below are placeholders for whatever CleanRip wrote.
        </p>
        <p className="text-gray-600 dark:text-gray-300 mb-2">On macOS or Linux:</p>
        <pre className={pre}>{'cat game.part0.iso game.part1.iso game.part2.iso > game.iso'}</pre>
        <p className="text-gray-600 dark:text-gray-300 mb-2">On Windows, in Command Prompt:</p>
        <pre className={pre}>{'copy /b game.part0.iso + game.part1.iso + game.part2.iso game.iso'}</pre>
        <p className="text-gray-600 dark:text-gray-300">
          A full single-layer Wii disc image is about 4.7 GB and a dual-layer one is about 8.5
          GB. If your joined file is well short of that, a part is missing or out of order.
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
          Shrink it to RVZ
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          A raw <code className={code}>.iso</code> works, but a Wii disc is 4.7 GB or more.{' '}
          <code className={code}>.rvz</code> is Dolphin&apos;s compressed format, loads quickly, and
          converts back to a byte-exact <code className={code}>.iso</code> whenever you want one.
          See{' '}
          <Link href="/guide/formats/" className={link}>
            Supported Formats
          </Link>{' '}
          for how it compares to the others.
        </p>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          In Dolphin on your Mac or PC, right-click the game in the list and choose{' '}
          <strong>Convert File&hellip;</strong>. Pick format <code className={code}>RVZ</code>, block
          size 128 KiB, and compression <code className={code}>zstd</code> at level 5. Dolphin
          proposes that block size, method, and level by default. Higher levels only make the
          conversion slower.
        </p>
        <p className="text-gray-600 dark:text-gray-300 mb-2">
          From a terminal, <code className={code}>dolphin-tool</code> does the same job:
        </p>
        <pre className={pre}>
          {'dolphin-tool convert -i game.iso -o game.rvz -f rvz -b 131072 -c zstd -l 5'}
        </pre>
        <p className="text-gray-600 dark:text-gray-300">
          Avoid scrubbing during conversion. RVZ already compresses unused space well, so
          scrubbing saves little and throws data away.
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
          Check the dump
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          In Dolphin, right-click the game, choose <strong>Properties</strong>, and open the{' '}
          <strong>Verify</strong> tab. Tick CRC32, MD5, and SHA-1 and run it. If Dolphin has the{' '}
          <code className={code}>redump.org</code> data, it tells you if your hashes match a known
          disc. A mismatch can mean a bad read, so dump the disc again before assuming
          it&apos;s a different release.
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
          Get it onto iCube
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Copy the <code className={code}>.iso</code> or <code className={code}>.rvz</code> to your
          device with{' '}
          <Link href="/guide/importing/" className={link}>
            Wi-Fi / Web Import
          </Link>
          , or use <strong>Import Game</strong> in the library&apos;s <strong>Import</strong> menu
          on iPhone and iPad.
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
          Other ways to dump
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          You can also read Wii and GameCube discs in a PC drive if the drive has patched
          firmware, but the compatible drives are few and dual-layer discs may fail. CleanRip
          is the more reliable route. The{' '}
          <a
            href="https://wiki.provenance-emu.com/installation-and-usage/roms/ripping-roms"
            className={link}
            target="_blank"
            rel="noopener noreferrer"
          >
            Provenance wiki&apos;s ripping guide
          </a>{' '}
          covers the drive method and other systems.
        </p>
        <p className="text-gray-600 dark:text-gray-300">
          For WiiWare, Virtual Console, and other channel titles, see{' '}
          <Link href="/guide/dumping-wiiware/" className={link}>
            WiiWare, Virtual Console &amp; Channels
          </Link>
          .
        </p>
      </div>
    </>
  );
}

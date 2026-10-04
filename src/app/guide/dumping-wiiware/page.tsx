import type { Metadata } from 'next';
import Link from 'next/link';
import { breadcrumbJsonLd } from '../guideNav';

export const metadata: Metadata = {
  title: 'WiiWare, Virtual Console & Channels',
  description:
    'How to get WiiWare, Virtual Console, and Wii channel titles into iCube: dump a single title to a .wad, or import a BootMii NAND backup, from a Wii you own.',
  alternates: { canonical: 'https://icube-emu.com/guide/dumping-wiiware/' },
};

const code = 'font-mono text-sm bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded';
const pre =
  'font-mono text-sm bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100 p-4 rounded overflow-x-auto mb-4';
const link = 'text-blue-600 dark:text-blue-400 hover:underline';

export default function DumpingWiiWareGuide() {
  const jsonLd = breadcrumbJsonLd(
    'WiiWare, Virtual Console & Channels',
    'https://icube-emu.com/guide/dumping-wiiware/',
  );
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-8">
        WiiWare, Virtual Console &amp; Channels
      </h1>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8">
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          WiiWare, Virtual Console, and other Wii channels don&apos;t come on discs. They live in
          your Wii&apos;s internal storage (the NAND), so you dump them from the console itself.
          iCube accepts the results in two forms: a <code className={code}>.wad</code> file for a
          single title, or a BootMii NAND backup for the whole console.
        </p>
        <p className="text-gray-600 dark:text-gray-300">
          iCube does not provide, link to, or endorse any source of pre-dumped titles or backups.
          Dump from a Wii you own.
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
          Which one do you want?
        </h2>
        <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2">
          <li>
            <strong>One title, ready to play: a <code className={code}>.wad</code> file.</strong>{' '}
            iCube lists <code className={code}>.wad</code> files with your other games. Launching
            one installs it to iCube&apos;s emulated Wii NAND temporarily and boots it, so there is
            nothing else to set up.
          </li>
          <li>
            <strong>Everything on the console: a BootMii NAND backup.</strong> This brings over
            your Wii saves, installed channels, and system files in one go. The file is about 553
            MB, and importing it is iPhone and iPad only (not Apple TV), so use it when you want
            your saves and not just one game.
          </li>
        </ul>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
          Dump a single title to a <code className={code}>.wad</code>
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          You need a Wii with the Homebrew Channel installed (see the{' '}
          <a href="https://wii.hacks.guide/" className={link} target="_blank" rel="noopener noreferrer">
            Wii Hacks Guide
          </a>
          ) and an SD card or USB drive.
        </p>
        <ol className="list-decimal list-inside text-gray-600 dark:text-gray-300 space-y-3 mb-4">
          <li>
            Download <strong>Yet Another BlueDump MOD</strong> from the Open Shop Channel at{' '}
            <a href="https://oscwii.org/" className={link} target="_blank" rel="noopener noreferrer">
              oscwii.org
            </a>{' '}
            and copy its <code className={code}>apps</code> folder to the root of the SD card or USB
            drive.
          </li>
          <li>
            Put the card or drive in the Wii, open the Homebrew Channel, and launch{' '}
            <strong>Yet Another BlueDump MOD</strong>. Press <strong>A</strong> at the first prompt.
          </li>
          <li>
            Choose <strong>Installed Channel Titles</strong>.
          </li>
          <li>
            Highlight the WiiWare, Virtual Console, or channel title you want and press the{' '}
            <strong>1</strong> button.
          </li>
          <li>
            Choose <strong>Backup to WAD</strong>.
          </li>
          <li>
            Answer the three prompts the way the Wii Hacks Guide&apos;s{' '}
            <a href="https://wii.hacks.guide/dump-wads" className={link} target="_blank" rel="noopener noreferrer">
              WAD dumping page
            </a>{' '}
            does: fakesign the ticket <strong>Yes</strong>, fakesign the TMD <strong>No</strong>,
            change the output WAD region <strong>No</strong>.
          </li>
          <li>
            Copy the <code className={code}>.wad</code> from the card or drive to your computer.
          </li>
        </ol>
        <p className="text-gray-600 dark:text-gray-300">
          Then get it onto iCube like any other game, with{' '}
          <Link href="/guide/importing/" className={link}>
            Wi-Fi / Web Import
          </Link>{' '}
          or <strong>Import Game</strong> in the library&apos;s <strong>Import</strong> menu. Launch
          it from the library.
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
          Back up the whole console with BootMii
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          BootMii writes <code className={code}>nand.bin</code> (the console&apos;s storage) and{' '}
          <code className={code}>keys.bin</code> (1,024 bytes of keys needed to decrypt it) to the
          root of the SD card. Depending on how the backup was made, the keys may already be at
          the end of <code className={code}>nand.bin</code>. The Wii Hacks Guide has the steps for
          making the backup:{' '}
          <a href="https://wii.hacks.guide/bootmii" className={link} target="_blank" rel="noopener noreferrer">
            BootMii Backup
          </a>{' '}
          and{' '}
          <a href="https://wii.hacks.guide/nand-backup" className={link} target="_blank" rel="noopener noreferrer">
            NAND backup
          </a>
          .
        </p>

        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
          Check the size, then append the keys only if they&apos;re missing
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Dolphin on a computer asks for <code className={code}>keys.bin</code> separately. iCube
          can&apos;t, so it accepts exactly two file sizes for this import:
        </p>
        <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2 mb-4">
          <li>
            <strong>553,649,152 bytes:</strong> <code className={code}>nand.bin</code> already has
            the keys at the end. Import it as it is.
          </li>
          <li>
            <strong>553,648,128 bytes:</strong> the keys are missing. Append{' '}
            <code className={code}>keys.bin</code> first. The result should be 553,649,152 bytes.
          </li>
        </ul>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Check your file&apos;s size before you touch it (<code className={code}>ls -l</code> on
          macOS or Linux, <code className={code}>dir</code> on Windows, or Get Info in Finder).
          Don&apos;t append <code className={code}>keys.bin</code> to a 553,649,152-byte file. That
          makes it 553,650,176 bytes, and iCube rejects it.
        </p>
        <p className="text-gray-600 dark:text-gray-300 mb-2">
          To append the keys to a 553,648,128-byte file, on macOS or Linux:
        </p>
        <pre className={pre}>{'cat nand.bin keys.bin > nand_with_keys.bin'}</pre>
        <p className="text-gray-600 dark:text-gray-300 mb-2">On Windows, in Command Prompt:</p>
        <pre className={pre}>{'copy /b nand.bin + keys.bin nand_with_keys.bin'}</pre>

        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Import it</h3>
        <ol className="list-decimal list-inside text-gray-600 dark:text-gray-300 space-y-3 mb-4">
          <li>
            Put the 553,649,152-byte file (<code className={code}>nand.bin</code>, or{' '}
            <code className={code}>nand_with_keys.bin</code> if you appended the keys) somewhere the
            Files app can see it, such as iCloud Drive or <strong>On My iPhone</strong>. iCube opens
            it with the standard Files picker.
          </li>
          <li>
            In iCube&apos;s library, open the <strong>Import</strong> menu and choose{' '}
            <strong>Import BootMii NAND Backup&hellip;</strong>. This menu item is on iPhone and iPad
            only, not Apple TV.
          </li>
          <li>
            Pick the <code className={code}>.bin</code> file and wait for{' '}
            <strong>Importing NAND backup</strong> to finish.
          </li>
        </ol>
        <p className="text-gray-600 dark:text-gray-300">
          The import writes the backup&apos;s files into iCube&apos;s emulated Wii NAND, which by
          default is the <code className={code}>Wii</code> folder in the User Folder, replacing any
          file at the same path. If you&apos;ve already played Wii games in iCube and want to keep
          that progress, copy your User Folder somewhere safe first. You can see where it is in{' '}
          <strong>Settings &rarr; Debug &rarr; Environment &rarr; User Folder</strong>.
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
          Import messages
        </h2>
        <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-3">
          <li>
            <strong>
              &ldquo;The decryption keys need to be appended to the NAND backup file.&rdquo;
            </strong>{' '}
            The file is a bare 553,648,128-byte <code className={code}>nand.bin</code>. Append{' '}
            <code className={code}>keys.bin</code> as shown above and import again.
          </li>
          <li>
            <strong>&ldquo;This file does not look like a BootMii NAND backup.&rdquo;</strong> The
            file size is neither of the two above. Appending the keys to a file that already had
            them (553,650,176 bytes), a truncated copy, or the wrong{' '}
            <code className={code}>.bin</code> will all do this.
          </li>
          <li>
            <strong>&ldquo;This file does not contain a valid Wii filesystem.&rdquo;</strong>{' '}
            Usually the keys don&apos;t match the backup, or the backup itself is damaged. Make a
            fresh one.
          </li>
        </ul>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
          Playing a specific title
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          A NAND import fills the emulated NAND. For a specific WiiWare or Virtual Console title,
          dump a <code className={code}>.wad</code>. iCube treats <code className={code}>.wad</code>{' '}
          as a game file, so it imports and launches like a disc image. For ripping discs, see{' '}
          <Link href="/guide/dumping-discs/" className={link}>
            Dumping GameCube &amp; Wii Discs
          </Link>
          .
        </p>
      </div>
    </>
  );
}

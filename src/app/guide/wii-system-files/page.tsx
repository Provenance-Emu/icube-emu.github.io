import type { Metadata } from 'next';
import Link from 'next/link';
import { breadcrumbJsonLd } from '../guideNav';

export const metadata: Metadata = {
  title: 'Install Your Own Wii System Files',
  description:
    'How to install the Wii System Menu and IOS in iCube from a BootMii NAND backup of your own console, on iPhone, iPad, and Apple TV.',
  alternates: { canonical: 'https://icube-emu.com/guide/wii-system-files/' },
};

const code = 'font-mono text-sm bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded';
const pre =
  'font-mono text-sm bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100 p-4 rounded overflow-x-auto mb-4';
const link = 'text-blue-600 dark:text-blue-400 hover:underline';
const card = 'bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8';
const h2 = 'text-2xl font-semibold text-gray-900 dark:text-white mb-4';
const body = 'text-gray-600 dark:text-gray-300';

export default function WiiSystemFilesGuide() {
  const jsonLd = breadcrumbJsonLd(
    'Install Your Own Wii System Files',
    'https://icube-emu.com/guide/wii-system-files/',
  );
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-8">
        Install Your Own Wii System Files
      </h1>

      <div className={card}>
        <p className={`${body} mb-4`}>
          Wii games run on top of the Wii&apos;s system software: the System Menu, the IOS modules,
          and the channels. iCube does not include any of it, and the App Store version of iCube does
          not download it either. If a Wii game needs it, iCube uses the files from your own
          console, which you copy over from a BootMii NAND backup.
        </p>
        <p className={body}>
          This page covers making that backup on a Wii you own and importing it on iPhone, iPad,
          and Apple TV.
        </p>
      </div>

      <div className={card}>
        <h2 className={h2}>Why you need this</h2>
        <p className={`${body} mb-4`}>
          A Wii game that wants a system title that isn&apos;t in iCube&apos;s emulated Wii storage
          (the NAND) stops with a message like{' '}
          <strong>&ldquo;Could not launch title &hellip; because it is missing from the NAND.&rdquo;</strong>{' '}
          The alert has a <strong>How to Install Wii System Files</strong> button that opens this
          guide. In the App Store version you can also open it from the <strong>System</strong> menu in
          the library (<strong>Install Wii System Files&hellip;</strong>). Other builds of iCube have
          different entries in that menu.
        </p>
        <p className={`${body} mb-4`}>Not every game asks for it. Install the files when one does.</p>
        <p className={body}>
          iCube does not provide, link to, or endorse any source of pre-dumped system files. Use a
          backup of a console you own.
        </p>
      </div>

      <div className={card}>
        <h2 className={h2}>Dump your NAND with BootMii</h2>
        <p className={`${body} mb-2`}>You need:</p>
        <ul className={`list-disc list-inside ${body} space-y-2 mb-4`}>
          <li>
            <strong>A Wii with BootMii installed.</strong> BootMii is part of the Homebrew Channel
            setup. The{' '}
            <a href="https://wii.hacks.guide/" className={link} target="_blank" rel="noopener noreferrer">
              Wii Hacks Guide
            </a>{' '}
            walks through it.
          </li>
          <li>
            <strong>An SD card with at least 1 GB free.</strong> BootMii writes to the root of the
            card.
          </li>
        </ul>
        <p className={`${body} mb-4`}>
          Then follow the Wii Hacks Guide&apos;s{' '}
          <a href="https://wii.hacks.guide/bootmii" className={link} target="_blank" rel="noopener noreferrer">
            BootMii Backup
          </a>{' '}
          and{' '}
          <a href="https://wii.hacks.guide/nand-backup" className={link} target="_blank" rel="noopener noreferrer">
            NAND backup
          </a>{' '}
          steps. BootMii writes two files:
        </p>
        <ul className={`list-disc list-inside ${body} space-y-2 mb-4`}>
          <li>
            <strong><code className={code}>nand.bin</code></strong>, the console&apos;s storage. It
            is 553,648,128 bytes.
          </li>
          <li>
            <strong><code className={code}>keys.bin</code></strong>, the keys that decrypt it. It
            is 1,024 bytes.
          </li>
        </ul>
        <p className={`${body} mb-4`}>
          Some tools write <code className={code}>nand.bin</code> with the keys already appended at
          the end. That file is 553,649,152 bytes, and it needs no{' '}
          <code className={code}>keys.bin</code>. Check your sizes (
          <code className={code}>ls -l</code> on macOS or Linux, <code className={code}>dir</code>{' '}
          on Windows, or Get Info in Finder) before you start. Copy the files from the card to your
          computer.
        </p>
        <p className={body}>
          Both files come from your own console. A <code className={code}>nand.bin</code> and a{' '}
          <code className={code}>keys.bin</code> from different backups don&apos;t work together.
        </p>
      </div>

      <div className={card}>
        <h2 className={h2}>Before you import</h2>
        <p className={`${body} mb-4`}>
          Importing writes your console&apos;s files over iCube&apos;s emulated Wii storage. A file
          at the same path is replaced, and that includes the Wii save data of the same games. If
          you already have Wii saves in iCube that you want to keep, back them up first:
        </p>
        <ul className={`list-disc list-inside ${body} space-y-2 mb-4`}>
          <li>
            <strong>iPhone and iPad:</strong> copy iCube&apos;s <code className={code}>Wii</code>{' '}
            folder out through the Files app.
          </li>
          <li>
            <strong>Apple TV:</strong> there is no Files app to copy saves out through, so import
            before you have progress you can&apos;t replace.
          </li>
        </ul>
        <p className={body}>
          Quit any running game before you import. The Web UI upload below is refused while a game
          is running; the iPhone and iPad picker does not check, so make sure the game is closed
          yourself.
        </p>
      </div>

      <div className={card}>
        <h2 className={h2}>iPhone and iPad</h2>
        <ol className={`list-decimal list-inside ${body} space-y-3 mb-4`}>
          <li>
            Put the file somewhere the Files app can see it, such as iCloud Drive or{' '}
            <strong>On My iPhone</strong>.
          </li>
          <li>
            In the library, open the <strong>Import</strong> menu in the toolbar and choose{' '}
            <strong>Import BootMii NAND Backup&hellip;</strong>.
          </li>
          <li>
            Pick the file and wait for <strong>Importing NAND backup</strong> to close.
          </li>
        </ol>
        <p className={`${body} mb-4`}>
          The picker takes one file. It must be a <code className={code}>nand.bin</code> that
          already has its keys, 553,649,152 bytes. If yours is 553,648,128 bytes, append the keys
          first. On macOS or Linux:
        </p>
        <pre className={pre}>{'cat nand.bin keys.bin > nand_with_keys.bin'}</pre>
        <p className={`${body} mb-2`}>On Windows, in Command Prompt:</p>
        <pre className={pre}>{'copy /b nand.bin + keys.bin nand_with_keys.bin'}</pre>
        <p className={`${body} mb-4`}>
          Never append <code className={code}>keys.bin</code> to a file that already has them. That
          makes 553,650,176 bytes, and iCube rejects it.
        </p>
        <p className={body}>
          You can also skip the appending and use the upload method from the Apple TV section
          below. It works on iPhone and iPad too.
        </p>
      </div>

      <div className={card}>
        <h2 className={h2}>Apple TV</h2>
        <p className={`${body} mb-4`}>
          Apple TV has no file picker, so you send the files from a computer on the same Wi-Fi
          network.
        </p>
        <ol className={`list-decimal list-inside ${body} space-y-3 mb-4`}>
          <li>
            On the Apple TV, open iCube and go to <strong>Settings &rarr; Sync &amp; Network &rarr; Web UI &amp; WebDAV</strong>.
            It shows the Web UI address.
          </li>
          <li>Open that address in a browser on your computer.</li>
          <li>
            If your <code className={code}>nand.bin</code> is 553,648,128 bytes (no keys),{' '}
            <strong>upload <code className={code}>keys.bin</code> first</strong>. iCube says it
            received the keys.
          </li>
          <li>
            Upload <strong><code className={code}>nand.bin</code></strong>. The import starts by
            itself and a message tells you when it&apos;s done.
          </li>
        </ol>
        <p className={`${body} mb-4`}>
          A <code className={code}>nand.bin</code> that already has its keys (553,649,152 bytes) can
          be uploaded alone.
        </p>
        <p className={body}>
          The files must be named exactly <code className={code}>keys.bin</code> and{' '}
          <code className={code}>nand.bin</code>. A <code className={code}>nand.bin</code> without
          keys is refused unless you uploaded <code className={code}>keys.bin</code> before it, and
          an upload that&apos;s refused is deleted, so upload again once you&apos;ve fixed the
          problem.
        </p>
      </div>

      <div className={card}>
        <h2 className={h2}>Check it worked</h2>
        <ul className={`list-disc list-inside ${body} space-y-2`}>
          <li>
            On Apple TV, a message says <strong>Wii NAND backup imported.</strong> On iPhone and
            iPad, the <strong>Importing NAND backup</strong> box closes without an error.
          </li>
          <li>
            Launch the Wii game that gave you the &ldquo;missing from the NAND&rdquo; alert. It
            should boot now.
          </li>
        </ul>
      </div>

      <div className={card}>
        <h2 className={h2}>Troubleshooting</h2>
        <ul className={`list-disc list-inside ${body} space-y-3`}>
          <li>
            <strong>
              &ldquo;The decryption keys need to be appended to the NAND backup file.&rdquo;
            </strong>{' '}
            The file is a bare 553,648,128-byte <code className={code}>nand.bin</code>. Append{' '}
            <code className={code}>keys.bin</code> as shown above and pick it again, or upload{' '}
            <code className={code}>keys.bin</code> and then <code className={code}>nand.bin</code>{' '}
            from your computer.
          </li>
          <li>
            <strong>
              &ldquo;This NAND backup has no keys. Upload keys.bin from the same backup first, then
              upload nand.bin again.&rdquo;
            </strong>{' '}
            You uploaded a bare <code className={code}>nand.bin</code> without sending{' '}
            <code className={code}>keys.bin</code> first. Upload <code className={code}>keys.bin</code>,
            then <code className={code}>nand.bin</code>.
          </li>
          <li>
            <strong>&ldquo;This file does not look like a BootMii NAND backup.&rdquo;</strong> The
            size is wrong. iCube accepts only 553,648,128 bytes (
            <code className={code}>nand.bin</code> alone) and 553,649,152 bytes (with its keys).
            Keys appended twice (553,650,176 bytes), a truncated copy, or the wrong{' '}
            <code className={code}>.bin</code> all do this. Copy it again from the card and check
            the size.
          </li>
          <li>
            <strong><code className={code}>nand.bin</code> uploads but no import starts.</strong>{' '}
            Its size isn&apos;t one of the two above, so iCube doesn&apos;t recognise it as a backup
            and treats it as an ordinary upload. Copy the file from the card again and check its
            size.
          </li>
          <li>
            <strong>
              &ldquo;A Wii NAND import can&apos;t start right now. Quit the game, then upload
              nand.bin again.&rdquo;
            </strong>{' '}
            A game is running. Quit it and try again.
          </li>
          <li>
            <strong>&ldquo;This file does not contain a valid Wii filesystem.&rdquo;</strong> The
            keys don&apos;t match the backup, or the backup is damaged. Make a fresh backup, and use
            the <code className={code}>keys.bin</code> from that same one.
          </li>
          <li>
            <strong>&ldquo;The Wii NAND backup couldn&apos;t be imported.&rdquo;</strong> The
            import didn&apos;t finish. Check the file and its keys, then try again.
          </li>
        </ul>
        <p className={`${body} mt-4`}>
          If a game still stops with a missing-title alert after a good import, that title
          isn&apos;t on your console either. Install it on the Wii and make a new backup.
        </p>
      </div>

      <div className={card}>
        <p className={body}>
          For single WiiWare and Virtual Console titles, see{' '}
          <Link href="/guide/dumping-wiiware/" className={link}>
            WiiWare, Virtual Console &amp; Channels
          </Link>
          . For discs, see{' '}
          <Link href="/guide/dumping-discs/" className={link}>
            Dumping GameCube &amp; Wii Discs
          </Link>
          .
        </p>
      </div>
    </>
  );
}

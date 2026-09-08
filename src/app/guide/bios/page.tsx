import type { Metadata } from 'next';
import Link from 'next/link';
import { breadcrumbJsonLd } from '../guideNav';

export const metadata: Metadata = {
  title: 'GameCube BIOS (IPL)',
  description:
    'How to install the GameCube IPL/BIOS (IPL.bin) in iCube. Required for the GameCube Main Menu and for booting games with that menu enabled. Dump it from your own console.',
  alternates: { canonical: 'https://icube-emu.com/guide/bios/' },
};

export default function GameCubeBiosGuide() {
  const jsonLd = breadcrumbJsonLd('GameCube BIOS (IPL)', 'https://icube-emu.com/guide/bios/');
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-8">
        GameCube BIOS (IPL)
      </h1>

      {/* Overview */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
          What is the GameCube IPL?
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          The GameCube IPL (sometimes called the GameCube BIOS, or <code className="font-mono text-sm bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded">IPL.bin</code>)
          is the console&apos;s boot ROM. It&apos;s the startup program that plays the
          animated &ldquo;cube&rdquo; intro and shows the GameCube Main Menu where you
          can manage memory cards and adjust system settings before a game loads.
        </p>
        <p className="text-gray-600 dark:text-gray-300">
          It is separate from your games. iCube can run most titles without it, but a
          few features need it (see below).
        </p>
      </div>

      {/* When it's required */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
          When the IPL is required
        </h2>
        <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2">
          <li>
            To use the GameCube Main Menu itself (the boot animation and system menu).
          </li>
          <li>
            To boot any game while <strong>Load GameCube Main Menu</strong> is turned on.
            With that setting on, iCube boots into the IPL first, so the IPL must be
            installed or nothing will start.
          </li>
        </ul>
        <p className="text-gray-600 dark:text-gray-300 mt-4">
          You&apos;ll find this toggle under{' '}
          <strong>Settings &rarr; Config &rarr; GameCube &rarr; Load GameCube Main Menu</strong>.
        </p>
      </div>

      {/* Why we can't ship it */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
          Why iCube doesn&apos;t include it
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          The IPL is copyrighted Nintendo code. iCube can&apos;t and doesn&apos;t bundle
          it. You have to supply your own, dumped from a GameCube console you own.
        </p>
        <p className="text-gray-600 dark:text-gray-300">
          Open-source tools exist that run on a homebrew-enabled GameCube or Wii to dump
          the IPL from your own hardware. We don&apos;t host, link to, or distribute IPL
          files or game ROMs &mdash; only dump from a console you own.
        </p>
      </div>

      {/* How to dump it */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
          Dumping the IPL from your own console
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          The IPL lives in the boot ROM of a real GameCube or Wii. There is no software
          download for it; you read it off hardware you own. The usual route is to run
          homebrew on the console (loaders like Swiss or PicoBoot), then run a dumper that
          writes the boot ROM out to an SD card or over the network as{' '}
          <code className="font-mono text-sm bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded">IPL.bin</code>.
        </p>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          This is the same dump Dolphin uses, so any Dolphin IPL guide applies directly to
          iCube. For step-by-step instructions and current tools, see the{' '}
          <a
            href="https://wiki.provenance-emu.com/installation-and-usage/roms/ripping-roms#gamecube--wii"
            className="text-blue-600 dark:text-blue-400 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Provenance ripping guide
          </a>{' '}
          and Dolphin&apos;s own ripping documentation.
        </p>
        <p className="text-gray-600 dark:text-gray-300">
          Disc-dumping tools such as CleanRip pull games, not the boot ROM. Dumping the IPL
          is a separate homebrew step.
        </p>
      </div>

      {/* Identify a good dump */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
          Identifying a good dump
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          A correct IPL is exactly <strong>2,097,152 bytes</strong> (2&nbsp;MiB) and is named{' '}
          <code className="font-mono text-sm bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded">IPL.bin</code>.
          iCube checks the file against a list of known-good dumps by{' '}
          <strong>CRC32</strong>. If yours does not match, iCube reports{' '}
          <em>&ldquo;The IPL file is not a known good dump&rdquo;</em> and prints the CRC32 it
          computed, so you can compare it against the table below.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600 dark:text-gray-300 mb-4">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="py-2 pr-4 font-semibold text-gray-900 dark:text-white">Region / Revision</th>
                <th className="py-2 pr-4 font-semibold text-gray-900 dark:text-white">Board</th>
                <th className="py-2 font-semibold text-gray-900 dark:text-white">CRC32</th>
              </tr>
            </thead>
            <tbody className="font-mono">
              <tr className="border-b border-gray-100 dark:border-gray-700/50"><td className="py-1.5 pr-4">NTSC 1.0</td><td className="py-1.5 pr-4">DOL-001 / DOT-001 / SL-GC10</td><td className="py-1.5">6DAC1F2A</td></tr>
              <tr className="border-b border-gray-100 dark:border-gray-700/50"><td className="py-1.5 pr-4">NTSC 1.1</td><td className="py-1.5 pr-4">DOL-001</td><td className="py-1.5">D5E6FEEA</td></tr>
              <tr className="border-b border-gray-100 dark:border-gray-700/50"><td className="py-1.5 pr-4">NTSC 1.2</td><td className="py-1.5 pr-4">DOL-001</td><td className="py-1.5">D235E3F9</td></tr>
              <tr className="border-b border-gray-100 dark:border-gray-700/50"><td className="py-1.5 pr-4">NTSC 1.2</td><td className="py-1.5 pr-4">DOL-101</td><td className="py-1.5">86573808</td></tr>
              <tr className="border-b border-gray-100 dark:border-gray-700/50"><td className="py-1.5 pr-4">MPAL 1.1 (Brazil)</td><td className="py-1.5 pr-4">DOL-002</td><td className="py-1.5">667D0B64</td></tr>
              <tr className="border-b border-gray-100 dark:border-gray-700/50"><td className="py-1.5 pr-4">PAL 1.0</td><td className="py-1.5 pr-4">DOL-001 / DOT-001P</td><td className="py-1.5">4F319F43</td></tr>
              <tr className="border-b border-gray-100 dark:border-gray-700/50"><td className="py-1.5 pr-4">PAL 1.2</td><td className="py-1.5 pr-4">DOL-101</td><td className="py-1.5">AD1B7F16</td></tr>
              <tr><td className="py-1.5 pr-4">Triforce</td><td className="py-1.5 pr-4">Arcade IPL</td><td className="py-1.5">D1883221</td></tr>
            </tbody>
          </table>
        </div>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          On a Mac you can compute the CRC32 with{' '}
          <code className="font-mono text-sm bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded">crc32 IPL.bin</code>{' '}
          (from <code className="font-mono text-sm bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded">libarchive-zip-perl</code>),
          or check the byte count with{' '}
          <code className="font-mono text-sm bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded">ls -l IPL.bin</code>.
        </p>
        <p className="text-gray-600 dark:text-gray-300">
          For full MD5 and SHA-1 hashes of every revision, cross-reference the{' '}
          <a
            href="http://redump.org/"
            className="text-blue-600 dark:text-blue-400 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redump
          </a>{' '}
          database, the standard reference for verified GameCube IPL dumps.
        </p>
      </div>

      {/* Where to put it */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
          Installing the IPL in iCube
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Once you have your <code className="font-mono text-sm bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded">IPL.bin</code>,
          place it in iCube&apos;s GameCube system folder (the Dolphin{' '}
          <code className="font-mono text-sm bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded">Sys/GC</code>{' '}
          path inside iCube&apos;s app storage), in the subfolder for its region:{' '}
          <code className="font-mono text-sm bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded">USA</code>,{' '}
          <code className="font-mono text-sm bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded">JAP</code>, or{' '}
          <code className="font-mono text-sm bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded">EUR</code>{' '}
          (so a US dump lands at{' '}
          <code className="font-mono text-sm bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded">Sys/GC/USA/IPL.bin</code>).
          You can copy the file over Wi-Fi using iCube&apos;s built-in web server. See{' '}
          <Link href="/guide/importing/" className="text-blue-600 dark:text-blue-400 hover:underline">
            Importing Games
          </Link>{' '}
          for how to connect from your computer.
        </p>
        <p className="text-gray-600 dark:text-gray-300">
          After it&apos;s in place, restart iCube so it picks up the new file.
        </p>
      </div>

      {/* Troubleshooting */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
          Troubleshooting
        </h2>

        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <div className="text-green-500 text-xl">&#10003;</div>
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white">
                Games won&apos;t start at all
              </h4>
              <p className="text-gray-600 dark:text-gray-300">
                This usually means <strong>Load GameCube Main Menu</strong> is on but no
                IPL is installed. Either install the IPL, or turn that setting off under{' '}
                <strong>Settings &rarr; Config &rarr; GameCube</strong> to boot games directly.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="text-green-500 text-xl">&#10003;</div>
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white">
                &ldquo;Cannot find the GC IPL&rdquo; error
              </h4>
              <p className="text-gray-600 dark:text-gray-300">
                iCube looked for the IPL and didn&apos;t find one for the selected region.
                Confirm <code className="font-mono text-sm bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded">IPL.bin</code>{' '}
                is in the GameCube system folder for the right region, then restart the app.
                If you don&apos;t want to use the menu, turn off{' '}
                <strong>Load GameCube Main Menu</strong>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'GameCube BIOS (IPL)',
  description:
    'How to install the GameCube IPL/BIOS (IPL.bin) in iCube. Required for the GameCube Main Menu and for booting games with that menu enabled. Dump it from your own console.',
  alternates: { canonical: 'https://icube-emu.com/help/gamecube-bios/' },
};

export default function GameCubeBiosHelp() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-blue-900">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-8 text-center">
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

          {/* Where to put it */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Installing the IPL in iCube
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Once you have your <code className="font-mono text-sm bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded">IPL.bin</code>,
              place it in iCube&apos;s GameCube system folder (the Dolphin{' '}
              <code className="font-mono text-sm bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded">Sys/GC</code>{' '}
              path inside iCube&apos;s app storage), organized by region. You can copy the
              file over Wi-Fi using iCube&apos;s built-in web server &mdash; see{' '}
              <Link href="/help/web-import/" className="text-blue-600 dark:text-blue-400 hover:underline">
                Import games over Wi-Fi
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

          <div className="text-center mt-12">
            <Link
              href="/support/"
              className="inline-block text-blue-600 dark:text-blue-400 hover:underline font-semibold"
            >
              &larr; Back to Support
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

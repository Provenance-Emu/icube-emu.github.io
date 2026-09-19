import type { Metadata } from 'next';
import Link from 'next/link';
import { breadcrumbJsonLd } from '../guideNav';

export const metadata: Metadata = {
  title: 'JIT & Performance',
  description:
    'How JIT works in iCube on iOS 26, iOS 18 and tvOS. What TXM changed, how to turn JIT on with StikDebug, what to expect without it, and how to tell which CPU core you are actually running.',
  alternates: { canonical: 'https://icube-emu.com/guide/jit/' },
};

export default function JitGuide() {
  const jsonLd = breadcrumbJsonLd('JIT & Performance', 'https://icube-emu.com/guide/jit/');
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-8">
        JIT &amp; Performance
      </h1>

      {/* TL;DR */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 mb-8">
        <p className="text-gray-700 dark:text-gray-200">
          <strong>Short version.</strong> iCube runs GameCube and Wii code two ways. The{' '}
          <strong>JIT recompiler</strong> is several times faster but needs a debugger
          attached when you start a game. The <strong>Cached Interpreter</strong> needs
          nothing at all and is what you get by default. Both work; only one is fast.
        </p>
      </div>

      {/* What JIT is */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
          What JIT actually is
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          A GameCube or Wii game is PowerPC machine code. Your iPhone is ARM. Something has
          to translate, and there are two ways to do it.
        </p>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          An <strong>interpreter</strong> reads one PowerPC instruction at a time and acts
          it out in software. It is simple, it always works, and it is slow, because every
          single instruction costs a decode and a dispatch.
        </p>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          A <strong>JIT recompiler</strong> (just-in-time) translates a whole block of
          PowerPC into real ARM instructions once, writes those into memory, and then runs
          them directly on the CPU. Every later visit to that block runs at native speed.
          That is the whole trick, and it is why JIT is worth this much effort.
        </p>
        <p className="text-gray-600 dark:text-gray-300">
          The catch is that writing instructions into memory and then executing them is
          exactly what iOS is built to prevent. An ordinary app cannot mark memory as both
          writable and executable. Apple grants that ability to debuggers, so on iOS the
          route to JIT has always run through a debugger.
        </p>
      </div>

      {/* iOS 26 / TXM */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
          What iOS 26 changed
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          iOS 26 added a hardware-backed guard called the Trusted Execution Monitor. Under
          it, the old approach stopped working: iCube could still allocate executable
          memory, but the moment it jumped into freshly written code the app was killed.
          That is why JIT was pulled from iCube for a while and every device ran the
          interpreter.
        </p>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          The way through is narrow and specific. Under the Trusted Execution Monitor, a
          page of executable memory becomes runnable once <em>a debugger has written to
          that page</em>. The write itself is the permission. So iCube asks the attached
          debugger to touch every page of its code region once, at startup, and from then
          on the region is usable for the life of the app.
        </p>
        <p className="text-gray-600 dark:text-gray-300">
          iCube reserves 288&nbsp;MB for that region and the whole authorization pass takes
          a few seconds. Once it is done the debugger can disconnect and the game keeps
          running at full speed.
        </p>
      </div>

      {/* Turning it on */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
          Turning JIT on (iOS / iPadOS)
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          On iPhone and iPad we recommend{' '}
          <a
            href="https://github.com/StephenDev0/StikDebug"
            className="text-blue-600 dark:text-blue-400 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            StikDebug
          </a>
          . It runs on the device itself, so you do not need a computer every time.
        </p>
        <ol className="list-decimal list-inside text-gray-600 dark:text-gray-300 space-y-2 mb-4">
          <li>Install StikDebug and complete its one-time pairing setup.</li>
          <li>
            Open iCube and go to <strong>Settings &rarr; Debug</strong>. If your device
            needs JIT enabling, you&apos;ll see an <strong>Enable JIT via StikDebug</strong>{' '}
            button.
          </li>
          <li>
            Tap it. iCube hands StikDebug its own broker script, StikDebug attaches and
            authorizes the code region, and iCube comes back to the foreground.
          </li>
          <li>Start your game. JIT is active for as long as the app stays running.</li>
        </ol>
        <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded p-4">
          <p className="text-gray-700 dark:text-gray-200 text-sm">
            <strong>Authorization happens once, at startup.</strong> If iCube is fully quit
            and relaunched, it has to be done again. It is not a setting that sticks across
            launches, and there is nothing iCube can do about that &mdash; the permission
            belongs to the debugger session, not to the app.
          </p>
        </div>
      </div>

      {/* Verifying */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
          Checking whether it worked
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Under <strong>Settings &rarr; Debug</strong>, iCube reports its own JIT state:
          whether JIT was acquired, whether a debugger is attached right now, and whether
          the code region was authorized.
        </p>
        <p className="text-gray-600 dark:text-gray-300">
          The honest test is the frame rate. If a game that used to crawl now holds its
          native speed, JIT is on. If nothing changed, it is not, and iCube quietly fell
          back to the interpreter rather than crashing.
        </p>
      </div>

      {/* Without JIT */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
          Running without JIT
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          You do not have to use JIT. iCube&apos;s default is the Cached Interpreter, which
          needs no debugger, no pairing and no extra app, and which has had a lot of work
          put into it. Lighter GameCube titles are genuinely playable on a recent device.
        </p>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          It will not match JIT. Demanding Wii titles in particular need the recompiler.
          If a game runs at a fraction of full speed without JIT, that is the interpreter
          doing its best, not a bug.
        </p>
        <p className="text-gray-600 dark:text-gray-300">
          A newer device helps either way. An iPhone 15 Pro or later has noticeably more
          headroom than older hardware.
        </p>
      </div>

      {/* Other platforms */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
          Older iOS, and tvOS
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          <strong>iOS 18 and earlier</strong> have no Trusted Execution Monitor, so the
          classic route applies: attach any JIT enabler once and iCube picks up the
          capability. The page-authorization pass described above is skipped entirely.
        </p>
        <p className="text-gray-600 dark:text-gray-300">
          <strong>tvOS</strong> has no StikDebug and no on-device debugger, so Apple TV runs
          the Cached Interpreter. That is the expected behaviour, not a missing feature.
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
                No &ldquo;Enable JIT via StikDebug&rdquo; button
              </h4>
              <p className="text-gray-600 dark:text-gray-300">
                iCube only shows it when StikDebug is actually installed, because it opens
                StikDebug by URL. Install StikDebug, then reopen iCube&apos;s settings.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="text-green-500 text-xl">&#10003;</div>
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white">
                It says a previous attempt did not complete
              </h4>
              <p className="text-gray-600 dark:text-gray-300">
                iCube remembers when an authorization attempt failed badly and declines to
                repeat it on its own, so a bad setup cannot make the app fail at every
                launch. Tapping <strong>Enable JIT via StikDebug</strong> clears that and
                tries again.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="text-green-500 text-xl">&#10003;</div>
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white">
                Speed went back to normal after a while
              </h4>
              <p className="text-gray-600 dark:text-gray-300">
                Check whether iCube was fully quit in the app switcher at some point.
                Authorization does not survive that. Relaunching the app means enabling JIT
                again.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="text-green-500 text-xl">&#10003;</div>
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white">
                TestFlight and App Store builds cannot do this
              </h4>
              <p className="text-gray-600 dark:text-gray-300">
                Attaching a debugger requires an entitlement Apple does not permit in App
                Store distribution, and TestFlight is App Store distribution. Those builds
                have JIT compiled out entirely and always run the Cached Interpreter. JIT
                is available on the sideloaded builds only &mdash; AltStore, SideStore or
                Sideloadly. See{' '}
                <Link href="/downloads/" className="text-blue-600 dark:text-blue-400 hover:underline">
                  Downloads
                </Link>{' '}
                for how to install those.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

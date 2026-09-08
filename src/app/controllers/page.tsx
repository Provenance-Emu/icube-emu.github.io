import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Controllers',
  description:
    'GameCube and Wii input on iCube for iOS, iPadOS, and tvOS: MFi, PlayStation, Xbox, and Switch controllers, on-screen touch controls, touchscreen Wii IR, and DSU motion support.',
  alternates: { canonical: 'https://icube-emu.com/controllers/' },
};

export default function Controllers() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-blue-900">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Controllers
          </h1>

          {/* Overview */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Physical controllers
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              iCube supports controllers through Apple&apos;s Game Controller framework, which
              covers MFi (Made for iPhone) gamepads, PlayStation DualShock 4 and DualSense,
              Xbox Wireless controllers, and Nintendo Switch Pro controllers. Pair any of them
              over Bluetooth under <strong>Settings &rarr; Bluetooth</strong> on your iPhone,
              iPad, or Apple TV &mdash; iCube picks up a connected controller automatically,
              no in-app pairing step needed.
            </p>
          </div>

          {/* Mapping */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              How buttons map to GameCube and Wii input
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              A modern gamepad has more buttons than a GameCube controller and no equivalent
              of the Wii Remote&apos;s pointer, so iCube applies sensible defaults rather than a
              rigid one-to-one layout. Face buttons and shoulder triggers map to the GameCube
              face buttons and analog triggers; the second analog stick covers the C-stick.
              iCube also ships enhanced defaults for dual-analog pads &mdash; for example,
              routing a DualShock/DualSense touchpad to Wii IR (pointer) input, and a reliable
              turbo trigger activated by holding all paddles.
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              Exact button assignments can be remapped from iCube&apos;s in-app controller
              settings if the defaults don&apos;t match how you like to play.
            </p>
          </div>

          {/* Touch controls */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              On-screen touch controls
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              On iPhone and iPad, iCube provides on-screen touch controls so you can play
              without a physical controller. For Wii games that use the Wii Remote&apos;s
              pointer, iCube adds a dedicated touchscreen IR cursor &mdash; a tuned on-screen
              pointer designed to feel natural for Wii IR input on a touch display.
            </p>
          </div>

          {/* DSU */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Motion controls via DSU (Cemuhook)
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              iCube supports DSU-compatible controllers &mdash; the Cemuhook motion-server
              protocol used by tools that expose a controller&apos;s gyroscope and accelerometer
              over the network. Connecting a DSU source gives iCube precise, low-latency motion
              input, useful for Wii games that rely on Wii Remote tilt and shake gestures beyond
              simple pointer aiming.
            </p>
          </div>

          {/* Apple TV */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Apple TV and the Siri Remote
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              The Siri Remote works with iCube for menu navigation, but it has far fewer
              buttons and no analog sticks &mdash; it can&apos;t reproduce a GameCube
              controller&apos;s dual sticks and trigger range, or the Wii Remote&apos;s
              pointer and motion input. For actually playing GameCube and Wii games on tvOS,
              we recommend pairing a physical controller (MFi, PlayStation, Xbox, or Switch
              Pro) over Bluetooth instead.
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              See{' '}
              <Link href="/support/" className="text-blue-600 dark:text-blue-400 hover:underline">
                Support
              </Link>{' '}
              if a controller isn&apos;t being detected.
            </p>
          </div>

          <div className="text-center mt-12">
            <Link
              href="/guide/"
              className="inline-block text-blue-600 dark:text-blue-400 hover:underline font-semibold"
            >
              &larr; Back to Guide
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

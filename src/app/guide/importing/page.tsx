import type { Metadata } from 'next';
import { breadcrumbJsonLd } from '../guideNav';

export const metadata: Metadata = {
  title: 'Importing Games',
  description:
    'How to import GameCube and Wii games into iCube over Wi-Fi using the built-in web server. Drag and drop ISO/WBFS files from your computer, or use the WebDAV URL in Finder.',
  alternates: { canonical: 'https://icube-emu.com/guide/importing/' },
};

export default function ImportingGuide() {
  const jsonLd = breadcrumbJsonLd('Importing Games', 'https://icube-emu.com/guide/importing/');
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-8">
        Importing Games
      </h1>

      {/* Overview */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
          The built-in web server
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          iCube includes a small web server so you can copy games onto your device over
          your local Wi-Fi network &mdash; no cables or extra apps required. It exposes
          two addresses: a <strong>Web UI</strong> page you open in a browser, and a{' '}
          <strong>WebDAV</strong> URL you can mount in Finder or a file manager.
        </p>
      </div>

      {/* Steps */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
          Importing with the Web UI
        </h2>
        <ol className="list-decimal list-inside text-gray-600 dark:text-gray-300 space-y-3">
          <li>
            Make sure your iPhone, iPad, or Apple TV and your computer are on the{' '}
            <strong>same Wi-Fi network</strong>.
          </li>
          <li>
            In iCube, open <strong>Settings</strong> and enable the web server. The{' '}
            <strong>Web UI</strong> and <strong>WebDAV</strong> addresses appear there
            once it&apos;s running (they read <em>Not Running</em> when it&apos;s off).
          </li>
          <li>
            On your computer or another phone, open a browser and go to the{' '}
            <strong>Web UI</strong> URL shown in iCube (an{' '}
            <code className="font-mono text-sm bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded">http://</code>{' '}
            address with your device&apos;s local IP).
          </li>
          <li>
            Drag and drop your GameCube (ISO) or Wii (WBFS/ISO) files onto the page to
            upload them.
          </li>
          <li>
            When the upload finishes, the games are imported and appear in your iCube
            library.
          </li>
        </ol>
      </div>

      {/* WebDAV */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
          Using WebDAV (Finder / file manager)
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Prefer to drag files in like a network drive? Use the{' '}
          <strong>WebDAV</strong> URL instead of the browser page.
        </p>
        <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2">
          <li>
            <strong>macOS Finder:</strong> choose <strong>Go &rarr; Connect to Server</strong>,
            enter the WebDAV URL from iCube&apos;s Settings, and connect.
          </li>
          <li>
            <strong>Windows / Linux / other:</strong> map or mount the same WebDAV URL
            with your file manager, then copy ROM/ISO files into it.
          </li>
        </ul>
        <p className="text-gray-600 dark:text-gray-300 mt-4">
          Files copied over WebDAV are imported into your library the same way as
          browser uploads.
        </p>
      </div>

      {/* Troubleshooting */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
          Troubleshooting
        </h2>

        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <div className="text-green-500 text-xl">&#10003;</div>
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white">
                The address won&apos;t load
              </h4>
              <p className="text-gray-600 dark:text-gray-300">
                Confirm both devices are on the same Wi-Fi network, that the server is
                running (the URL shouldn&apos;t say <em>Not Running</em>), and type the
                address exactly as shown, including the port number.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="text-green-500 text-xl">&#10003;</div>
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white">
                Connection blocked
              </h4>
              <p className="text-gray-600 dark:text-gray-300">
                A firewall, VPN, or &ldquo;client isolation&rdquo; setting on guest or
                public Wi-Fi can block the connection. Try a home network where devices
                can see each other.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="text-green-500 text-xl">&#10003;</div>
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white">
                A file didn&apos;t import
              </h4>
              <p className="text-gray-600 dark:text-gray-300">
                Use a supported format &mdash; see{' '}
                <a href="/guide/formats/" className="text-blue-600 dark:text-blue-400 hover:underline">
                  Supported Formats
                </a>. Very large transfers can take a while, so let the upload finish before
                closing the page.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Legal */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
        <p className="text-gray-600 dark:text-gray-300">
          Only import games you own and dumped yourself from your own discs. iCube
          doesn&apos;t provide games, and we don&apos;t host or link to ROMs.
        </p>
      </div>
    </>
  );
}

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy - iCube",
  description:
    "iCube itself has no accounts, ads or tracking. Anonymous crash and performance reports are on by default and can be turned off in Settings. Your games and files stay on your device. iCloud and local network features are user-controlled.",
  alternates: { canonical: 'https://icube-emu.com/privacy/' },
};

export default function Privacy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-blue-900">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-3 text-center">
            Privacy Policy
          </h1>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-10">
            Effective date: October 13, 2026
          </p>

          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-8 space-y-8 shadow-lg">
            <section>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                iCube does not collect any personally identifiable information.
                iCube itself has no accounts, no ads and no advertising or marketing tracking,
                and we never sell data. Optional RetroAchievements sign-in goes to
                retroachievements.org (see below).
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Your games and files</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                iCube includes no games and no system software. The games, saves, save states, settings and system files you add stay on your device. The developer has no server that receives them.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Crash &amp; performance reports</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                iCube sends crash reports and performance data to a crash-reporting service (Sentry) so we can find and fix bugs. This is on by default. You can turn it off at any time in the app:{" "}<span className="text-gray-900 dark:text-white font-medium">Settings → Privacy → Share Crash Reports</span>. Turning it off stops reporting immediately and deletes any reports still waiting on your device.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                What a report contains: the crash or error details, device model, OS version, app version, timings and frame-rate summaries, and settings that help us reproduce a problem (for example the CPU core in use). Reports are not linked to your identity and are never used for tracking or advertising. iCube sets no account, name or email on a report.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                The App Store version is designed to leave out the title or ID of the game you were playing and file paths. Paths inside the app&apos;s data folders are replaced before a report is sent, and network request details are not recorded. Builds distributed outside the App Store (for example sideloaded builds) can also include the ID of the game being played, and say so in their own Settings → Privacy screen.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Like any internet request, a report reaches Sentry&apos;s servers together with the sender&apos;s IP address. We do not use it to identify you.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">iCloud</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                If you turn on iCloud Sync, your game saves, save states and settings sync through your own iCloud account (Apple CloudKit). The developer has no access to that data and stores nothing on its own servers.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Local network</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                iCube has a built-in file server (a web page and WebDAV) for importing games from a computer on your own Wi-Fi. It runs while the app is open and is paused while a game is running. It is only reachable from your local network, and the transfers on it are not encrypted. The Nearby Devices feature uses local discovery to hand a game off to another device running iCube. Your device asks for permission before an app uses the local network. Nothing on the local network is sent to the developer.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Requests to other services</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Some features contact public services directly from your device. The developer does not receive these requests; the service you contact sees them, including your IP address:
              </p>
              <ul className="list-disc pl-6 mt-3 space-y-1 text-gray-700 dark:text-gray-300 leading-relaxed">
                <li>Cheat codes are downloaded from a public code database (codes.rc24.xyz) when you open the cheats screen for a game. The request includes that game&apos;s public ID.</li>
                <li>Game cover art is downloaded from GameTDB only if you turn on that setting. It is off by default.</li>
                <li>RetroAchievements is optional and off by default. If you turn it on and sign in, your RetroAchievements username and password go to retroachievements.org once, and it returns a token. The password is not stored. The username and token are kept in iCube&apos;s settings on your device (and in your own iCloud if iCloud Sync is on). While achievements are on, the loaded game&apos;s identifier and your progress are sent to retroachievements.org, under its privacy policy. The developer does not receive them.</li>
                <li>The Dolphin blog in the app loads the blog&apos;s public feed.</li>
                <li>WiiConnect24 channels use WiiLink only if you turn on that setting.</li>
              </ul>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                The skin store (iPhone and iPad) and the in-app Help download static files that we publish: the skin catalog and skins from GitHub Pages (provenance-emu.com) and GitHub, and help pages from our public GitHub repository. We run no server for these and keep no request logs of our own; GitHub and its content delivery network may log requests, as any website host does. Nothing about you is uploaded.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Online play</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Optional. iCube does not run game servers. If you enable online features for a game, that game connects to the third-party service it uses, under that service&apos;s own privacy policy.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Device permissions</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                iCube may ask for the microphone (for games that use the GameCube Microphone or Wii Speak), headphone motion (spatial audio), local network (described above) and permission to add gameplay clips to your Photos library. This stays on your device.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Contact</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Questions about privacy:{" "}
                <a href="mailto:provenance.emu+icube-privacy@gmail.com" className="text-blue-600 dark:text-blue-400 hover:underline transition-colors">
                  provenance.emu+icube-privacy@gmail.com
                </a>.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

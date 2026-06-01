import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy - iCube",
  description:
    "iCube does not collect personally identifiable information. Anonymous crash reports are opt-out. iCloud and local network features are user-controlled.",
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
            Effective date: May 31, 2026
          </p>

          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-8 space-y-8 shadow-lg">
            <section>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                iCube does not collect any personally identifiable information.
                No accounts, no logins, no ads, no advertising or marketing tracking,
                and we never sell data.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Crash &amp; performance diagnostics</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                iCube uses a crash-reporting service (Bugsnag) to collect anonymous diagnostics:
                device model, OS version, crash stack traces, and performance timings, so we can
                fix bugs. This is not personally identifiable, not linked to you, and never used
                for tracking or advertising. You can turn it off any time in the app:{" "}
                <span className="text-gray-900 dark:text-white font-medium">Settings → Upload Crash Reports</span>.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">iCloud</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Game saves and settings sync through your own iCloud account (Apple CloudKit).
                The developer has no access and stores nothing on its own servers.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Local network</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                An optional built-in web server lets you transfer files over your own Wi-Fi.
                Nothing leaves your network.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Online play</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Optional. Connects to game servers only when you start an online game.
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

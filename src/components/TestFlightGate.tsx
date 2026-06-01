"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import SocialButton, { BmcIcon, PatreonIcon, VenmoIcon, ZelleIcon, OpenCollectiveIcon } from "@/components/SocialButton";

const TESTFLIGHT_URL = "https://testflight.apple.com/join/9ZEfnyMP";
const TWITTER_URL = "https://x.com/provenanceapp";
const STORAGE_KEY = "icube_testflight_gate_passed";

export default function TestFlightGate() {
  const [gatePassed, setGatePassed] = useState<boolean>(false);
  const [checking, setChecking] = useState<boolean>(true);

  useEffect(() => {
    try {
      const stored = typeof window !== "undefined" ? window.localStorage.getItem(STORAGE_KEY) : null;
      setGatePassed(stored === "true");
    } catch {}
    setChecking(false);
  }, []);

  function markPassed(_method: "follow" | "skip") {
    try {
      window.localStorage.setItem(STORAGE_KEY, "true");
    } catch {}
    setGatePassed(true);
  }

  if (checking) {
    return (
      <main className="min-h-screen container mx-auto px-4 py-12">
        <div className="mx-auto max-w-2xl animate-pulse text-center text-gray-600 dark:text-gray-400">Loading…</div>
      </main>
    );
  }

  return (
    <main className="min-h-screen container mx-auto px-4 py-12">
      <div className="mx-auto max-w-2xl space-y-6">
        <header className="space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight text-gray-900 dark:text-white">Join the iCube TestFlight</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Get early access to iCube builds via Apple TestFlight. Seats may be limited.
          </p>
        </header>

        {!gatePassed ? (
          <section className="rounded-lg border border-gray-200 dark:border-gray-700 p-6 shadow-sm bg-white dark:bg-gray-800">
            <h2 className="text-xl font-medium mb-2 text-gray-900 dark:text-white">Help support the project</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Please follow <a href={TWITTER_URL} target="_blank" rel="noreferrer noopener" className="underline underline-offset-4">@provenanceapp</a> on X (Twitter) to stay updated on releases and development. Once followed, click “I followed” below. If you prefer not to follow, you can still proceed.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href={TWITTER_URL}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center justify-center rounded-md border bg-black text-white px-4 py-2 text-sm font-medium hover:opacity-90 transition"
              >
                Follow on X (@provenanceapp)
              </a>
              <button
                type="button"
                onClick={() => markPassed("follow")}
                className="inline-flex items-center justify-center rounded-md border border-gray-300 dark:border-gray-600 px-4 py-2 text-sm font-medium text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition"
              >
                I followed
              </button>
              <button
                type="button"
                onClick={() => markPassed("skip")}
                className="inline-flex items-center justify-center rounded-md border border-gray-300 dark:border-gray-600 px-4 py-2 text-sm font-medium text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition"
              >
                Proceed without following
              </button>
            </div>
          </section>
        ) : (
          <section className="rounded-lg border border-gray-200 dark:border-gray-700 p-6 shadow-sm bg-white dark:bg-gray-800">
            <h2 className="text-xl font-medium mb-2 text-gray-900 dark:text-white">You’re in</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Click below to open the TestFlight invite. If the build is full, try again later.
            </p>
            <div className="flex gap-3">
              <a
                href={TESTFLIGHT_URL}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center justify-center rounded-md bg-blue-600 text-white px-4 py-2 text-sm font-medium hover:bg-blue-500 transition"
              >
                Open TestFlight Invite
              </a>
              <Link
                href="/"
                className="inline-flex items-center justify-center rounded-md border border-gray-300 dark:border-gray-600 px-4 py-2 text-sm font-medium text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition"
              >
                Go home
              </Link>
            </div>
          </section>
        )}

        <section className="text-xs text-gray-600 dark:text-gray-400">
          <p>
            Note: Following is optional and not required for access. Your choice is stored locally in your browser.
          </p>
        </section>

        <section className="rounded-lg border border-gray-200 dark:border-gray-700 p-6 shadow-sm bg-white dark:bg-gray-800">
          <h2 className="text-xl font-medium mb-2">Support Development</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            If you find iCube helpful, consider supporting ongoing development. Thank you!
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 justify-items-start">
            <SocialButton
              href="https://buymeacoffee.com/joemattiello"
              label="Buy Me a Coffee"
              leftIcon={<BmcIcon className="w-5 h-5" />}
              variant="bmc"
            />
            <SocialButton
              href="https://www.patreon.com/provenance"
              label="Support on Patreon"
              leftIcon={<PatreonIcon className="w-5 h-5" />}
              variant="patreon"
            />
            <SocialButton
              href="https://account.venmo.com/u/Joe-Mattiello"
              label="Venmo: @Joe-Mattiello"
              leftIcon={<VenmoIcon className="w-5 h-5" />}
              variant="venmo"
            />
            <SocialButton
              href="mailto:mail@joemattiello.com?subject=Zelle%20Donation%20for%20iCube"
              label="Zelle: mail@joemattiello.com"
              leftIcon={<ZelleIcon className="w-5 h-5" />}
              variant="zelle"
            />
            <SocialButton
              href="https://opencollective.com/provenanceemu"
              label="Open Collective"
              leftIcon={<OpenCollectiveIcon className="w-5 h-5" />}
              variant="opencollective"
            />
          </div>
        </section>
      </div>
    </main>
  );
}

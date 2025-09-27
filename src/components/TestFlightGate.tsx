"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

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

  function markPassed(method: "follow" | "skip") {
    try {
      window.localStorage.setItem(STORAGE_KEY, "true");
    } catch {}
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", "testflight_access", {
        method,
      });
    }
    setGatePassed(true);
  }

  if (checking) {
    return (
      <main className="min-h-screen container mx-auto px-4 py-12">
        <div className="mx-auto max-w-2xl animate-pulse text-center text-muted-foreground">Loading…</div>
      </main>
    );
  }

  return (
    <main className="min-h-screen container mx-auto px-4 py-12">
      <div className="mx-auto max-w-2xl space-y-6">
        <header className="space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight">Join the iCube TestFlight</h1>
          <p className="text-muted-foreground">
            Get early access to iCube builds via Apple TestFlight. Seats may be limited.
          </p>
        </header>

        {!gatePassed ? (
          <section className="rounded-lg border p-6 shadow-sm bg-background/60 backdrop-blur">
            <h2 className="text-xl font-medium mb-2">Help support the project</h2>
            <p className="text-sm text-muted-foreground mb-4">
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
                className="inline-flex items-center justify-center rounded-md border px-4 py-2 text-sm font-medium hover:bg-accent transition"
              >
                I followed
              </button>
              <button
                type="button"
                onClick={() => markPassed("skip")}
                className="inline-flex items-center justify-center rounded-md border px-4 py-2 text-sm font-medium hover:bg-accent transition"
              >
                Proceed without following
              </button>
            </div>
          </section>
        ) : (
          <section className="rounded-lg border p-6 shadow-sm bg-background/60 backdrop-blur">
            <h2 className="text-xl font-medium mb-2">You’re in</h2>
            <p className="text-sm text-muted-foreground mb-4">
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
                className="inline-flex items-center justify-center rounded-md border px-4 py-2 text-sm font-medium hover:bg-accent transition"
              >
                Go home
              </Link>
            </div>
          </section>
        )}

        <section className="text-xs text-muted-foreground">
          <p>
            Note: Following is optional and not required for access. Your choice is stored locally in your browser.
          </p>
        </section>
      </div>
    </main>
  );
}

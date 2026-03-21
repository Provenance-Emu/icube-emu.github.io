"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, Suspense } from "react";

const GA_MEASUREMENT_ID = "G-R9V4MJ0BR2";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

function GoogleAnalyticsInner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const path = pathname ?? "/";
    const query = searchParams?.toString();
    const url = query ? `${path}?${query}` : path;
    if (typeof window !== "undefined" && typeof window.gtag === "function") {
      window.gtag("config", GA_MEASUREMENT_ID, { page_path: url });
    }
  }, [pathname, searchParams]);

  return null;
}

export default function GoogleAnalytics() {
  return (
    <Suspense fallback={null}>
      <GoogleAnalyticsInner />
    </Suspense>
  );
}

import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Script from "next/script";
import GoogleAnalytics from "@/components/GoogleAnalytics";

const GA_ID = "G-R9V4MJ0BR2";

export const metadata: Metadata = {
  metadataBase: new URL("https://icube-app.com"),
  title: {
    default: "iCube – GameCube & Wii Emulator for iOS & tvOS",
    template: "%s | iCube",
  },
  description:
    "Play classic Nintendo GameCube and Wii games on your iPhone, iPad, and Apple TV. Fast, accurate emulation based on Dolphin with controller support, save states, and more.",
  keywords: [
    "GameCube emulator",
    "Wii emulator",
    "iOS emulator",
    "tvOS emulator",
    "iCube",
    "Dolphin iOS",
    "Nintendo emulator",
    "Apple TV emulator",
    "iPhone emulator",
  ],
  authors: [{ name: "Provenance Emu" }],
  creator: "Provenance Emu",
  openGraph: {
    type: "website",
    siteName: "iCube",
    title: "iCube – GameCube & Wii Emulator for iOS & tvOS",
    description:
      "Play classic Nintendo GameCube and Wii games on your iPhone, iPad, and Apple TV. Fast, accurate emulation based on Dolphin with controller support and save states.",
    url: "https://icube-app.com",
    images: [
      {
        url: "/header.png",
        width: 1200,
        height: 630,
        alt: "iCube – GameCube & Wii Emulator for iOS & tvOS",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@ProvenanceApp",
    creator: "@ProvenanceApp",
    title: "iCube – GameCube & Wii Emulator for iOS & tvOS",
    description:
      "Play classic Nintendo GameCube and Wii games on your iPhone, iPad, and Apple TV.",
    images: ["/header.png"],
  },
  icons: {
    icon: [
      { url: "/favicons/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicons/favicon-48.png", sizes: "48x48", type: "image/png" },
      { url: "/favicons/favicon-96.png", sizes: "96x96", type: "image/png" },
      { url: "/favicons/favicon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/favicons/favicon.ico", type: "image/x-icon" },
    ],
    apple: [
      { url: "/favicons/favicon-120-precomposed.png", sizes: "120x120" },
      { url: "/favicons/favicon-152-precomposed.png", sizes: "152x152" },
      { url: "/favicons/favicon-180-precomposed.png", sizes: "180x180" },
    ],
  },
  manifest: "/favicons/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "iCube",
  },
  other: {
    "theme-color": "#5b96fa",
  },
};

// CSP — sets the policy via <meta> since GitHub Pages doesn't support custom HTTP headers.
// HSTS and X-Frame-Options still require HTTP headers and must be set at the CDN layer
// (e.g. Cloudflare). See: https://observatory.mozilla.org/analyze/icube-app.com
const CSP = [
  "default-src 'self'",
  "script-src 'self' https://www.googletagmanager.com https://www.google-analytics.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: https: blob:",
  "frame-src https://itch.io https://html.itch.zone https://v6p9d9t4.ssl.hwcdn.net",
  "connect-src 'self' https://www.google-analytics.com https://analytics.google.com https://region1.google-analytics.com https://region1.analytics.google.com",
  "font-src 'self'",
  "object-src 'none'",
  "worker-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "upgrade-insecure-requests",
].join("; ");

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "iCube",
  applicationCategory: "GameApplication",
  applicationSubCategory: "Emulator",
  operatingSystem: "iOS 16+, tvOS 16+",
  description:
    "A GameCube and Wii emulator for iOS and tvOS based on Dolphin. Play classic Nintendo games on your iPhone, iPad, and Apple TV.",
  url: "https://icube-app.com",
  image: "https://icube-app.com/icon-1024.png",
  author: {
    "@type": "Organization",
    name: "Provenance Emu",
    url: "https://provenance-emu.com",
  },
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
    availability: "https://schema.org/InStock",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta httpEquiv="Content-Security-Policy" content={CSP} />
        <meta name="referrer" content="strict-origin-when-cross-origin" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body suppressHydrationWarning className="antialiased">
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script src="/gtag-init.js" strategy="afterInteractive" />
        <Navigation />
        <GoogleAnalytics />
        <main className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}

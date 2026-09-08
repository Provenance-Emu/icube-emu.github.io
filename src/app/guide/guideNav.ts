export type GuidePage = { href: string; label: string; blurb: string };

export const GUIDE_PAGES: GuidePage[] = [
  { href: '/guide/', label: 'Overview', blurb: 'Start here — get your first game running.' },
  { href: '/guide/importing/', label: 'Importing Games', blurb: 'Import GameCube and Wii games over Wi-Fi with the built-in web server.' },
  { href: '/guide/formats/', label: 'Supported Formats', blurb: 'ISO, RVZ, WBFS, and every disc format iCube reads — plus which to pick.' },
  { href: '/guide/bios/', label: 'GameCube BIOS (IPL)', blurb: 'When you need the GameCube IPL, and how to dump and install your own.' },
  { href: '/guide/faq/', label: 'FAQ & Troubleshooting', blurb: 'Answers to the most common questions.' },
];

export function breadcrumbJsonLd(pageLabel: string, pageUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://icube-emu.com/' },
      { '@type': 'ListItem', position: 2, name: 'Guide', item: 'https://icube-emu.com/guide/' },
      { '@type': 'ListItem', position: 3, name: pageLabel, item: pageUrl },
    ],
  };
}

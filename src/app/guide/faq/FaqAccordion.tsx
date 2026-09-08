'use client';

import Link from 'next/link';
import Accordion, { type AccordionItemData } from '@/components/ui/Accordion';
import { faqItems } from './faqData';

const richOverrides: Record<string, React.ReactNode> = {
  'Do I need the GameCube BIOS (IPL)?': (
    <>
      Only for the GameCube Main Menu itself, or when the &ldquo;Load GameCube Main
      Menu&rdquo; setting is on. Most games run without it. See{' '}
      <Link href="/guide/bios/" className="text-blue-600 dark:text-blue-400 hover:underline">
        GameCube BIOS (IPL)
      </Link>{' '}
      for how to dump and install your own.
    </>
  ),
  'Which controllers are supported?': (
    <>
      iCube supports MFi (Made for iPhone) controllers, PlayStation DualShock 4,
      PlayStation DualSense, Xbox Wireless Controllers, and the Siri Remote on Apple TV.
      Touch controls are also available on iPhone and iPad. See the{' '}
      <Link href="/controllers/" className="text-blue-600 dark:text-blue-400 hover:underline">
        Controllers
      </Link>{' '}
      page for details.
    </>
  ),
  'How do I import games over Wi-Fi?': (
    <>
      iCube has a built-in web server with a Web UI and a WebDAV address. See{' '}
      <Link href="/guide/importing/" className="text-blue-600 dark:text-blue-400 hover:underline">
        Importing Games
      </Link>{' '}
      for step-by-step instructions.
    </>
  ),
  'How do I install games on iCube?': (
    <>
      You&apos;ll need to provide your own GameCube (ISO) and Wii (WBFS/ISO) game files.
      These can be imported through the built-in Wi-Fi web server (see{' '}
      <Link href="/guide/importing/" className="text-blue-600 dark:text-blue-400 hover:underline">
        Importing Games
      </Link>
      ), iTunes file sharing, cloud storage, or other file management apps. Make sure you
      own the original games before using ROM files.
    </>
  ),
};

const items: AccordionItemData[] = faqItems.map((item) => ({
  q: item.q,
  a: richOverrides[item.q] ?? <>{item.a}</>,
}));

export default function FaqAccordion() {
  return <Accordion items={items} />;
}

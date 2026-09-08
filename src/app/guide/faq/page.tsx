import type { Metadata } from 'next';
import { breadcrumbJsonLd } from '../guideNav';
import FaqAccordion from './FaqAccordion';
import { faqItems } from './faqData';

export const metadata: Metadata = {
  title: 'FAQ & Troubleshooting',
  description:
    'Answers to common iCube questions: installing games, sideloading, controller support, device compatibility, save states, and performance.',
  alternates: { canonical: 'https://icube-emu.com/guide/faq/' },
};

export default function FaqPage() {
  const breadcrumb = breadcrumbJsonLd('FAQ & Troubleshooting', 'https://icube-emu.com/guide/faq/');
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
        FAQ &amp; Troubleshooting
      </h1>
      <p className="text-gray-600 dark:text-gray-300 mb-8">
        The common questions and fixes. Still stuck? Reach out on{' '}
        <a
          href="https://discord.com/invite/4TK7PU5"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 dark:text-blue-400 hover:underline"
        >
          Discord
        </a>{' '}
        or email{' '}
        <a
          href="mailto:provenance.emu+icube-support@gmail.com?subject=iCube%20Support"
          className="text-blue-600 dark:text-blue-400 hover:underline"
        >
          support
        </a>
        .
      </p>
      <FaqAccordion />
    </>
  );
}

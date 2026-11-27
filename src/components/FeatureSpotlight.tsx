import Image from 'next/image';
import Link from 'next/link';
import captures from '@/data/gallery-native.json';

type Props = { title: string; description: string; href: string; linkLabel: string; view?: 'library' | 'play'; heading?: 'h1' | 'h2'; };

export default function FeatureSpotlight({ title, description, href, linkLabel, view = 'library', heading: Heading = 'h2' }: Props) {
  const capture = captures[view === 'play' ? 'ipad/play' : 'ipad/library'];
  return (
    <div className="mx-auto grid max-w-6xl items-center gap-8 lg:grid-cols-[minmax(0,4fr)_minmax(0,6fr)] lg:gap-12">
      <div className="max-w-lg">
        <Heading className="text-balance text-3xl font-bold tracking-tight sm:text-4xl text-slate-950 dark:text-white">{title}</Heading>
        <p className="mt-4 max-w-md leading-relaxed text-slate-700 dark:text-gray-300">{description}</p>
        <Link href={href} className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-sm font-semibold underline decoration-current/40 underline-offset-4 hover:decoration-current focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-indigo-500 text-indigo-700 dark:text-indigo-300">
          {linkLabel} <span aria-hidden="true">→</span>
        </Link>
      </div>
      <Image src={capture.src} alt={capture.alt} width={capture.width} height={capture.height} className="w-full rounded-2xl border border-indigo-950/15 dark:border-white/10" />
    </div>
  );
}

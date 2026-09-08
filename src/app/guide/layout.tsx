'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { GUIDE_PAGES } from './guideNav';

export default function GuideLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const normalized = pathname.endsWith('/') ? pathname : `${pathname}/`;
  const currentIndex = GUIDE_PAGES.findIndex((p) => p.href === normalized);
  const prev = currentIndex > 0 ? GUIDE_PAGES[currentIndex - 1] : null;
  const next = currentIndex >= 0 && currentIndex < GUIDE_PAGES.length - 1 ? GUIDE_PAGES[currentIndex + 1] : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-blue-900">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto grid gap-8 lg:grid-cols-[240px_1fr]">
          {/* Sub-nav */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <nav
              aria-label="Guide navigation"
              className="flex gap-2 overflow-x-auto rounded-lg bg-white p-3 shadow-lg dark:bg-gray-800 lg:flex-col lg:gap-1"
            >
              {GUIDE_PAGES.map((p) => {
                const active = p.href === normalized;
                return (
                  <Link
                    key={p.href}
                    href={p.href}
                    className={`whitespace-nowrap rounded-md px-3 py-2 text-sm transition-colors ${
                      active
                        ? 'bg-blue-600 font-medium text-white'
                        : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                    }`}
                  >
                    {p.label}
                  </Link>
                );
              })}
            </nav>
          </aside>

          {/* Content */}
          <div className="min-w-0">
            <article>{children}</article>

            {(prev || next) && (
              <div className="mt-10 flex items-center justify-between gap-4 border-t border-gray-200 pt-6 dark:border-gray-700">
                {prev ? (
                  <Link href={prev.href} className="text-sm text-blue-600 hover:underline dark:text-blue-400">
                    ← {prev.label}
                  </Link>
                ) : (
                  <span />
                )}
                {next ? (
                  <Link href={next.href} className="text-sm text-blue-600 hover:underline dark:text-blue-400">
                    {next.label} →
                  </Link>
                ) : (
                  <span />
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

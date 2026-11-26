'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRef, useState } from 'react';

const navItems = [
  { href: '/downloads/', label: 'Downloads' },
  { href: '/guide/', label: 'Guide' },
  { href: '/sources/', label: 'Sources' },
  { href: '/about/', label: 'About' },
  { href: '/features/', label: 'Features' },
  { href: '/support/', label: 'Support' },
  { href: '/donate/', label: 'Donate' },
];

export default function Navigation() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const currentPath = pathname.endsWith('/') ? pathname : pathname + '/';

  function links(mobile: boolean) {
    return navItems.map(({ href, label }) => {
      const active = currentPath.startsWith(href);
      return (
        <Link
          key={href}
          href={href}
          prefetch={false}
          aria-current={active ? 'page' : undefined}
          className={`${mobile ? 'block min-h-11 px-3 py-3' : 'px-3 py-1.5'} rounded-lg text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 ${
            active
              ? 'bg-blue-600/10 text-blue-600 dark:text-blue-400'
              : 'text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800'
          }`}
          onClick={mobile ? () => setMenuOpen(false) : undefined}
        >
          {label}
        </Link>
      );
    });
  }

  return (
    <nav
      aria-label="Main navigation"
      className="sticky top-0 z-40 bg-white/90 dark:bg-gray-950/90 backdrop-blur-md border-b border-gray-200/80 dark:border-gray-800/80"
      onKeyDown={event => {
        if (menuOpen && event.key === 'Escape') {
          setMenuOpen(false);
          toggle.current?.focus();
        }
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" prefetch={false} className="flex shrink-0 items-center" onClick={() => setMenuOpen(false)}>
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              i<span className="text-blue-600 dark:text-blue-400">Cube</span>
            </span>
          </Link>
          <div className="hidden md:flex items-center gap-1">{links(false)}</div>
          <button
            ref={toggle}
            type="button"
            className="md:hidden grid size-11 place-items-center rounded-md text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-controls="mobile-navigation"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(open => !open)}
          >
            <svg className="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d={menuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
            </svg>
          </button>
        </div>
      </div>
      <div
        id="mobile-navigation"
        hidden={!menuOpen}
        className="md:hidden max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-gray-200 bg-white px-4 py-2 dark:border-gray-800 dark:bg-gray-950"
      >
        {links(true)}
      </div>
    </nav>
  );
}

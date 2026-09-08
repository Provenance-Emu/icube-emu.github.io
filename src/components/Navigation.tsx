'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navigation = () => {
  const pathname = usePathname();

  const navItems = [
    { href: '/downloads/', label: 'Downloads' },
    { href: '/guide/', label: 'Guide' },
    { href: '/sources/', label: 'Sources' },
    { href: '/about/', label: 'About' },
    { href: '/features/', label: 'Features' },
    { href: '/support/', label: 'Support' },
    { href: '/donate/', label: 'Donate' },
  ];

  return (
    <nav className="sticky top-0 z-40 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md border-b border-gray-200/80 dark:border-gray-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center">
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              i<span className="text-blue-600 dark:text-blue-400">Cube</span>
            </span>
          </Link>
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                  pathname === item.href
                    ? 'bg-blue-600/10 text-blue-600 dark:text-blue-400'
                    : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
          {/* Mobile nav */}
          <div className="md:hidden flex items-center gap-1 overflow-x-auto no-scrollbar">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`shrink-0 px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${
                  pathname === item.href
                    ? 'bg-blue-600/10 text-blue-600 dark:text-blue-400'
                    : 'text-gray-600 dark:text-gray-300'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
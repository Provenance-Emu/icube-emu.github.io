import React from 'react';
import Link from 'next/link';

type StoreBadgeProps = {
  href: string;
  eyebrow: string;
  label: string;
  icon: React.ReactNode;
  className?: string;
  external?: boolean;
};

const baseClasses =
  'inline-flex items-center gap-3 rounded-xl bg-gray-900 dark:bg-black px-4 py-2.5 text-left text-white ' +
  'ring-1 ring-white/10 transition-colors hover:bg-gray-800 dark:hover:bg-gray-900 ' +
  'focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-gray-900';

/**
 * Store-badge style button (icon + eyebrow + bold label), matching the
 * "Download on the App Store" style buttons on provenance-emu.com.
 */
const StoreBadge: React.FC<StoreBadgeProps> = ({ href, eyebrow, label, icon, className, external = true }) => {
  const content = (
    <>
      <span className="flex h-7 w-7 shrink-0 items-center justify-center text-white">{icon}</span>
      <span className="flex flex-col leading-tight">
        <span className="text-[10px] uppercase tracking-wide text-gray-300">{eyebrow}</span>
        <span className="text-sm font-semibold">{label}</span>
      </span>
    </>
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={`${baseClasses} ${className ?? ''}`}>
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={`${baseClasses} ${className ?? ''}`}>
      {content}
    </Link>
  );
};

export const AltStoreGlyph: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className={className ?? 'w-5 h-5'} aria-hidden="true">
    <rect x="4" y="3" width="16" height="18" rx="3" />
    <path strokeLinecap="round" d="M12 8v6m-3-3h6" />
    <path strokeLinecap="round" d="M9.5 17.5h5" />
  </svg>
);

export const SideStoreGlyph: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className={className ?? 'w-5 h-5'} aria-hidden="true">
    <rect x="4" y="3" width="16" height="18" rx="3" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M10 9.5l3 2.5-3 2.5" />
  </svg>
);

export default StoreBadge;

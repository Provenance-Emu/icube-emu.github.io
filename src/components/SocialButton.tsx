import React from 'react';

export type SocialButtonProps = {
  href: string;
  label: string;
  leftIcon?: React.ReactNode;
  className?: string;
  variant?: 'default' | 'discord' | 'x' | 'bmc' | 'patreon' | 'venmo' | 'zelle' | 'opencollective';
};

const baseClasses =
  'inline-flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-colors transition-shadow shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500';

const variantClasses = {
  default: 'bg-gray-900 text-white hover:bg-gray-800',
  discord: 'bg-indigo-600 text-white hover:bg-indigo-500',
  x: 'bg-black text-white hover:bg-neutral-800',
  bmc: 'bg-yellow-400 text-black hover:bg-yellow-300',
  patreon: 'bg-orange-600 text-white hover:bg-orange-500',
  venmo: 'bg-sky-500 text-white hover:bg-sky-400',
  zelle: 'bg-purple-700 text-white hover:bg-purple-600',
  opencollective: 'bg-blue-600 text-white hover:bg-blue-500',
} as const;

export const DiscordIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className ?? 'w-5 h-5'}
    aria-hidden="true"
  >
    <path d="M20.317 4.369A19.791 19.791 0 0 0 16.558 3c-.2.355-.432.83-.593 1.205a18.27 18.27 0 0 0-3.93 0A11.09 11.09 0 0 0 11.443 3c-1.3.23-2.54.6-3.759 1.11C3.733 6.37 2.49 9.6 2.75 12.77c1.566 1.17 3.08 1.886 4.59 2.34.37-.51.702-1.055.989-1.627-.55-.21-1.078-.466-1.58-.768.132-.096.262-.196.386-.3 3.045 1.413 6.34 1.413 9.36 0 .127.104.255.204.386.3-.5.302-1.028.558-1.578.768.286.572.62 1.116.989 1.627 1.51-.454 3.023-1.17 4.59-2.34.38-4.513-1.48-7.317-3.615-8.401ZM9.58 12.66c-.623 0-1.132-.6-1.132-1.335 0-.735.505-1.34 1.132-1.34.631 0 1.14.606 1.132 1.34 0 .735-.505 1.334-1.132 1.334Zm4.85 0c-.623 0-1.132-.6-1.132-1.335 0-.735.505-1.34 1.132-1.34.631 0 1.14.606 1.132 1.34 0 .735-.505 1.334-1.132 1.334Z" />
  </svg>
);

export const XIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className ?? 'w-5 h-5'}
    aria-hidden="true"
  >
    <path d="M3 3h4.6l5.12 7.52L16.98 3H21l-7.36 10.7L21.5 21h-4.6l-5.5-8.08L7.02 21H3l7.8-11.35L3 3Z" />
  </svg>
);

export const BmcIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className ?? 'w-5 h-5'} aria-hidden="true">
    <path d="M3 7a2 2 0 0 1 2-2h8.5a4.5 4.5 0 0 1 0 9H12l-.6 3.1a2 2 0 0 1-2 1.9H6.5a2 2 0 0 1-1.94-1.5L3 7Zm13.5 5a2.5 2.5 0 1 0 0-5H5l1.9 9.5a.5.5 0 0 0 .49.4H9.4l.6-3.1a2 2 0 0 1 2-1.9h4.5Z"/>
  </svg>
);

export const PatreonIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className ?? 'w-5 h-5'} aria-hidden="true">
    <path d="M3 3h3v18H3V3Zm9 0a9 9 0 1 1 0 18 9 9 0 0 1 0-18Z"/>
  </svg>
);

export const VenmoIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className ?? 'w-5 h-5'} aria-hidden="true">
    <path d="M4 3h16a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H9l3.5-8.5c.3-.8.5-1.5.5-2.2 0-1.4-.8-2.3-2.2-2.3-1.5 0-2.7 1.1-3.1 2.4L6.6 19H4V4a1 1 0 0 1 1-1Z"/>
  </svg>
);

export const ZelleIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className ?? 'w-5 h-5'} aria-hidden="true">
    <path d="M7 3h10l-6 7h6l-10 11v-7H7l6-7H7V3Z"/>
  </svg>
);

export const OpenCollectiveIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className ?? 'w-5 h-5'} aria-hidden="true">
    <path d="M12 2a10 10 0 1 0 7.1 17.1l-2.1-2.1A7 7 0 1 1 12 5a7 7 0 0 1 4.9 2.1L19 5A10 10 0 0 0 12 2Z"/>
  </svg>
);

const SocialButton: React.FC<SocialButtonProps> = ({ href, label, leftIcon, className, variant = 'default' }) => {
  const classes = `${baseClasses} ${variantClasses[variant]} ${className ?? ''}`;
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
      {leftIcon}
      <span>{label}</span>
    </a>
  );
};

export default SocialButton;

import React from 'react';

export type SocialButtonProps = {
  href: string;
  label: string;
  leftIcon?: React.ReactNode;
  className?: string;
  variant?: 'default' | 'discord' | 'x';
};

const baseClasses =
  'inline-flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-colors transition-shadow shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500';

const variantClasses = {
  default: 'bg-gray-900 text-white hover:bg-gray-800',
  discord: 'bg-indigo-600 text-white hover:bg-indigo-500',
  x: 'bg-black text-white hover:bg-neutral-800',
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

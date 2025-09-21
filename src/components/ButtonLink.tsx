import Link from 'next/link';
import React from 'react';

type ButtonLinkProps = {
  href: string;
  children: React.ReactNode;
  leftIcon?: React.ReactNode;
  className?: string;
  external?: boolean;
};

const baseClasses =
  'inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500';

const defaultClasses = 'bg-gray-900 text-white hover:bg-gray-800';

export const GitHubIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className ?? 'w-5 h-5'}
    aria-hidden="true"
  >
    <path fillRule="evenodd" d="M12 .5a11.5 11.5 0 0 0-3.636 22.41c.575.105.786-.25.786-.556 0-.274-.01-1.002-.016-1.967-3.2.696-3.877-1.543-3.877-1.543-.523-1.328-1.277-1.682-1.277-1.682-1.043-.713.08-.699.08-.699 1.152.081 1.759 1.183 1.759 1.183 1.025 1.758 2.689 1.25 3.344.956.104-.742.402-1.25.73-1.538-2.555-.29-5.243-1.277-5.243-5.683 0-1.255.45-2.281 1.184-3.086-.119-.29-.513-1.46.112-3.046 0 0 .966-.309 3.168 1.178a10.98 10.98 0 0 1 5.768 0c2.2-1.487 3.165-1.178 3.165-1.178.627 1.586.233 2.756.114 3.046.737.805 1.183 1.831 1.183 3.086 0 4.416-2.693 5.389-5.257 5.674.413.356.78 1.055.78 2.127 0 1.535-.014 2.77-.014 3.148 0 .309.207.668.793.555A11.5 11.5 0 0 0 12 .5Z" clipRule="evenodd" />
  </svg>
);

export const ItchIcon: React.FC<{ className?: string }> = ({ className }) => (
  // Simplified itch.io heart/rounded shape icon
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className ?? 'w-5 h-5'}
    aria-hidden="true"
  >
    <path d="M3 6.5C3 5.12 4.12 4 5.5 4h13c1.38 0 2.5 1.12 2.5 2.5v8.75A2.75 2.75 0 0 1 18.25 18H5.75A2.75 2.75 0 0 1 3 15.25V6.5Zm4.02-.75a2.75 2.75 0 0 0-2.75 2.75v4.5c0 1.518 1.232 2.75 2.75 2.75h9.96A2.75 2.75 0 0 0 19.73 13V8.5a2.75 2.75 0 0 0-2.75-2.75H7.02Zm5.48 2.25c1.494 0 2.75 1.256 2.75 2.75S14 13.5 12.5 13.5 9.75 12.244 9.75 10.75 11.006 8 12.5 8Z" />
  </svg>
);

const ButtonLink: React.FC<ButtonLinkProps> = ({ href, children, leftIcon, className, external = true }) => {
  const classes = `${baseClasses} ${defaultClasses} ${className ?? ''}`;
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {leftIcon}
        <span>{children}</span>
      </a>
    );
  }
  return (
    <Link href={href} className={classes}>
      {leftIcon}
      <span>{children}</span>
    </Link>
  );
};

export default ButtonLink;

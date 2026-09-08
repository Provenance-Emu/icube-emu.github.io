import React from 'react';
import { GitHubIcon } from '@/components/ButtonLink';
import StoreBadge, { AltStoreGlyph, SideStoreGlyph } from '@/components/StoreBadge';

const ALTSTORE_URL = 'altstore://source?url=' + encodeURIComponent('https://icube-emu.com/api/altstore');
const SIDESTORE_URL = 'sidestore://source?url=' + encodeURIComponent('https://icube-emu.com/api/sidestore');

export type DownloadSectionProps = {
  title?: string;
  description?: React.ReactNode;
  className?: string;
};

const DefaultDescription = () => (
  <p className="text-gray-600 dark:text-gray-300 mb-6">
    iCube isn’t on the App Store. You can sideload it from the sources below. We recommend using
    <a
      href="https://sidestore.io"
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-600 dark:text-blue-400 hover:underline ml-1"
    >
      SideStore
    </a>
    {' '}to install on iOS/iPadOS, using
    <a
      href="https://sideloadly.io"
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-600 dark:text-blue-400 hover:underline ml-1"
    >
      Sideloadly
    </a>
    {' '}to install on tvOS, and using
    <a
      href="https://github.com/StephenDev0/StikDebug"
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-600 dark:text-blue-400 hover:underline ml-1"
    >
      StikDebug
    </a>
    {' '}to enable JIT on iOS/iPadOS.
  </p>
);

const DownloadSection: React.FC<DownloadSectionProps> = ({
  title = 'Download',
  description,
  className,
}) => {
  return (
    <section className={`container mx-auto px-4 ${className ?? ''}`}>
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{title}</h2>
        {description ?? <DefaultDescription />}
        <div className="flex flex-wrap gap-3 justify-center items-center mb-4">
          <StoreBadge
            href={ALTSTORE_URL}
            eyebrow="Add to"
            label="AltStore"
            icon={<AltStoreGlyph className="w-6 h-6" />}
            external={false}
          />
          <StoreBadge
            href={SIDESTORE_URL}
            eyebrow="Add to"
            label="SideStore"
            icon={<SideStoreGlyph className="w-6 h-6" />}
            external={false}
          />
          <StoreBadge
            href="https://github.com/Provenance-Emu/iCube/releases/latest"
            eyebrow="Download from"
            label="GitHub"
            icon={<GitHubIcon className="w-6 h-6" />}
          />
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-500 mb-6">
          Sideloaded and self-built copies include every Plus feature at no cost. Plus purchases apply to the App Store build.
        </p>
        <div className="flex justify-center mb-6">
          <a
            href="https://github.com/Provenance-Emu/iCube/releases/tag/alpha"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
          >
            <GitHubIcon className="w-4 h-4" />
            Alpha (CI) build
          </a>
        </div>
      </div>
    </section>
  );
};

export default DownloadSection;

import React from 'react';
import ButtonLink, { GitHubIcon, ItchIcon } from '@/components/ButtonLink';
import ItchIoEmbed from '@/components/ItchIoEmbed';

export type DownloadSectionProps = {
  title?: string;
  description?: React.ReactNode;
  showEmbed?: boolean;
  className?: string;
};

const DefaultDescription = () => (
  <p className="text-gray-600 dark:text-gray-300 mb-6">
    iCube isn’t on the App Store. You can sideload it from the sources below. We recommend
    <a
      href="https://sideloadly.io"
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-600 dark:text-blue-400 hover:underline ml-1"
    >
      Sideloadly
    </a>
    for installing on iOS/tvOS, and for Apple TV JIT we recommend
    <a
      href="https://apps.apple.com/us/app/stikdebug/id6744045754"
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-600 dark:text-blue-400 hover:underline ml-1"
    >
      StikDebug
    </a>
    .
  </p>
);

const DownloadSection: React.FC<DownloadSectionProps> = ({
  title = 'Download',
  description,
  showEmbed = false,
  className,
}) => {
  return (
    <section className={`container mx-auto px-4 ${className ?? ''}`}>
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{title}</h2>
        {description ?? <DefaultDescription />}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
          <ButtonLink href="https://github.com/Provenance-Emu/iCube/releases" leftIcon={<GitHubIcon className="w-5 h-5" />}>Sideload via GitHub</ButtonLink>
          <ButtonLink href="https://provenance.itch.io/icube" leftIcon={<ItchIcon className="w-5 h-5" />}>Sideload via itch.io</ButtonLink>
        </div>
        {showEmbed && (
          <div className="flex justify-center">
            <ItchIoEmbed itchId="3854531" linkColor="#5b96fa" title="iCube for iOS and tvOS by Provenance EMU" />
          </div>
        )}
      </div>
    </section>
  );
};

export default DownloadSection;

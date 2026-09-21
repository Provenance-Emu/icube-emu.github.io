/**
 * News items carried by /api/altstore and /api/sidestore.
 *
 * AltStore and SideStore render these in the store itself, which makes this the
 * one channel that reaches the people an install bug actually affected — they are
 * standing in the store looking at the failure. `notify: true` also pushes a
 * notification, so reserve it for things worth interrupting someone over.
 *
 * Shared between the two routes because they had drifted into being copies of one
 * another, and news that appears in one store but not the other is worse than none.
 * Provenance's combined feed builds its own news from Provenance releases and does
 * not carry these, so this only reaches people on iCube's own source.
 */
export interface FeedNewsItem {
  title: string;
  identifier: string;
  caption: string;
  date: string;
  tintColor: string;
  imageURL: string;
  notify: boolean;
  url?: string;
  appID?: string;
}

export const ICUBE_BUNDLE_IDENTIFIER = 'com.joemattiello.iCube';

export function feedNews(baseURL: string): FeedNewsItem[] {
  return [
    {
      title: 'Alpha installs are fixed',
      identifier: 'alpha-version-mismatch-2026-09',
      caption:
        'If installing the alpha failed with a build-number mismatch, that was a bug in this source, not your device. Refresh the source and try again.',
      date: '2026-09-21',
      tintColor: '#3B82F6',
      imageURL: `${baseURL}/icon-1024.png`,
      notify: true,
      url: 'https://icube-emu.com/sources/',
      appID: ICUBE_BUNDLE_IDENTIFIER,
    },
    {
      title: 'Welcome to iCube',
      identifier: 'welcome-to-icube',
      caption: 'GameCube & Wii emulation on iOS and tvOS',
      date: '2025-09-22',
      tintColor: '#3B82F6',
      imageURL: `${baseURL}/icon-1024.png`,
      notify: false,
      url: 'https://icube-emu.com',
    },
  ];
}

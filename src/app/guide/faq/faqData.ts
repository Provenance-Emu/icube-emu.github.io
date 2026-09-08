export type FaqItem = { q: string; a: string };

export const faqItems: FaqItem[] = [
  {
    q: 'How do I install games on iCube?',
    a: "You'll need to provide your own GameCube (ISO) and Wii (WBFS/ISO) game files. These can be imported through the built-in Wi-Fi web server, iTunes file sharing, cloud storage, or other file management apps. Make sure you own the original games before using ROM files.",
  },
  {
    q: 'How do I install iCube (sideloaded)?',
    a: 'iCube is distributed via sideloading for iOS/iPadOS and tvOS. We recommend using SideStore to install the app on your iOS/iPadOS device. To install on your tvOS device, use Sideloadly. To enable JIT on iOS/iPadOS, we recommend using StikDebug.',
  },
  {
    q: 'Which controllers are supported?',
    a: 'iCube supports MFi (Made for iPhone) controllers, PlayStation DualShock 4, PlayStation DualSense, Xbox Wireless Controllers, and the Siri Remote on Apple TV. Touch controls are also available on iPhone and iPad. See the Controllers page for details.',
  },
  {
    q: 'What devices are compatible?',
    a: "iCube requires iOS/iPadOS 16.0 or later for iPhone and iPad, and tvOS 17.0 or later for Apple TV. For optimal JIT-less performance, we recommend newer devices like iPhone 16 or later, iPad (7th generation) or later, and Apple TV 4K (4th generation).",
  },
  {
    q: 'Can I save my game progress?',
    a: 'Yes! iCube supports both in-game saves (like the original consoles) and save states, which allow you to save and load your progress at any point during gameplay. All saves are stored locally on your device.',
  },
  {
    q: 'Why are some games not working properly?',
    a: "While iCube has high compatibility, some games may have issues due to their complexity or specific hardware requirements. We're constantly working to improve compatibility through regular updates.",
  },
  {
    q: 'How can I improve performance?',
    a: "For better performance, try reducing the internal resolution, disabling enhanced features like anti-aliasing, closing other apps, and ensuring your device isn't overheating. Performance varies based on the game and your device's capabilities.",
  },
  {
    q: 'Do I need the GameCube BIOS (IPL)?',
    a: 'Only for the GameCube Main Menu itself, or when the "Load GameCube Main Menu" setting is on. Most games run without it. See the GameCube BIOS (IPL) guide for how to dump and install your own.',
  },
  {
    q: 'How do I import games over Wi-Fi?',
    a: 'iCube has a built-in web server with a Web UI and a WebDAV address. See the Importing Games guide for step-by-step instructions.',
  },
];

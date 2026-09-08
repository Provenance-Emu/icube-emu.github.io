// Source of truth: provenance-emu.github.io/data/family.yml. Keep in sync by hand.

export type FamilySite = {
  key: string;
  name: string;
  url: string;
  tagline: string;
};

export const family: FamilySite[] = [
  { key: 'provenance', name: 'Provenance', url: 'https://provenance-emu.com/', tagline: 'Multi-system retro emulator for iOS, tvOS and macOS' },
  { key: 'icube', name: 'iCube', url: 'https://icube-emu.com/', tagline: 'GameCube & Wii emulator for iOS and tvOS' },
  { key: 'ifly', name: 'iFly', url: 'https://ifly-emu.com/', tagline: 'Dreamcast emulator for iOS and tvOS' },
  { key: 'jaguar', name: 'Virtual Jaguar libretro', url: 'https://jaguar.provenance-emu.com/', tagline: 'Atari Jaguar core for RetroArch and Provenance' },
  { key: 'wiki', name: 'Provenance Wiki', url: 'https://wiki.provenance-emu.com/', tagline: 'Guides, ROM ripping, BIOS help' },
  { key: 'github', name: 'GitHub', url: 'https://github.com/Provenance-Emu', tagline: 'Source code for every app' },
  { key: 'discord', name: 'Discord', url: 'https://discord.gg/4TK7PU5', tagline: 'Community chat' },
];

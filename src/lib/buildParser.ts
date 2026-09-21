import fs from 'fs';
import path from 'path';
import { readIpaInfo } from '@/lib/ipaInfo';
import { screenshots } from '@/data/screenshots';

export interface BuildVersion {
  version: string;
  buildVersion: string;
  date: string;
  localizedDescription: string;
  downloadURL: string;
  size: number;
  minOSVersion: string;
  platform: 'iOS' | 'tvOS';
  isBeta: boolean;
  betaNumber?: number;
}

export interface AppMetadata {
  name: string;
  bundleIdentifier: string;
  developerName: string;
  subtitle: string;
  localizedDescription: string;
  iconURL: string;
  tintColor: string;
  category: string;
  screenshots?: string[];
  versions: BuildVersion[];
}

/**
 * Parse the builds directory and extract all available versions
 */
export function parseBuilds(buildsDir: string, baseURL: string): BuildVersion[] {
  const versions: BuildVersion[] = [];

  // Use pre-generated versioned builds directory
  const versionedBuildsDir = buildsDir.replace('/builds', '/builds-versioned');
  const sourceDir = fs.existsSync(versionedBuildsDir) ? versionedBuildsDir : buildsDir;

  if (!fs.existsSync(sourceDir)) {
    return versions;
  }

  // Read all version directories (e.g., 1.0.0, 1.0.1, etc.)
  const versionDirs = fs.readdirSync(sourceDir).filter(file => {
    const fullPath = path.join(sourceDir, file);
    return fs.statSync(fullPath).isDirectory() && /^\d+\.\d+\.\d+$/.test(file);
  });

  for (const versionDir of versionDirs) {
    const versionPath = path.join(sourceDir, versionDir);

    // Read platform/beta directories (e.g., iOS-Beta7, tvOS, iOS, etc.)
    const platformDirs = fs.readdirSync(versionPath).filter(file => {
      const fullPath = path.join(versionPath, file);
      return fs.statSync(fullPath).isDirectory();
    });

    for (const platformDir of platformDirs) {
      const platformPath = path.join(versionPath, platformDir);

      // Parse platform and beta info from directory name
      const platformMatch = platformDir.match(/^(iOS|tvOS)(?:-Beta(\d+))?$/i);
      if (!platformMatch) continue;

      const platform = platformMatch[1] as 'iOS' | 'tvOS';
      const isBeta = !!platformMatch[2];
      const betaNumber = platformMatch[2] ? parseInt(platformMatch[2]) : undefined;

      // Look for IPA file
      const files = fs.readdirSync(platformPath);
      const ipaFile = files.find(f => f.endsWith('.ipa'));
      if (!ipaFile) continue;

      const ipaPath = path.join(platformPath, ipaFile);
      const ipaStats = fs.statSync(ipaPath);

      // The IPA is the source of truth for its own version strings. SideStore
      // verifies the downloaded bundle against the feed and refuses to install on
      // a mismatch, so anything derived from directory names or
      // DistributionSummary.plist (which the alpha ingest never produces) is a
      // guess that eventually diverges from the artifact. Read the plist instead.
      const ipaInfo = readIpaInfo(ipaPath);
      if (!ipaInfo) {
        console.warn(
          `[buildParser] skipping ${versionDir}/${platformDir}: could not read the IPA's Info.plist`
        );
        continue;
      }

      // Get file modification time as release date
      const releaseDate = ipaStats.mtime.toISOString().split('T')[0];

      // Construct download URL using pre-generated versioned IPA
      const downloadURL = `${baseURL}/builds-versioned/${versionDir}/${platformDir}/${ipaFile}`;

      // Create version description
      let description = `iCube ${ipaInfo.version}`;
      if (isBeta) {
        description += ` Beta ${betaNumber}`;
      }
      description += ` for ${platform}`;

      versions.push({
        version: ipaInfo.version,
        buildVersion: ipaInfo.buildVersion,
        date: releaseDate,
        localizedDescription: description,
        downloadURL,
        size: ipaStats.size,
        // The bundle's real MinimumOSVersion, not a per-platform guess. AltStore
        // hides versions whose minimum the device cannot meet, so claiming 15.0
        // for a bundle that needs 17.0 offers iOS 15/16 users a build that will
        // not launch.
        minOSVersion: ipaInfo.minOSVersion ?? (platform === 'tvOS' ? '16.0' : '15.0'),
        platform,
        isBeta,
        betaNumber,
      });
    }
  }

  // Sort versions: latest first, stable before beta
  versions.sort((a, b) => {
    // First compare by version number
    const versionCompare = compareVersions(b.version, a.version);
    if (versionCompare !== 0) return versionCompare;

    // Then by beta status (stable before beta)
    if (a.isBeta !== b.isBeta) {
      return a.isBeta ? 1 : -1;
    }

    // Then by beta number (higher beta first)
    if (a.isBeta && b.isBeta && a.betaNumber !== b.betaNumber) {
      return (b.betaNumber || 0) - (a.betaNumber || 0);
    }

    // Finally by date (newer first)
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  return versions;
}

/**
 * Compare two semantic version strings
 */
function compareVersions(a: string, b: string): number {
  const aParts = a.split('.').map(Number);
  const bParts = b.split('.').map(Number);

  for (let i = 0; i < Math.max(aParts.length, bParts.length); i++) {
    const aPart = aParts[i] || 0;
    const bPart = bParts[i] || 0;
    if (aPart !== bPart) {
      return aPart - bPart;
    }
  }

  return 0;
}

/**
 * Generate AltStore/SideStore compatible app metadata
 */
/** Rolling CI IPA published on the iCube GitHub `alpha` prerelease. */
export const GITHUB_ALPHA_IPA_URL =
  'https://github.com/Provenance-Emu/iCube/releases/download/alpha/Non-Jailbroken.ipa';

/**
 * deploy.yml downloads the current alpha to public/builds/1.0.0/iOS/iCube.ipa
 * before the site builds, so the real artifact is on disk when the feed is
 * generated. We take the metadata from that copy but serve it from the GitHub
 * release URL: the IPA is ~90 MB and GitHub Pages caps a single file at 100 MB.
 */
const ALPHA_IPA_RELATIVE_PATH = path.join('1.0.0', 'iOS', 'iCube.ipa');

/**
 * Build the rolling-alpha entry from the artifact itself.
 *
 * This used to be a hardcoded literal with `version: 'alpha'`, `size: 1` and a
 * buildVersion synthesised from the release timestamp, none of which the IPA
 * carried — so SideStore downloaded 90 MB and then refused to install with
 * "Expected version: 2026.09.19.1023, Found version: 13". There is no correct
 * value to invent here, so when the artifact is absent (local dev, or a failed
 * fetch in CI) we return null and the feed simply has no alpha entry. A missing
 * entry costs a user one download from GitHub; a lying one costs them 90 MB and
 * a dead end.
 */
function alphaVersion(buildsDir: string): BuildVersion | null {
  const ipaPath = path.join(buildsDir, ALPHA_IPA_RELATIVE_PATH);
  if (!fs.existsSync(ipaPath)) {
    console.warn('[buildParser] no alpha IPA on disk — omitting the alpha entry');
    return null;
  }

  const info = readIpaInfo(ipaPath);
  if (!info) {
    console.warn('[buildParser] alpha IPA unreadable — omitting the alpha entry');
    return null;
  }

  const stats = fs.statSync(ipaPath);
  return {
    version: info.version,
    buildVersion: info.buildVersion,
    date: stats.mtime.toISOString(),
    localizedDescription:
      'Rolling CI alpha from GitHub Releases. Unsigned; replaced on every successful default-branch or develop build.',
    downloadURL: GITHUB_ALPHA_IPA_URL,
    size: stats.size,
    minOSVersion: info.minOSVersion ?? '17.0',
    platform: 'iOS',
    isBeta: true,
  };
}

export function generateAltStoreApp(
  baseURL: string,
  buildsDir: string
): AppMetadata {
  const hosted = parseBuilds(buildsDir, baseURL);
  const alpha = alphaVersion(buildsDir);
  // The alpha is by definition the newest build, so keep it first explicitly.
  // compareVersions() splits on '.' and Number()s the parts, which yields NaN
  // for any prerelease suffix ('1.0.0-beta9-ios'), so it cannot order these.
  const versions = alpha ? [alpha, ...hosted] : hosted;

  return {
    name: 'iCube',
    bundleIdentifier: 'com.joemattiello.iCube',
    developerName: 'Provenance Emu',
    subtitle: 'GameCube & Wii Emulator for iOS & tvOS',
    localizedDescription: `Experience classic Nintendo GameCube and Wii games on your iOS devices and Apple TV. Built on the proven Dolphin emulator foundation.

Features:
• Full GameCube and Wii emulation
• Controller support (MFi, PlayStation, Xbox)
• Save states and real-time saves
• High-resolution rendering
• Fast-forward and slow motion
• Customizable controls
• Game library management
• And much more!

iCube is a fork of DolphiniOS, optimized for iOS and tvOS devices.`,
    iconURL: `${baseURL}/icon-1024.png`,
    tintColor: '#3B82F6',
    category: 'games',
    screenshots: screenshots('iphone')
      .slice(0, 8)
      .map((item) => `${baseURL}${item.jpg}`),
    // Emitted verbatim. `version` and `buildVersion` were rewritten here to
    // "<dir>-beta<n>-<platform>" to keep entries unique, which broke the spec's
    // hard requirement that both equal the IPA's CFBundleShortVersionString and
    // CFBundleVersion. Uniqueness is now a property of the artifacts themselves:
    // generate-versioned-ipas.js stamps each hosted beta's Info.plist, and every
    // string below is read back out of the bundle being linked.
    versions,
  };
}

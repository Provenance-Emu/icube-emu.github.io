import fs from 'fs';
import path from 'path';
import plist from 'plist';

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

interface DistributionSummary {
  [key: string]: Array<{
    buildNumber: string;
    versionNumber?: string;
  }>;
}

/**
 * Parse the builds directory and extract all available versions
 */
export function parseBuilds(buildsDir: string, baseURL: string): BuildVersion[] {
  const versions: BuildVersion[] = [];

  if (!fs.existsSync(buildsDir)) {
    return versions;
  }

  // Read all version directories (e.g., 1.0.0, 1.0.1, etc.)
  const versionDirs = fs.readdirSync(buildsDir).filter(file => {
    const fullPath = path.join(buildsDir, file);
    return fs.statSync(fullPath).isDirectory() && /^\d+\.\d+\.\d+$/.test(file);
  });

  for (const versionDir of versionDirs) {
    const versionPath = path.join(buildsDir, versionDir);

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

      // Try to read DistributionSummary.plist for metadata
      const distSummaryPath = path.join(platformPath, 'DistributionSummary.plist');
      let buildNumber = '1';
      let versionNumber = versionDir;

      if (fs.existsSync(distSummaryPath)) {
        try {
          const distSummaryContent = fs.readFileSync(distSummaryPath, 'utf8');
          const distSummary = plist.parse(distSummaryContent) as DistributionSummary;

          // Get the first app entry (should be iCube.ipa)
          const appKey = Object.keys(distSummary).find(key => key.endsWith('.ipa'));
          if (appKey && distSummary[appKey] && distSummary[appKey][0]) {
            buildNumber = distSummary[appKey][0].buildNumber || buildNumber;
            versionNumber = distSummary[appKey][0].versionNumber || versionNumber;
          }
        } catch (error) {
          console.error(`Error parsing DistributionSummary.plist for ${platformDir}:`, error);
        }
      }

      // Get file modification time as release date
      const releaseDate = ipaStats.mtime.toISOString().split('T')[0];

      // Construct download URL
      const downloadURL = `${baseURL}/builds/${versionDir}/${platformDir}/${ipaFile}`;

      // Create version description
      let description = `iCube ${versionNumber}`;
      if (isBeta) {
        description += ` Beta ${betaNumber}`;
      }
      description += ` for ${platform}`;

      versions.push({
        version: versionNumber,
        buildVersion: buildNumber,
        date: releaseDate,
        localizedDescription: description,
        downloadURL,
        size: ipaStats.size,
        minOSVersion: platform === 'tvOS' ? '16.0' : '15.0',
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
export function generateAltStoreApp(
  baseURL: string,
  buildsDir: string
): AppMetadata {
  const versions = parseBuilds(buildsDir, baseURL);

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
    screenshots: [
      `${baseURL}/screenshots/iphone1-library.jpg`,
      `${baseURL}/screenshots/iphone2-search.jpg`,
      `${baseURL}/screenshots/iphone3-emu.png`,
      `${baseURL}/screenshots/iphone7-touchcontrols.jpg`,
      `${baseURL}/screenshots/iphone8-pause.jpg`,
    ],
    versions: versions.map(v => ({
      // Make beta versions unique by appending beta number to version string
      // This prevents duplicate version errors when multiple betas share the same bundle version
      version: v.isBeta && v.betaNumber ? `${v.version}-beta${v.betaNumber}` : v.version,
      buildVersion: v.buildVersion,
      date: v.date,
      localizedDescription: v.localizedDescription,
      downloadURL: v.downloadURL,
      size: v.size,
      minOSVersion: v.minOSVersion,
      platform: v.platform,
      isBeta: v.isBeta,
      betaNumber: v.betaNumber,
    })),
  };
}

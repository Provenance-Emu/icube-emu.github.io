import AdmZip from 'adm-zip';
import bplistParser from 'bplist-parser';
import plist from 'plist';

/**
 * The AltStore/SideStore source spec is strict: a version entry's `version` must
 * equal the linked IPA's CFBundleShortVersionString and its `buildVersion` must
 * equal CFBundleVersion, exactly. SideStore verifies this after downloading and
 * refuses to install on a mismatch:
 *
 *   The downloaded version of iCube SL does not match the build number
 *   specified by the source.  Expected: 2026.09.19.1023  Found: 13
 *
 * That is precisely what happened: the feed synthesised both strings (a
 * timestamp for the alpha's buildVersion, a directory-name-derived slug for the
 * hosted builds) instead of reading them off the artifact it was linking to.
 *
 * The only way that class of bug cannot recur is to make the artifact the source
 * of truth. This module reads the real values out of the IPA; every feed entry is
 * built from them, and an IPA we cannot read is dropped rather than guessed at.
 */
export interface IpaInfo {
  /** CFBundleShortVersionString — the feed's `version`. */
  version: string;
  /** CFBundleVersion — the feed's `buildVersion`. */
  buildVersion: string;
  /** MinimumOSVersion. AltStore hides versions the device cannot run. */
  minOSVersion?: string;
  /** CFBundleIdentifier, for sanity-checking against the feed's app entry. */
  bundleIdentifier?: string;
}

type InfoPlist = Record<string, unknown>;

function asString(value: unknown): string | undefined {
  return typeof value === 'string' && value.length > 0 ? value : undefined;
}

/**
 * Xcode writes Info.plist in binary format, but a rewritten or hand-made bundle
 * may be XML. Try binary first, fall back to XML, and treat "neither parsed" as
 * unreadable rather than assuming a shape.
 */
function parseInfoPlist(data: Buffer): InfoPlist | null {
  try {
    const parsed = bplistParser.parseBuffer(data);
    if (parsed?.[0] && typeof parsed[0] === 'object') return parsed[0] as InfoPlist;
  } catch {
    // not a binary plist — fall through to XML
  }
  try {
    const parsed = plist.parse(data.toString('utf8'));
    if (parsed && typeof parsed === 'object') return parsed as InfoPlist;
  } catch {
    // unreadable
  }
  return null;
}

/**
 * Read the version identifiers out of an .ipa on disk.
 *
 * Returns null on any failure — a missing file, a bundle with no Info.plist, a
 * plist we cannot parse, or a plist missing either version key. Callers must drop
 * the entry in that case: a feed entry whose strings do not match its IPA is worse
 * than no entry, because it downloads ~90 MB before failing.
 */
export function readIpaInfo(ipaPath: string): IpaInfo | null {
  try {
    const entries = new AdmZip(ipaPath).getEntries();
    const infoPlistEntry = entries.find((entry) =>
      /^Payload\/[^/]+\.app\/Info\.plist$/.test(entry.entryName)
    );
    if (!infoPlistEntry) {
      console.warn(`[ipaInfo] no Payload/*.app/Info.plist in ${ipaPath}`);
      return null;
    }

    const info = parseInfoPlist(infoPlistEntry.getData());
    if (!info) {
      console.warn(`[ipaInfo] could not parse Info.plist in ${ipaPath}`);
      return null;
    }

    const version = asString(info.CFBundleShortVersionString);
    const buildVersion = asString(info.CFBundleVersion);
    if (!version || !buildVersion) {
      console.warn(
        `[ipaInfo] ${ipaPath} is missing CFBundleShortVersionString or CFBundleVersion`
      );
      return null;
    }

    return {
      version,
      buildVersion,
      minOSVersion: asString(info.MinimumOSVersion),
      bundleIdentifier: asString(info.CFBundleIdentifier),
    };
  } catch (error) {
    console.warn(`[ipaInfo] failed to read ${ipaPath}:`, error);
    return null;
  }
}

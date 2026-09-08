import manifest from './screenshots.json';

export type Device = 'iphone' | 'ipad' | 'appletv' | 'watch' | 'mac';

export interface ScreenshotItem {
  id: string;
  device: Device;
  locale: string;
  slug: string;
  alt: string;
  caption?: string;
  theme?: 'light' | 'dark';
  order: number;
  width: number;
  height: number;
  webp: string;
  jpg: string;
  capturedAt: string;
  source?: string;
}

interface ScreenshotManifest {
  generatedAt: string;
  items: ScreenshotItem[];
}

const typedManifest = manifest as ScreenshotManifest;

export interface ScreenshotsOptions {
  locale?: string;
  limit?: number;
}

/**
 * Returns screenshot items for a device, sorted by `order`.
 */
export function screenshots(device: Device, opts: ScreenshotsOptions = {}): ScreenshotItem[] {
  const locale = opts.locale ?? 'en-US';
  const items = typedManifest.items
    .filter((item) => item.device === device && item.locale === locale)
    .sort((a, b) => a.order - b.order);
  return typeof opts.limit === 'number' ? items.slice(0, opts.limit) : items;
}

/**
 * Looks up a single screenshot item by its "<device>/<slug>" id.
 */
export function screenshotById(id: string): ScreenshotItem | undefined {
  return typedManifest.items.find((item) => item.id === id);
}

export function allScreenshots(): ScreenshotItem[] {
  return typedManifest.items;
}

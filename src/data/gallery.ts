import type { GalleryGroup, GalleryImage } from '@provenance-emu/web-media/gallery';
import native from './gallery-native.json';
import { screenshots, type Device } from './screenshots';

const nativeBySlot: Record<string, GalleryImage> = native;

const devices: [Device, string, GalleryGroup['layout']][] = [
  ['iphone', 'iPhone', 'phone'],
  ['ipad', 'iPad', 'tablet'],
  ['appletv', 'Apple TV', 'tv'],
];

export const galleryGroups: GalleryGroup[] = devices.map(([id, label, layout]) => ({
  id,
  label,
  layout,
  images: screenshots(id, { featured: true }).map(item => {
    const capture = nativeBySlot[`${item.device}/${item.slug}`];
    if (capture) return capture;

    return {
      id: item.id,
      src: item.webp,
      href: item.jpg,
      alt: item.alt,
      width: item.width,
      height: item.height,
      caption: item.caption,
      premium: item.premium,
      developmentPreview: item.developmentPreview,
    };
  }),
})).filter(group => group.images.length > 0);

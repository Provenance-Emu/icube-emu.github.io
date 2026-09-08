#!/usr/bin/env node
/**
 * Import raw screenshot captures into the site's screenshot manifest.
 *
 * Usage:
 *   node scripts/import-screenshots.mjs <input-dir> [--replace] [--device iphone] [--locale en-US]
 *
 * Input contract: a directory of PNG/JPG files, either flat or nested by locale
 * and/or device:
 *   <dir>/<name>.png
 *   <dir>/<device>/<name>.png
 *   <dir>/<locale>/<device>/<name>.png
 *
 * Device is taken from the directory name if it is one of
 * iphone|ipad|appletv|tvos|watch|mac; otherwise from a filename prefix
 * (iphone-, ipad-, tvos-, appletv-, watch-, mac-); otherwise inferred from
 * pixel size (portrait ~9:19.5 -> iphone; ~4:3 -> ipad; 16:9 at >=1920 wide ->
 * appletv; small square-ish <=500px -> watch). "tvos" is normalised to
 * "appletv". Locale defaults to "en-US" unless given by --locale or a locale
 * path segment.
 *
 * Optional sidecar `<dir>/captions.json`:
 *   { "<basename-without-ext>": { "alt": "...", "caption": "...",
 *     "theme": "light|dark", "order": N } }
 * Missing alt is derived by humanising the filename. Order defaults to
 * filename sort order.
 *
 * Output:
 *   - public/screenshots/<device>/<slug>.webp (quality 82) and
 *     public/screenshots/<device>/<slug>.jpg (quality 85, used by the
 *     AltStore/SideStore feed which wants plain URLs), resized so the long
 *     edge is at most 1600px (1920px for appletv).
 *   - src/data/screenshots.json is written/merged with the resulting items.
 *     Without --replace, items sharing an id are updated in place and other
 *     existing items are kept. With --replace, all existing items for the
 *     devices present in this input are dropped first, then replaced.
 *
 * See README.md ("Screenshots" section) for more detail.
 */

import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import sharp from 'sharp';

const REPO_ROOT = path.resolve(new URL('.', import.meta.url).pathname, '..');
const PUBLIC_SCREENSHOTS_DIR = path.join(REPO_ROOT, 'public', 'screenshots');
const MANIFEST_PATH = path.join(REPO_ROOT, 'src', 'data', 'screenshots.json');

const KNOWN_DEVICES = new Set(['iphone', 'ipad', 'appletv', 'tvos', 'watch', 'mac']);
const DEVICE_PREFIXES = ['iphone', 'ipad', 'tvos', 'appletv', 'watch', 'mac'];
const IMAGE_EXTS = new Set(['.png', '.jpg', '.jpeg']);

function normaliseDevice(device) {
  return device === 'tvos' ? 'appletv' : device;
}

function parseArgs(argv) {
  const args = { input: null, replace: false, device: null, locale: null };
  const rest = [];
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--replace') {
      args.replace = true;
    } else if (a === '--device') {
      args.device = argv[++i];
    } else if (a === '--locale') {
      args.locale = argv[++i];
    } else {
      rest.push(a);
    }
  }
  args.input = rest[0] ?? null;
  return args;
}

function walk(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith('.')) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      out.push(...walk(full));
    } else if (entry.isFile()) {
      out.push(full);
    }
  }
  return out;
}

function kebabCase(str) {
  return str
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/[_\s]+/g, '-')
    .replace(/[^a-zA-Z0-9-]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .toLowerCase();
}

function humanise(basename) {
  const words = basename
    .replace(/^(iphone|ipad|tvos|appletv|watch|mac)[-_]?/i, '')
    .replace(/[-_]+/g, ' ')
    .trim();
  if (!words) return basename;
  const capitalised = words.charAt(0).toUpperCase() + words.slice(1);
  return capitalised;
}

async function inferDeviceFromPixels(filePath) {
  const meta = await sharp(filePath).metadata();
  const w = meta.width ?? 0;
  const h = meta.height ?? 0;
  if (w === 0 || h === 0) return null;
  const long = Math.max(w, h);
  const short = Math.min(w, h);
  const ratio = long / short;

  if (long <= 500) return 'watch';
  // Portrait ~9:19.5 (~2.16)
  if (h > w && ratio >= 1.9) return 'iphone';
  // 16:9 (~1.78) and wide -> appletv
  if (w >= 1920 && Math.abs(ratio - 16 / 9) < 0.15) return 'appletv';
  // ~4:3 (~1.33)
  if (Math.abs(ratio - 4 / 3) < 0.15) return 'ipad';
  return null;
}

function detectDeviceFromPath(relParts) {
  for (const part of relParts) {
    const lower = part.toLowerCase();
    if (KNOWN_DEVICES.has(lower)) return normaliseDevice(lower);
  }
  return null;
}

function detectDeviceFromFilename(basename) {
  const lower = basename.toLowerCase();
  for (const prefix of DEVICE_PREFIXES) {
    if (lower.startsWith(`${prefix}-`) || lower.startsWith(`${prefix}_`)) {
      return normaliseDevice(prefix);
    }
  }
  return null;
}

function detectLocaleFromPath(relParts) {
  // A locale segment looks like en-US, fr-FR, ja, etc. and is not a known device.
  for (const part of relParts) {
    if (KNOWN_DEVICES.has(part.toLowerCase())) continue;
    if (/^[a-z]{2}(-[A-Z]{2})?$/.test(part)) return part;
  }
  return null;
}

function stripDevicePrefix(basename, device) {
  const lower = basename.toLowerCase();
  const candidates = device === 'appletv' ? ['appletv', 'tvos'] : [device];
  for (const c of candidates) {
    if (lower.startsWith(`${c}-`)) return basename.slice(c.length + 1);
    if (lower.startsWith(`${c}_`)) return basename.slice(c.length + 1);
  }
  return basename;
}

function resizeTarget(device) {
  return device === 'appletv' ? 1920 : 1600;
}

async function loadCaptions(inputDir) {
  const captionsPath = path.join(inputDir, 'captions.json');
  if (!fs.existsSync(captionsPath)) return {};
  try {
    return JSON.parse(fs.readFileSync(captionsPath, 'utf8'));
  } catch (err) {
    console.error(`Failed to parse ${captionsPath}: ${err.message}`);
    process.exit(1);
  }
}

function relativeToHome(p) {
  const home = os.homedir();
  if (p.startsWith(home)) return `~${p.slice(home.length)}`;
  if (p.startsWith(REPO_ROOT)) return path.relative(REPO_ROOT, p);
  return p;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (!args.input) {
    console.error('Usage: node scripts/import-screenshots.mjs <input-dir> [--replace] [--device iphone] [--locale en-US]');
    process.exit(1);
  }

  const inputDir = path.resolve(args.input);
  if (!fs.existsSync(inputDir) || !fs.statSync(inputDir).isDirectory()) {
    console.error(`Input directory not found: ${inputDir}`);
    process.exit(1);
  }

  const captions = await loadCaptions(inputDir);
  const files = walk(inputDir).filter((f) => {
    const ext = path.extname(f).toLowerCase();
    return IMAGE_EXTS.has(ext) && path.basename(f) !== 'captions.json';
  });

  if (files.length === 0) {
    console.error(`No PNG/JPG files found under ${inputDir}`);
    process.exit(1);
  }

  const processed = [];
  let hadError = false;

  for (const filePath of files) {
    const relPath = path.relative(inputDir, filePath);
    const relParts = relPath.split(path.sep).slice(0, -1);
    const basenameNoExt = path.basename(filePath, path.extname(filePath));

    let device = args.device
      ? normaliseDevice(args.device)
      : detectDeviceFromPath(relParts) || detectDeviceFromFilename(basenameNoExt);

    let meta;
    try {
      meta = await sharp(filePath).metadata();
    } catch (err) {
      console.error(`Unreadable image: ${relPath} (${err.message})`);
      hadError = true;
      continue;
    }

    if (!device) {
      device = await inferDeviceFromPixels(filePath);
    }

    if (!device) {
      console.error(`Could not determine device for: ${relPath}`);
      hadError = true;
      continue;
    }

    const locale = args.locale || detectLocaleFromPath(relParts) || 'en-US';
    const slugSource = stripDevicePrefix(basenameNoExt, device);
    const slug = kebabCase(slugSource);
    const id = `${device}/${slug}`;

    const cap = captions[basenameNoExt] || {};
    const alt = cap.alt || humanise(basenameNoExt);
    const caption = cap.caption || alt;
    const theme = cap.theme;
    const order = typeof cap.order === 'number' ? cap.order : null;

    const outDir = path.join(PUBLIC_SCREENSHOTS_DIR, device);
    fs.mkdirSync(outDir, { recursive: true });

    const target = resizeTarget(device);
    const isPortrait = (meta.height ?? 0) > (meta.width ?? 0);
    const resizeOpts = isPortrait
      ? { height: target, withoutEnlargement: true }
      : { width: target, withoutEnlargement: true };

    const webpPath = path.join(outDir, `${slug}.webp`);
    const jpgPath = path.join(outDir, `${slug}.jpg`);

    let outMeta;
    try {
      const pipeline = () => sharp(filePath).resize(resizeOpts);
      outMeta = await pipeline().webp({ quality: 82 }).toFile(webpPath);
      await pipeline().flatten({ background: '#ffffff' }).jpeg({ quality: 85 }).toFile(jpgPath);
    } catch (err) {
      console.error(`Failed to process ${relPath}: ${err.message}`);
      hadError = true;
      continue;
    }

    const stat = fs.statSync(filePath);

    processed.push({
      id,
      device,
      locale,
      slug,
      alt,
      caption,
      ...(theme ? { theme } : {}),
      order: order ?? 9999,
      width: outMeta.width,
      height: outMeta.height,
      webp: `/screenshots/${device}/${slug}.webp`,
      jpg: `/screenshots/${device}/${slug}.jpg`,
      capturedAt: stat.mtime.toISOString(),
      source: relativeToHome(filePath),
      _hasExplicitOrder: order !== null,
    });
  }

  if (hadError) {
    console.error('One or more images failed to process; aborting before writing the manifest.');
    process.exit(1);
  }

  // Assign fallback order (filename sort) per device for items without an explicit order.
  const byDevice = new Map();
  for (const item of processed) {
    if (!byDevice.has(item.device)) byDevice.set(item.device, []);
    byDevice.get(item.device).push(item);
  }
  for (const items of byDevice.values()) {
    const withoutOrder = items.filter((i) => !i._hasExplicitOrder);
    withoutOrder.sort((a, b) => a.slug.localeCompare(b.slug));
    withoutOrder.forEach((item, idx) => {
      item.order = 9000 + idx;
    });
  }
  for (const item of processed) delete item._hasExplicitOrder;

  // Load existing manifest.
  let manifest = { generatedAt: new Date().toISOString(), items: [] };
  if (fs.existsSync(MANIFEST_PATH)) {
    try {
      manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf8'));
    } catch {
      // Start fresh if unreadable/corrupt.
      manifest = { generatedAt: new Date().toISOString(), items: [] };
    }
  }

  const inputDevices = new Set(processed.map((i) => i.device));
  let existingItems = manifest.items || [];
  if (args.replace) {
    existingItems = existingItems.filter((i) => !inputDevices.has(i.device));
  }

  const byId = new Map(existingItems.map((i) => [i.id, i]));
  for (const item of processed) byId.set(item.id, item);

  const finalItems = Array.from(byId.values()).sort((a, b) => {
    if (a.device !== b.device) return a.device.localeCompare(b.device);
    return a.order - b.order;
  });

  const outManifest = { generatedAt: new Date().toISOString(), items: finalItems };
  fs.mkdirSync(path.dirname(MANIFEST_PATH), { recursive: true });
  fs.writeFileSync(MANIFEST_PATH, `${JSON.stringify(outManifest, null, 2)}\n`);

  // Print summary table.
  console.log('');
  console.log('Imported screenshots:');
  const rows = processed.slice().sort((a, b) => a.id.localeCompare(b.id));
  const idWidth = Math.max(2, ...rows.map((r) => r.id.length));
  for (const r of rows) {
    console.log(
      `  ${r.id.padEnd(idWidth)}  order=${String(r.order).padEnd(4)} ${r.width}x${r.height}  ${r.webp}`
    );
  }
  console.log('');
  console.log(`${processed.length} image(s) processed. Manifest: ${path.relative(REPO_ROOT, MANIFEST_PATH)}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

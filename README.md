# iCube - GameCube & Wii Emulator

Welcome to the official website for iCube, a GameCube and Wii emulator for iOS and tvOS platforms, based on Dolphin and DolphinIOS.

## About iCube

iCube brings the classic gaming experience of Nintendo GameCube and Wii to your iOS devices and Apple TV. Built on the proven Dolphin emulator foundation, iCube delivers authentic gaming performance with modern iOS integration.

## Website

This Next.js website serves as the official landing page for iCube, featuring:

- App information and features
- Screenshot galleries for iPhone, iPad, and Apple TV
- Support documentation and FAQ
- Links to related resources and the Dolphin project

## Development

To run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the website.

## Screenshots

Screenshots are managed through a generated manifest (`src/data/screenshots.json`) instead of
hard-coded imports. To add or update screenshots:

1. Drop raw PNG/JPG captures into a folder, flat or nested by locale/device:
   `<dir>/<name>.png`, `<dir>/<device>/<name>.png`, or `<dir>/<locale>/<device>/<name>.png`
   (device is one of `iphone`, `ipad`, `appletv`, `watch`, `mac`; `tvos` is normalised to
   `appletv`). Device/locale can also be inferred from a filename prefix (`iphone-`, `ipad-`, …)
   or pixel dimensions if the folder isn't organised by device.
2. Optionally add a `captions.json` sidecar in that folder:
   `{ "<basename-without-ext>": { "alt": "...", "caption": "...", "theme": "light|dark", "order": N } }`.
   Missing alt text is derived from the filename.
3. Run the import script:

   ```bash
   node scripts/import-screenshots.mjs <input-dir> [--replace] [--device iphone] [--locale en-US]
   ```

   This writes optimised `.webp` (site) and `.jpg` (AltStore/SideStore feed) copies to
   `public/screenshots/<device>/<slug>.{webp,jpg}` and updates `src/data/screenshots.json`.
   Without `--replace`, existing manifest items are merged; with `--replace`, all items for the
   devices present in the input are replaced.
4. Pages read screenshots via the typed helpers in `src/data/screenshots.ts`
   (`screenshots(device, opts)`, `screenshotById(id)`) — never import image files directly.

## Deployment

This website is automatically deployed to GitHub Pages at https://icube-emu.com

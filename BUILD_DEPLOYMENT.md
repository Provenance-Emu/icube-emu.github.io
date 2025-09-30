# Build and Deployment Guide

## Building for Production

When you run `npm run build`, the following happens:

1. **Next.js builds the static site** - Creates optimized HTML, CSS, and JS in the `out/` directory
2. **Copies builds directory** - The `scripts/copy-builds.js` script automatically copies the `builds/` directory to `out/builds/`

This ensures that all IPA files are accessible for AltStore/SideStore downloads.

## Build Command

```bash
npm run build
```

This will:
- Build the Next.js site with Turbopack
- Copy the `builds/` directory to `out/builds/`
- Display the total size of copied files

## Deployment

### GitHub Pages / Static Hosting

After building, deploy the `out/` directory:

```bash
# The out/ directory contains everything needed:
out/
├── builds/           # IPA files (copied from builds/)
├── api/              # Static JSON feeds
├── downloads/        # Downloads page
└── ...               # Other static pages
```

### Important Notes

1. **Large Files**: IPA files can be large (80+ MB each). Make sure your hosting supports large files.

2. **Git LFS**: If committing builds to Git, consider using Git LFS:
   ```bash
   git lfs track "*.ipa"
   git add .gitattributes
   ```

3. **CDN Alternative**: For better performance, you can host IPA files on a CDN and update the `NEXT_PUBLIC_BASE_URL` accordingly.

## Environment Variables

Set these in your deployment environment:

```bash
NEXT_PUBLIC_BASE_URL=https://icube-emu.com
```

## Verifying the Build

After building, verify the builds are copied:

```bash
ls -lh out/builds/
```

You should see your version directories with IPA files.

## Testing Locally

To test the static build locally:

```bash
npm run build
npx serve out
```

Then test the feed:
- http://localhost:3000/api/altstore
- http://localhost:3000/downloads

## Troubleshooting

### "File does not exist" in AltStore/SideStore

This means the IPA files aren't accessible. Check:

1. The `out/builds/` directory exists and contains IPA files
2. Your hosting serves the files correctly (check MIME types)
3. The download URLs in the feed match your actual file locations

### Build Script Fails

If `scripts/copy-builds.js` fails:

1. Ensure the `builds/` directory exists
2. Check file permissions
3. Verify Node.js can access the directories

### Large Build Size

If the build is too large:

1. Consider hosting IPA files separately (GitHub Releases, CDN)
2. Update download URLs in the feed to point to external hosting
3. Remove the copy-builds script and manage files manually

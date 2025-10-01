# iCube AltStore/SideStore Feed Implementation

## Overview

This implementation adds AltStore/SideStore source feed support to the iCube Next.js website, allowing users to easily install and update iCube through AltStore or SideStore.

## What Was Implemented

### 1. Build Parser (`src/lib/buildParser.ts`)
- Scans the `builds/` directory for IPA files
- Parses version numbers from directory structure (e.g., `1.0.0/iOS-Beta7/`)
- Extracts metadata from `DistributionSummary.plist` files
- Supports both stable and beta builds for iOS and tvOS
- Sorts versions intelligently (latest first, stable before beta)

### 2. API Endpoints
- **`/api/altstore`** - AltStore-compatible JSON feed
- **`/api/sidestore`** - SideStore-compatible JSON feed (same format)
- Both endpoints return the same feed format with app metadata and version information

### 3. Downloads Page (`/downloads`)
- User-friendly interface to browse available builds
- Separate sections for iOS and tvOS builds
- Direct download links for IPA files
- Quick add buttons for AltStore/SideStore
- Installation instructions

### 4. Navigation Update
- Added "Downloads" link to the main navigation menu

## Build Directory Structure

```
builds/
└── x.y.z/                    # Semantic version (e.g., 1.0.0)
    ├── iOS/                  # Stable iOS release
    │   ├── iCube.ipa
    │   ├── DistributionSummary.plist
    │   └── ExportOptions.plist
    ├── iOS-BetaN/            # Beta iOS release (e.g., iOS-Beta7)
    │   ├── iCube.ipa
    │   ├── DistributionSummary.plist
    │   └── ExportOptions.plist
    ├── tvOS/                 # Stable tvOS release
    │   └── iCube.ipa
    └── tvOS-BetaN/           # Beta tvOS release
        └── iCube.ipa
```

## Feed Format

The generated feed follows the official AltStore/SideStore specification:

```json
{
  "name": "iCube",
  "identifier": "com.joemattiello.icube.source",
  "subtitle": "GameCube & Wii Emulator",
  "description": "Official source for iCube...",
  "iconURL": "https://icube-emu.com/icon-1024.png",
  "website": "https://icube-emu.com",
  "tintColor": "#3B82F6",
  "apps": [
    {
      "name": "iCube",
      "bundleIdentifier": "com.joemattiello.iCube",
      "developerName": "Provenance Emu",
      "versions": [...]
    }
  ]
}
```

## Configuration

### Environment Variables

Set in `.env.local`:
```bash
NEXT_PUBLIC_BASE_URL=https://icube-emu.com
```

This is used to generate absolute URLs for downloads and assets in the feed.

### App Metadata

Key information in the feed:
- **Bundle ID**: `com.joemattiello.iCube`
- **Developer**: Provenance Emu
- **Category**: games
- **Tint Color**: #3B82F6 (blue)
- **Min iOS**: 15.0
- **Min tvOS**: 16.0

## Usage

### For Users

1. **Via AltStore/SideStore**:
   - Add source: `https://icube-emu.com/api/altstore`
   - Or tap: [Add to AltStore](altstore://source?url=https://icube-emu.com/api/altstore)

2. **Manual Download**:
   - Visit: `https://icube-emu.com/downloads`
   - Download IPA and sideload manually

### For Developers

1. **Adding New Builds**:
   ```bash
   # Create version directory
   mkdir -p builds/1.0.1/iOS

   # Copy IPA and metadata
   cp iCube.ipa builds/1.0.1/iOS/
   cp DistributionSummary.plist builds/1.0.1/iOS/

   # Deploy
   npm run build
   ```

2. **Testing Locally**:
   ```bash
   npm run dev
   # Visit http://localhost:3000/api/altstore
   # Visit http://localhost:3000/downloads
   ```

## Features

- ✅ Automatic version detection from directory structure
- ✅ Beta version support with beta numbering
- ✅ Separate iOS and tvOS builds
- ✅ Metadata extraction from plist files
- ✅ Intelligent version sorting
- ✅ Static generation with hourly revalidation
- ✅ Beautiful downloads UI
- ✅ Direct IPA download links
- ✅ AltStore/SideStore quick add buttons

## Dependencies Added

```json
{
  "plist": "^3.x.x",
  "@types/plist": "^3.x.x"
}
```

## Files Created

1. `src/lib/buildParser.ts` - Build parsing logic
2. `src/app/api/altstore/route.ts` - AltStore API endpoint
3. `src/app/api/sidestore/route.ts` - SideStore API endpoint
4. `src/app/downloads/page.tsx` - Downloads UI page
5. `ALTSTORE.md` - Documentation
6. `public/icon-1024.png` - App icon for feed
7. `public/header.png` - Header image (placeholder)
8. `public/news-welcome.png` - News image (placeholder)

## Files Modified

1. `src/components/Navigation.tsx` - Added Downloads link

## Next Steps

1. Replace placeholder images:
   - `public/icon-1024.png` - Use actual 1024x1024 app icon
   - `public/header.png` - Use banner image for source
   - `public/news-welcome.png` - Use news/announcement image

2. Add more builds to the `builds/` directory

3. Customize app description and news items in API routes

4. Test with actual AltStore/SideStore clients

## Notes

- The feed is statically generated at build time
- Revalidation occurs every hour (3600 seconds)
- All URLs in the feed use `NEXT_PUBLIC_BASE_URL`
- Beta builds are marked with beta number from directory name
- Versions are sorted: latest → oldest, stable → beta

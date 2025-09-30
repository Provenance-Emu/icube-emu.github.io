# iCube AltStore/SideStore Source

This repository includes an AltStore/SideStore compatible source feed for distributing iCube builds.

## Source URL

Add this source to AltStore or SideStore:

```
https://icube-emu.com/api/altstore
```

Or for SideStore:

```
https://icube-emu.com/api/sidestore
```

## Quick Add Links

- **AltStore**: `altstore://source?url=https://icube-emu.com/api/altstore`
- **SideStore**: `sidestore://source?url=https://icube-emu.com/api/sidestore`

## Build Structure

The `public/builds` directory contains IPA files organized by version and platform:

```
public/builds/
└── x.y.z/                    # Version number (e.g., 1.0.0)
    ├── iOS/                  # Stable iOS build
    ├── iOS-BetaN/            # Beta iOS build (e.g., iOS-Beta7)
    ├── tvOS/                 # Stable tvOS build
    └── tvOS-BetaN/           # Beta tvOS build
```

Each build directory should contain:
- `iCube.ipa` - The app binary
- `DistributionSummary.plist` - Build metadata (optional)
- `ExportOptions.plist` - Export options (optional)

## API Endpoints

### `/api/altstore`
Returns the AltStore/SideStore source feed in JSON format.

### `/api/sidestore`
Same as `/api/altstore` - both endpoints return the same feed format.

### `/downloads`
Web UI for browsing and downloading available builds.

## Environment Variables

Set `NEXT_PUBLIC_BASE_URL` in your `.env.local` file:

```bash
NEXT_PUBLIC_BASE_URL=https://icube-emu.com
```

## Requirements

- **iOS**: Minimum version 15.6
- **tvOS**: Minimum version 16.6

## Features

The source feed automatically:
- Scans the `public/builds` directory for available versions
- Extracts metadata from plist files
- Sorts versions (latest first, stable before beta)
- Generates download URLs
- Provides version information and file sizes

## Development

To test the feed locally:

```bash
npm run dev
```

Then visit:
- http://localhost:3000/api/altstore
- http://localhost:3000/downloads

## Deployment

The feed is statically generated at build time and revalidated every hour. When deploying:

1. Ensure all IPA files are in the `builds` directory
2. Set `NEXT_PUBLIC_BASE_URL` to your production domain
3. Build and deploy: `npm run build`

## Adding New Builds

1. Create a version directory: `public/builds/x.y.z/`
2. Create platform directories: `iOS/`, `tvOS/`, `iOS-BetaN/`, etc.
3. Add the IPA file and metadata files to each directory
4. The feed will automatically pick up the new builds on next deployment

**Note:** Files in `public/` are automatically served as static assets by Next.js, so no build script is needed!

## License

See [LICENSE](LICENSE) file for details.

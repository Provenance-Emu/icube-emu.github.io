# Provenance family sites: refresh, cross-link, cross-SEO plan

Written 2026-09-07. Covers icube-emu.com, ifly-emu.com, provenance-emu.com and
jaguar.provenance-emu.com.

Status (2026-09-08): Phase 4 site half done and live: both Next sites render screenshots from
`src/data/screenshots.json` produced by `scripts/import-screenshots.mjs`, the AltStore feeds take their
screenshot URLs from the same manifest, and the iFly site no longer shows iCube's GameCube iPad shots
(they were byte-identical copies; replaced from the 2026-08 capture set). Phase 4 app side (2026-09-08): iCube app gained `-SCREENSHOT_MODE 1` (DEBUG only, 16 fictional
titles, procedural art) and `tools/screenshots/` (shots.json, capture.py, run.sh) on `develop`; 13
simulator captures imported to icube-emu.com. iFly harness fixed (tvOS remote/focus steps; search
shots match the seeded library) but the run mixed real titles (iPhone) with the fictional seed (iPad,
tvOS) and gameplay was only the SEGA boot splash, so nothing was imported; re-run against the seed for
a consistent set. Provenance `fastlane snapshot` is blocked by a link failure in UITesting.xcodeproj
(171 duplicate symbols: zstd.o vs libchdr-virtualjaguar.o), unpushed Snapfile device fix on develop. Phases 1, 2 and 3 done and live on iCube, iFly and Provenance (iCube now has
/guide/*, /controllers/, /compare/*; iFly has /compare/*; Provenance links back from /compare/ and the
GameCube/Dreamcast system pages; old iCube /help/* URLs are noindex refresh stubs). Phase 2 note: the Jaguar footer/publisher change is open as libretro/virtualjaguar-libretro#751
(jaguar.provenance-emu.com is built hourly by the Provenance-Emu fork's "Publish site" workflow from
libretro's `develop`, so it goes live once that PR merges). Decisions since the draft: every app has
a Plus tier on the App Store build only; sideloads and self-builds unlock everything. Feeds stay
separate for now; a combined-feed migration needs a real 301, which GitHub Pages cannot serve for
JSON, so the /sources/ pages point people at the combined provenance-emu.com/apps.json instead.

## 1. What the survey found

| Site | Stack | Last commit | Notes |
|---|---|---|---|
| provenance-emu.com | Hugo | 2026-07-29 | Reference site. Blog, `/systems/*`, `/guides/*`, `/compare/*`, FAQ, press, `/apps.json` feed. Zero itch.io mentions. **Zero links to iCube or iFly** in content or layouts. Live `apps.json` lists Provenance, Provenance Alpha, iCube; local checkout lacks iCube (repo is behind the bot feed commits). No iFly in the feed. |
| ifly-emu.com | Next 16 | 2026-08-14 | Has `/guide/*` (importing, formats, bios, arcade, systems, faq), `/controllers`, `/plus`, `/status`, `/testflight`. itch.io in 8 files: homepage CTA + iframe embed, downloads card, footer, CSP. Links to iCube only from `/links`. **`/api/altstore` feed returns zero versions** (empty `public/builds`). |
| icube-emu.com | Next | 2026-08-18 (+ uncommitted BIOS help page edit) | Has `/help/gamecube-bios`, `/help/web-import`, `/testflight`, `/status`. itch.io in homepage CTA + embed, downloads card, footer, CSP. **No link to iFly anywhere.** Sitemap omits `/testflight` and the help pages. `public/screenshots/` (10 files, Sep 2025) is unreferenced legacy. |
| jaguar.provenance-emu.com | python generator in `libretro/virtualjaguar-libretro` (`site/` + `scripts/build_site.py`, deploys on push to `develop`) | live 2026-09-07 | Has JSON-LD, sitemap, `check_site.py` gate. Footer links only to its own repo and docs.libretro.com. **No link back to the Provenance family.** Local checkout is on `fix/738-hle-align-odd-decoy`. |

Screenshots on disk (newest first):

| App | Path | Date | Size |
|---|---|---|---|
| Provenance | `Provenance/fastlane/screenshots/en-US` | 2026-08-04 | 3840x2160 (tvOS only) |
| iFly | `iFly/ifly screens/ifly delilah screenshots` | 2026-07-24 | 1320x2868 (iPhone 6.9") |
| iFly site | `ifly-emu.github.io/src/images/screenshots/{ios,ipad,tvos}` | 2026-08-14 | curated |
| iCube site | `icube-emu.github.io/src/images/screenshots/{ios,ipad,tvos}` | 2026-03-21 | curated |
| iCube | `~/Downloads/iCube appstore screenshots`, `~/Downloads/iCube ipad screenshots` | 2025-09-21 | 1242x2688, 2064x2752 |

Automation already in place:
- iFly app: `DebugLibrarySeeder` + `POST /api/debug/seed-library`, `tools/screenshots/seed.sh`, generated
  non-copyright cover art, and a written media plan (`iFly/docs/dev/app-store-media-plan.md`) targeting
  `screenshots/<locale>/<device>/<n>_<name>.png` via RocketSim CLI, then fastlane snapshot.
- Provenance app: fastlane `Snapfile` + `screenshots` lane, `Provenance-Screenshots` scheme,
  `-SCREENSHOT_MODE 1` launch arg. Devices: iPhone 16 Pro, iPhone SE, iPad Pro 12.9, Apple TV 4K.
- iCube app (`Provenance/Cores/Dolphin/dolphin-ios/Source/iOS/App`): nothing yet.

## 2. Goals

1. Demote itch.io on iCube and iFly to a legacy/donation mention on the downloads and donate pages only.
2. Every family site links to every other family site with the same wording, plus structured data
   that tells search engines they share a publisher.
3. Every site advertises all family feeds (AltStore/SideStore sources) in one place.
4. iCube reaches iFly's page parity; iFly picks up anything Provenance has that fits.
5. Screenshots are regenerated from seeded demo libraries by script, not by hand, and the sites
   render them from a manifest instead of hard-coded imports.

## 3. Phases

### Phase 1: itch.io demotion (iCube, iFly) — small, do first

- Remove the itch.io button and `ItchIoEmbed` from `DownloadSection.tsx` on both sites; delete
  `ItchIoEmbed.tsx`; drop the itch.io `frame-src` entries from the CSP meta in `layout.tsx`.
- Remove the itch.io link from the footer Community column.
- `/downloads`: move the itch.io card to the bottom under a "Legacy sources" heading with copy
  "Older builds remain on itch.io. Prefer the sources above."
- `/donate`: add itch.io as one pay-what-you-want option alongside Patreon/GitHub Sponsors.
- Keep `ItchIcon` in `ButtonLink.tsx` for the donate page.

### Phase 2: cross-linking and cross-SEO (all four sites)

- **Shared family block.** One canonical list, identical on every site:
  Provenance (provenance-emu.com), iCube (icube-emu.com), iFly (ifly-emu.com),
  Virtual Jaguar libretro (jaguar.provenance-emu.com), Wiki (wiki.provenance-emu.com),
  GitHub org, Discord. Rendered as a "More from Provenance" footer column on iCube/iFly, a footer
  partial on the Hugo site, and a footer paragraph in `build_site.py` on the Jaguar site.
  Keep the list in one JSON file per repo with a comment naming the source of truth (the Provenance
  Hugo `data/family.yml`), since the four repos cannot share code.
- **Structured data.** The Hugo site already emits `Organization` JSON-LD
  (`themes/small-apps-prov/layouts/partials/jsonld.html`, `sameAs` = GitHub, Discord, X, Facebook).
  Give it a stable `@id` (`https://provenance-emu.com/#org`) and add the three sibling domains to
  `sameAs`. iCube, iFly and the Jaguar site then reference that `@id` as
  `SoftwareApplication.publisher`. Port the Hugo `FAQPage` auto-generation to the iCube/iFly FAQ
  pages. Add `BreadcrumbList` on iCube/iFly guide pages.
- **Provenance Hugo content.** `/systems/gamecube` and `/systems/wii` get a "Want a standalone
  GameCube app? See iCube" callout; `/systems/dreamcast` gets the same for iFly; `/systems/jaguar`
  links the Jaguar core site. Add `/apps/` as a real page (not a redirect) describing the family
  and the feeds. `static/apps.json` is rewritten weekly by
  `.github/workflows/update-altstore-source.yml` from GitHub Releases, so iFly is added there, not by
  hand, once the iFly releases carry an IPA asset.
- **iCube/iFly content.** `/links` Related Projects: add the missing sibling and the Jaguar core.
  `/about`: one paragraph "Part of the Provenance family" with links.
- **Jaguar site.** PR to `libretro/virtualjaguar-libretro` (`develop`): family paragraph in the footer
  template of `scripts/build_site.py`; `check_site.py` already validates links so the gate covers it.
- **Feeds page.** New `/sources/` on iCube and iFly (and the Hugo `/apps/` page) listing: this app's
  AltStore/SideStore URL, the Provenance `apps.json` (which bundles iCube), and the sibling app's feed,
  each with Add-to-AltStore and Add-to-SideStore deep links. Link `/sources/` from nav and footer.
- **Sitemap/robots hygiene.** iCube: add `/testflight` and `/help/*`, derive `lastModified` from git.
  iFly: same audit. Both: `alternates.canonical` already present, keep.
- **Fix the empty iFly feed** (`public/builds` has no IPA, so `/api/altstore` has no versions). Either
  drop a build in or point `downloadURL` at the GitHub release asset like iCube's "GitHub latest" work.

### Phase 3: iCube parity with iFly (and one Provenance pattern for both)

Port from iFly, keeping iCube copy: `/guide` index, `/guide/importing` (fold `/help/web-import` in,
301 via a redirect page), `/guide/bios` (fold `/help/gamecube-bios` in), `/guide/formats` (ISO, GCZ,
RVZ, WBFS, WIA, NKit), `/guide/faq`, `/controllers` (GameCube/Wii mappings, MFi, Joy-Con, Wiimote
limits). Skip `/plus` unless iCube has a paid tier. Commit the pending BIOS help page edit first.

Also port the Provenance `compare/` pattern to both sites as long-tail SEO pages: iCube vs Dolphin
(the desktop app), iCube vs Provenance's GameCube core; iFly vs Flycast (RetroArch), iFly vs
Provenance's Dreamcast core. Provenance's own `/compare` pages get the reverse links.

### Phase 4: screenshot pipeline (coordinated with the app-side agents)

Contract between app repos and site repos:

```
<app>/screenshots/<locale>/<device>/<n>_<name>.png     # produced by the app repo
<site>/src/data/screenshots.json                         # produced by scripts/import-screenshots.mjs
```

- **iFly app**: finish Phase 0 of its media plan (seeded library, RocketSim capture, light/dark,
  iPhone 6.9 + iPad 13 + Apple TV). Already has the seeder and art generator.
- **Provenance app**: run the existing fastlane `screenshots` lane for iPhone and iPad (today only tvOS
  output exists). `SCREENSHOT_MODE` already exists; confirm it seeds a demo library.
- **iCube app**: add a `-SCREENSHOT_MODE` demo library (public-domain homebrew or a fake title list
  with generated art, same approach as iFly's `gen-art.py`) and either an XCUITest snapshot target or
  the RocketSim driver script copied from iFly. This is new work in the dolphin-ios tree.
- **Site side (iCube, iFly)**: `scripts/import-screenshots.mjs <app-screenshots-dir>` converts to
  webp + jpg, writes `src/data/screenshots.json` (device, name, alt, theme), and pages render a
  `ScreenshotGallery` from that manifest. Delete `public/screenshots/` on iCube (unused) and the flat
  legacy files on iFly. Add Apple Watch to the manifest schema so Provenance's watch app can use the
  same shape later.
- Until automation lands, the newest hand-taken sets (iFly "delilah" Jul 2026; iCube Sep 2025 sets are
  older than what the site already shows, so skip them) go through the same import script.

### Phase 5: housekeeping

- iCube: `public/builds-versioned/**/*.ipa` shows as modified after every `prebuild`. Add
  `public/builds-versioned/` to `.gitignore` if the deploy workflow regenerates it (it does), so
  binary churn stops appearing in every diff.
- Provenance local checkout: pull; the feed bot commits are ahead of the working copy.
- Jaguar local checkout: work from a fresh branch off `develop`, not the `fix/738` branch.

## 4. Order and rough effort

| Phase | Repos | Effort |
|---|---|---|
| 1 itch.io demotion | iCube, iFly | ~1 h |
| 2 cross-link + SEO + feeds | all four | ~1 day |
| 3 iCube parity | iCube | ~1 day |
| 4 screenshots | 3 app repos + 2 sites | 2–4 days, mostly app side |
| 5 housekeeping | iCube, Provenance | ~30 min |

Phases 1, 2 and 5 can be one PR per site. Phase 3 is its own PR. Phase 4 is split: site-side manifest
and gallery first (works with hand-taken shots), app-side capture in parallel by the app agents.

## 5. Open questions for Joe

1. Nav placement of `/sources/`: top nav on iCube/iFly, or footer only?
2. Should the Provenance `apps.json` become the single "family" feed that bundles iFly too, with
   the per-app feeds kept for people who only want one app? (Recommended: yes.)
3. iCube `/plus`: is there a paid tier to advertise, or skip?
4. For iCube screenshot content, is a fake title list with generated art acceptable, or do you want
   real public-domain homebrew (Dolphin runs the homebrew demos fine)?

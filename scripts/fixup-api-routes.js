#!/usr/bin/env node
/**
 * Make the AltStore/SideStore feed URLs work however a user types them.
 *
 * Next's static export writes a Route Handler as a single extensionless FILE,
 * `out/api/altstore`, regardless of `trailingSlash: true`. On GitHub Pages that gives:
 *
 *   /api/altstore   -> 200, but Content-Type: application/octet-stream (no extension to sniff)
 *   /api/altstore/  -> 404
 *
 * People paste source URLs by hand and the site's own links all carry a trailing slash,
 * so the 404 is a real way to lose someone at the "add source" step.
 *
 * Pages serves a directory by redirecting the bare path to the slashed one (verified:
 * /guide/jit 301s to /guide/jit/), so turning each route into a directory with an
 * index.html makes BOTH spellings work. A path cannot be a file and a directory at once,
 * which is why this replaces rather than adds. The sibling `.json` copy is there for
 * anyone who wants a URL that serves as application/json.
 *
 *   /api/altstore       -> 301 to /api/altstore/
 *   /api/altstore/      -> 200 (index.html, JSON body)
 *   /api/altstore.json  -> 200 application/json
 *
 * Content type is cosmetic for these clients: /api/altstore has been served as
 * octet-stream all along and both AltStore and the Provenance feed generator parse it
 * fine. The fix that matters is the 404.
 */
const fs = require('fs');
const path = require('path');

const API_DIR = path.join(process.cwd(), 'out', 'api');
const ROUTES = ['altstore', 'sidestore'];

if (!fs.existsSync(API_DIR)) {
  console.warn('[fixup-api-routes] no out/api directory; nothing to do');
  process.exit(0);
}

let changed = 0;
for (const name of ROUTES) {
  const filePath = path.join(API_DIR, name);

  if (!fs.existsSync(filePath)) {
    console.warn(`[fixup-api-routes] out/api/${name} missing; skipping`);
    continue;
  }
  if (fs.statSync(filePath).isDirectory()) {
    console.log(`[fixup-api-routes] out/api/${name} already a directory; skipping`);
    continue;
  }

  const body = fs.readFileSync(filePath, 'utf8');

  // Fail loudly rather than publish a broken feed.
  try {
    JSON.parse(body);
  } catch (error) {
    console.error(`[fixup-api-routes] out/api/${name} is not valid JSON; refusing to rewrite`);
    throw error;
  }

  fs.rmSync(filePath);
  fs.mkdirSync(filePath, { recursive: true });
  fs.writeFileSync(path.join(filePath, 'index.html'), body);
  fs.writeFileSync(path.join(API_DIR, `${name}.json`), body);
  console.log(`[fixup-api-routes] /api/${name}/ and /api/${name}.json now served`);
  changed++;
}

console.log(`[fixup-api-routes] rewrote ${changed} route(s)`);

/**
 * Renders the static Open Graph card to public/og-image.png (1200x630).
 *
 * Run with `npm run og` after changing the headline or palette — this is the
 * first thing anyone sees when the site is shared, so it should not drift from
 * what the page actually says. The output is committed; it does not run as
 * part of the build.
 */
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

import sharp from "sharp";

const OUT = path.join(process.cwd(), "public", "og-image.png");

// Kept in step with the @theme block in src/app/globals.css.
const GROUND = "#000000";
const INK = "#F7F7FA";
const INK_SOFT = "#8A8A99";
const LINE = "rgba(255,255,255,0.09)";
const VIOLET = "#8B5CF6";
const CYAN = "#22D3EE";
const MAGENTA = "#EC4899";

const FONT = "Segoe UI, Helvetica Neue, Arial, sans-serif";

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="brand" x1="0" y1="0" x2="1200" y2="630" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="${VIOLET}" />
      <stop offset="0.52" stop-color="${CYAN}" />
      <stop offset="1" stop-color="${MAGENTA}" />
    </linearGradient>
    <linearGradient id="word" x1="80" y1="300" x2="900" y2="380" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="${VIOLET}" />
      <stop offset="0.55" stop-color="${CYAN}" />
      <stop offset="1" stop-color="${MAGENTA}" />
    </linearGradient>
    <radialGradient id="glow" cx="0.5" cy="0.5" r="0.5">
      <stop offset="0" stop-color="${VIOLET}" stop-opacity="0.30" />
      <stop offset="1" stop-color="${VIOLET}" stop-opacity="0" />
    </radialGradient>
  </defs>

  <rect width="1200" height="630" fill="${GROUND}" />

  <!-- Soft off-centre glow, echoing the hero backdrop. -->
  <ellipse cx="960" cy="150" rx="480" ry="360" fill="url(#glow)" />

  <g stroke="${LINE}" stroke-width="1">
    <line x1="0" y1="120" x2="1200" y2="120" />
    <line x1="0" y1="512" x2="1200" y2="512" />
  </g>

  <!-- Monogram, matching app/icon.svg -->
  <rect x="80" y="40" width="56" height="56" rx="14" fill="url(#brand)" />
  <text x="108" y="70" text-anchor="middle" dominant-baseline="central"
        fill="#FFFFFF" font-family="${FONT}" font-size="26" font-weight="800"
        letter-spacing="-1.2">DC</text>

  <text x="154" y="70" dominant-baseline="central"
        fill="${INK}" font-family="${FONT}" font-size="25" font-weight="600">
    Devendra Choudhary
  </text>

  <text x="80" y="250" fill="${INK}" font-family="${FONT}" font-size="74" font-weight="700" letter-spacing="-2.6">
    Custom Software
  </text>
  <text x="80" y="346" fill="url(#word)" font-family="${FONT}" font-size="74" font-weight="700" letter-spacing="-2.6">
    &amp; Automation
  </text>

  <text x="80" y="420" fill="${INK_SOFT}" font-family="${FONT}" font-size="25" font-weight="400">
    Dashboards, portals, and internal tools for small teams.
  </text>

  <text x="80" y="576" fill="${INK_SOFT}" font-family="Consolas, Menlo, monospace" font-size="19" letter-spacing="1.5">
    MERN STACK  ·  JWT AUTH  ·  DOCKER &amp; VPS  ·  REPLIES WITHIN 24H
  </text>
</svg>`;

await mkdir(path.dirname(OUT), { recursive: true });
const png = await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toBuffer();
await writeFile(OUT, png);

console.log(`Wrote ${OUT} (${(png.length / 1024).toFixed(1)} KB)`);

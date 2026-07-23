/**
 * Prints the real pixel dimensions of every file in a folder under /public.
 * Used to fill in the `width`/`height` on case study images — those must match
 * the file exactly or the reserved space is wrong and the layout shifts.
 *
 *   node scripts/image-dims.mjs public/work/slotly
 */
import { readdirSync } from "node:fs";

import sharp from "sharp";

const dir = process.argv[2];
if (!dir) {
  console.error("usage: node scripts/image-dims.mjs <dir-under-public>");
  process.exit(1);
}

for (const file of readdirSync(dir)) {
  const meta = await sharp(`${dir}/${file}`).metadata();
  console.log(`${file}\t${meta.width}x${meta.height}\t${meta.format}`);
}

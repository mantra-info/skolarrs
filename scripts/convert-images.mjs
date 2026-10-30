// Converts every PNG in public/ to a resized WebP next to it, then removes the PNG.
// Originals are kept in .image-originals/ (gitignored). Run: node scripts/convert-images.mjs
import { readdir, stat, unlink } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve("public");
const MAX_WIDTH = 2000;
const QUALITY = 78;

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(p);
    else if (entry.name.toLowerCase().endsWith(".png")) yield p;
  }
}

let before = 0;
let after = 0;
for await (const file of walk(ROOT)) {
  const out = file.replace(/\.png$/i, ".webp");
  const { size } = await stat(file);
  await sharp(file)
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .webp({ quality: QUALITY, alphaQuality: 90, effort: 5 })
    .toFile(out);
  const { size: newSize } = await stat(out);
  before += size;
  after += newSize;
  await unlink(file);
}
console.log(`PNG ${(before / 1e6).toFixed(1)} MB -> WebP ${(after / 1e6).toFixed(1)} MB`);

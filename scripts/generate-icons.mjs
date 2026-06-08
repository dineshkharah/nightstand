import { mkdirSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, "..");
const svg = readFileSync(resolve(here, "icon.svg"));
const outDir = resolve(root, "public", "icons");

mkdirSync(outDir, { recursive: true });

const targets = [
  { size: 192, name: "icon-192.png" },
  { size: 512, name: "icon-512.png" },
  { size: 512, name: "maskable-512.png" },
  { size: 180, name: "apple-touch-icon.png" },
];

for (const { size, name } of targets) {
  await sharp(svg)
    .resize(size, size)
    .png()
    .toFile(resolve(outDir, name));
  console.log(`generated public/icons/${name}`);
}

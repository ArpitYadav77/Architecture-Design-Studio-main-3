import sharp from "sharp";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outputDir = join(__dirname, "..", "public", "architecture");

const videos = ["building_view", "society_view", "house_lawn"];

for (const name of videos) {
  const out = join(outputDir, `${name}_poster.webp`);
  // Simple dark SVG — tiny placeholder until real poster frames are available
  const svg = `<svg width="1920" height="1080" xmlns="http://www.w3.org/2000/svg"><rect width="1920" height="1080" fill="#1a1512"/></svg>`;
  await sharp(Buffer.from(svg)).webp({ quality: 50 }).toFile(out);
  console.log("Created:", name + "_poster.webp");
}

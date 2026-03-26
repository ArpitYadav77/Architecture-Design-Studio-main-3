/**
 * Batch convert all PNG/JPG images in src/assets/ to WebP format.
 * Preserves originals and creates .webp siblings.
 * Run: node scripts/convert-to-webp.mjs
 */
import sharp from "sharp";
import { readdir, stat } from "node:fs/promises";
import { join, extname, basename } from "node:path";

const ASSETS_DIR = join(process.cwd(), "src", "assets");
const QUALITY = 80; // WebP quality (80 = good balance of size/quality)

async function convert() {
  const files = await readdir(ASSETS_DIR);
  const images = files.filter((f) => /\.(png|jpe?g)$/i.test(f));

  console.log(`Found ${images.length} images to convert...\n`);

  let totalOriginal = 0;
  let totalWebp = 0;

  for (const file of images) {
    const inputPath = join(ASSETS_DIR, file);
    const name = basename(file, extname(file));
    const outputPath = join(ASSETS_DIR, `${name}.webp`);

    const originalSize = (await stat(inputPath)).size;
    totalOriginal += originalSize;

    try {
      const info = await sharp(inputPath)
        .webp({ quality: QUALITY, effort: 6 })
        .toFile(outputPath);

      totalWebp += info.size;
      const savings = ((1 - info.size / originalSize) * 100).toFixed(1);
      console.log(
        `  ✓ ${file} → ${name}.webp  (${(originalSize / 1024).toFixed(0)}KB → ${(info.size / 1024).toFixed(0)}KB, -${savings}%)`
      );
    } catch (err) {
      console.error(`  ✗ ${file}: ${err.message}`);
    }
  }

  console.log(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
  console.log(`  Original total: ${(totalOriginal / 1024 / 1024).toFixed(1)} MB`);
  console.log(`  WebP total:     ${(totalWebp / 1024 / 1024).toFixed(1)} MB`);
  console.log(`  Savings:        ${((1 - totalWebp / totalOriginal) * 100).toFixed(1)}%`);
  console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`);
}

convert();

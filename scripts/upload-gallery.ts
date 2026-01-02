import fs from "fs";
import path from "path";
import os from "os";

import sharp from "sharp";

import { cloudinary } from "@/lib/cloudinary";

const IMAGES_DIR = path.join(process.cwd(), "public/images");
const TEMP_DIR = os.tmpdir();

const files = fs
  .readdirSync(IMAGES_DIR)
  .filter((file) => /\.(jpg|jpeg|png|webp)$/i.test(file));

for (const file of files) {
  const inputPath = path.resolve(IMAGES_DIR, file);
  const outputPath = path.join(TEMP_DIR, file);

  try {
    await sharp(inputPath)
      .rotate()
      .resize({ width: 2048, withoutEnlargement: true })
      .jpeg({ quality: 80 })
      .toFile(outputPath);

    await cloudinary.uploader.upload(outputPath, {
      folder: "king-academy",
      use_filename: true,
      unique_filename: true,
      overwrite: true,
    });

    console.log(`✅ Uploaded ${file}`);
  } catch (err) {
    console.error(`❌ Failed ${file}`, err);
  }
}

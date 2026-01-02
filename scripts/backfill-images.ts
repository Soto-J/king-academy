import { db } from "@/db";
import { galleryImageTable } from "@/db/schema";
import { cloudinary } from "@/lib/cloudinary";

const result = await cloudinary.api.resources({
  type: "upload",
  prefix: "king-academy/",
  max_results: 500,
});

for (const asset of result.resources) {
  try {
    const dimensions = {
      width: asset.width,
      height: asset.height,
    };

    await db
      .insert(galleryImageTable)
      .values({
        publicId: asset.public_id,
        ...dimensions,
      })
      .onDuplicateKeyUpdate({ set: dimensions });

    console.log(`✅ Uploaded ${asset}`);
  } catch (error) {
    console.error(`❌ Failed ${asset}`, error);
  }
}

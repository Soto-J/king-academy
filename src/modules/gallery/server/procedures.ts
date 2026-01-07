import { baseProcedure, createTRPCRouter } from "@/trpc/init";

import type { Photo } from "react-photo-album";

import { db } from "@/db";
import { galleryImageTable } from "@/db/schema";

import { cloudinary } from "@/lib/cloudinary";
import { LoadImagesQuerySchema } from "@/modules/gallery/schemas";

export const galleryProcedure = createTRPCRouter({
  loadImages: baseProcedure
    .input(LoadImagesQuerySchema)
    .query(async ({ input }) => {
      // const start = (input.page - 1) * input.limit;
      // const end = start + input.limit;

      const images = await db.select().from(galleryImageTable);

      return images.map((img, index) => ({
        src: cloudinary.url(img.publicId, {
          secure: true,
          quality: "auto",
          auto_format: "auto",
          width: 1600,
        }),
        alt: `Gallery image ${index + 1}`,
        width: img.width,
        height: img.height,
      })) as Photo[];
    }),
});

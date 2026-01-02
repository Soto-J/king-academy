import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { z } from "zod";

import { db } from "@/db";
import { galleryImageTable } from "@/db/schema";
import type { Photo } from "react-photo-album";

import { cloudinary } from "@/lib/cloudinary";

export const galleryProcedure = createTRPCRouter({
  loadImages: baseProcedure
    .input(
      z.object({
        page: z.number().default(1),
        limit: z.number().default(20),
      }),
    )
    .query(async ({ input }) => {
      // const start = (input.page - 1) * input.limit;
      // const end = start + input.limit;

      const images = await db.select().from(galleryImageTable);

      return images.map((img, index) => ({
        src: cloudinary.url(img.publicId, {
          secure: true,
          quality: "auto",
          fetch_format: "auto",
          width: 1600,
        }),
        alt: `Gallery image ${index + 1}`,
        width: img.width,
        height: img.height,
      })) as Photo[];
    }),
});

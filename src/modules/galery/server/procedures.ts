import path from "path";
import fs from "fs";

import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { z } from "zod";

export const galleryProcedure = createTRPCRouter({
  loadImages: baseProcedure
    .input(
      z.object({
        page: z.number().default(1),
        limit: z.number().default(20),
      }),
    )
    .query(({ input }) => {
      const imagesDir = path.join(process.cwd(), "public/images");

      const imageFiles = fs
        .readdirSync(imagesDir)
        .filter((file) => file.endsWith(".jpg"));

      const start = (input.page - 1) * input.limit;
      const end = start + input.limit;

      return imageFiles.map((filename, index) => ({
        src: `/images/${filename}`,
        alt: `Gallery image ${index + 1} from June 29, 2024`,
        id: `img-${index}`,
      }));
    }),
});

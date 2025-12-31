import { z } from "zod";

import { baseProcedure, createTRPCRouter } from "@/trpc/init";

import { imageFiles } from "../constants";

export const galleryProcedure = createTRPCRouter({
  loadImages: baseProcedure
    .input(
      z.object({
        page: z.number().default(1),
        limit: z.number().default(20),
      }),
    )
    .query(({ input }) => {
      const start = (input.page - 1) * input.limit;
      const end = start + input.limit;

      return imageFiles.map((filename, index) => ({
        src: `/images/${filename}`,
        alt: `Gallery image ${index + 1} from June 29, 2024`,
        id: `img-${index}`,
      }));
    }),
});

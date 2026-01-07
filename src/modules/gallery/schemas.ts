import { z } from "zod";

export const LoadImagesQuerySchema = z.object({
  page: z.number().default(1),
  limit: z.number().default(20),
});

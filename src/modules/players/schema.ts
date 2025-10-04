import { z } from "zod";

import { ROLES } from "@/db/schema";

export const EditPlayerSchema = z.object({
  isActive: z.boolean(),
  role: z.enum(ROLES),
});

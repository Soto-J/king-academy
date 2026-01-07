import { z } from "zod";

import { ROLES } from "@/db/schema";
import { DEFAULT_PAGE_SIZE, MAX_PAGE_SIZE, MIN_PAGE_SIZE } from "./params";

export const RosterGetOneInputSchema = z.object({
  userId: z.string().min(1, "User ID required"),
});

export const RosterGetManyInputSchema = z.object({
  page: z.number().min(1).default(1),
  pageSize: z
    .number()
    .min(MIN_PAGE_SIZE)
    .max(MAX_PAGE_SIZE)
    .default(DEFAULT_PAGE_SIZE),
  search: z.string().nullish(),
});

export const RosterEditOneInputSchema = RosterGetOneInputSchema;
export const RosterDeleteOneInputSchema = RosterGetOneInputSchema;

export const EditPlayerSchema = z.object({
  isActive: z.boolean(),
  role: z.enum(ROLES),
});

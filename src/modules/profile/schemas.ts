import { z } from "zod";

import { BATTING_STANCE, POSITIONS, THROWING_ARM } from "@/db/schema";

export const ProfileFormSchema = z.object({
  firstName: z.string().min(1, "First name required."),
  lastName: z.string().min(1, "Last name required."),
  dateOfBirth: z.date().nullable(),
  phoneNumber: z.string().optional(),
  school: z.string().optional(),
  bio: z.string().optional(),
  address: z
    .object({
      street: z.string().optional(),
      city: z.string().optional(),
      state: z.string().optional(),
      zipcode: z.string().optional(),
    })
    .optional(),
  positions: z.array(z.enum(POSITIONS)).default([]),
  battingStance: z
    .object({
      isPrimary: z.boolean().optional(),
      stance: z.enum(BATTING_STANCE).optional(),
      primarySide: z.enum(["left", "right"]).optional(),
    })
    .optional(),
  throwingArm: z
    .object({
      isPrimary: z.boolean().optional(),
      arm: z.enum(THROWING_ARM).optional(),
      primarySide: z.enum(["left", "right"]).optional(),
    })
    .optional(),
  isPrimary: z.boolean(),
});

export const ProfileEditSchema = ProfileFormSchema.extend({
  userId: z.string(),
});

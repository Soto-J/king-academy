import { z } from "zod";

import { BATTING_STANCE, POSITIONS, THROWING_ARM } from "@/db/schema";

export const ProfileFormSchema = z.object({
  firstName: z.string().min(1, "First name required."),
  lastName: z.string().min(1, "Last name required."),
  dateOfBirth: z.date().nullable(),
  phoneNumber: z.string().nullable(),
  school: z.string().nullable(),
  bio: z.string().nullable(),
  address: z.object({
    street: z.string().nullable(),
    city: z.string().nullable(),
    state: z.string().nullable(),
    zipcode: z.string().nullable(),
  }),
  positions: z.array(z.enum(POSITIONS)),
  primaryPosition: z.enum(POSITIONS).optional(),
  battingStance: z.enum(BATTING_STANCE).nullish(),
  throwingArm: z.enum(THROWING_ARM).nullish(),
});

export const ProfileEditSchema = ProfileFormSchema.extend({
  userId: z.string(),
});

import { z } from "zod";

import { BATTING_STANCE, POSITIONS, THROWING_ARM } from "@/db/schema";

export const ProfileFormSchema = z
  .object({
    firstName: z.string().min(1, "First name required."),
    lastName: z.string().min(1, "Last name required."),
    dateOfBirth: z.date().nullish(),
    phoneNumber: z.string().optional(),
    school: z.string().optional(),

    address: z.object({
      street: z.string().optional(),
      city: z.string().optional(),
      state: z
        .string()
        .max(2, "State must be 2 characters (e.g., NY, CA)")
        .optional(),
      zipcode: z.string().max(5, "ZIP code must be 5 digits").optional(),
    }),

    primaryPosition: z.enum(POSITIONS).nullable(),
    positions: z.array(z.enum(POSITIONS)),
    battingStance: z.enum(BATTING_STANCE).nullable(),
    throwingArm: z.enum(THROWING_ARM).nullable(),

    bio: z.string().optional(),
  })
  .refine(
    (data) =>
      !data.primaryPosition || data.positions.includes(data.primaryPosition),
    {
      message: "Primary position must be one of the selected positions",
    },
  );

export const ProfileEditSchema = ProfileFormSchema.safeExtend({
  userId: z.string(),
});

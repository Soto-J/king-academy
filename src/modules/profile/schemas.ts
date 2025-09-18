import { z } from "zod";

import { BATTING_STANCE, POSITIONS, THROWING_ARM } from "@/db/schema";

const optional = z.string().optional();
const nullableString = z
  .string()
  .nullable()
  .transform((val) => (val === "" ? null : val));

export const ProfileFormSchema = z
  .object({
    firstName: z.string().min(1, "First name required."),
    lastName: z.string().min(1, "Last name required."),
    dateOfBirth: z.date().nullish(),
    phoneNumber: z.string().optional(),
    school: z.string().optional(),
    bio: z.string().optional(),
    address: z.object({
      street: z.string().optional(),
      city: z.string().optional(),
      state: z.string().optional(),
      zipcode: z.string().optional(),
    }),
    positions: z.array(z.enum(POSITIONS)),
    primaryPosition: z.enum(POSITIONS).nullable(),
    battingStance: z.enum(BATTING_STANCE).nullable(),
    throwingArm: z.enum(THROWING_ARM).nullable(),
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

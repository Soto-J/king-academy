import { BATTING_STANCE, POSITIONS, THROWING_ARM } from "@/db/schema";
import { z } from "zod";

export const ProfileFormSchema = z.object({
  firstName: z.string().min(1, "First name required."),
  lastName: z.string().min(1, "Last name required."),
  dateOfBirth: z.date().nullable,
  phoneNumber: z.string(),
  school: z.string().optional(),
  bio: z.string().optional(),
  address: z
    .object({
      street: z.string(),
      city: z.string(),
      state: z.string(),
      zipcode: z.string().min(5).max(5),
    })
    .nullable(),
  position: z.enum(POSITIONS),
  battingStance: z.enum(BATTING_STANCE),
  throwingArm: z.enum(THROWING_ARM),
});

export const ProfileEditSchema = ProfileFormSchema.extend({
  userId: z.string(),
});

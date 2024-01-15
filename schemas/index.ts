import { Batting, Position, Throwing } from "@prisma/client";
import * as z from "zod";

export const editFormSchema = z.object({
  firstName: z.string().min(2, { message: "First name is required" }),
  lastName: z.string().min(2, { message: "Last name is required" }),
  phoneNumber: z.string().min(10, { message: "Phone number is required" }),
  dateOfBirth: z.string().min(5, { message: "Date of birth is required" }),
  school: z.string().min(2, { message: "School is required" }),
  address: z.object({
    street: z.string().min(4, { message: "Street is required" }),
    city: z.string().min(2, { message: "City is required" }),
    state: z.string().min(1, { message: "State is required" }),
    zip: z
      .string()
      .min(5, { message: "Zip is required" })
      .max(5, { message: "Zip is required" }),
  }),
  positions: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "At least one position is required",
  }),
  batting: z.enum([Batting.RIGHT, Batting.LEFT, Batting.SWITCH]),
  throwing: z.enum([Throwing.RIGHT, Throwing.LEFT, Throwing.SWITCH]),
  bio: z.string(),
});

export type EditFormSchema = z.infer<typeof editFormSchema>;

export const POSITION_OPTIONS = [
  { position: Position.PITCHER, label: "Pitcher" },
  { position: Position.CATCHER, label: "Catcher" },
  { position: Position.FIRSTBASE, label: "First Base" },
  { position: Position.SECONDBASE, label: "Second Base" },
  { position: Position.THIRDBASE, label: "Third Base" },
  { position: Position.SHORTSTOP, label: "Shortstop" },
  { position: Position.LEFTFIELD, label: "Left Field" },
  { position: Position.CENTERFIELD, label: "Center Field" },
  { position: Position.RIGHTFIELD, label: "Right Field" },
  { position: Position.DESIGNATEDHITTER, label: "Designated Hitter" },
  { position: Position.BENCH, label: "Bench" },
] as const;

import { Batting, Position, Throwing } from "@prisma/client";
import * as z from "zod";

export const formSchema = z.object({
  school: z.string({ required_error: "School required" }).trim(),
  dateOfBirth: z.string({ required_error: "Date of birth required" }),
  phoneNumber: z.string({ required_error: "Phone number required" }).min(1),
  address: z.object(
    {
      street: z.string({ required_error: "Street required" }).trim().min(1),
      city: z.string({ required_error: "City required" }).trim().min(1),
      state: z.string({ required_error: "State required" }).trim().min(1),
      zip: z.string({ required_error: "zip required" }).min(5).max(5),
    },
    { required_error: "Field is missing" },
  ),
  positions: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "At least one position is required",
  }),
  batting: z.enum([Batting.RIGHT, Batting.LEFT, Batting.SWITCH], {
    required_error: "Please select one",
  }),
  throwing: z.enum([Throwing.RIGHT, Throwing.LEFT, Throwing.SWITCH], {
    required_error: "Please select one",
  }),
  bio: z.string(),
});

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

// export const LoginSchema = z.object({
//   email: z.string({ required_error: "Email required" }).email(),
//   password: z.string().min(1, { message: "Password required" }),
// });

// export const RegisterSchema = z.object({
//   email: z.string().min(6, { message: "Email required" }).email(),
//   password: z.string().min(6, { message: "Minimum 6 characters required" }),
//   name: z.string().min(1, { message: "Name required" }),
// });

import { Batting, Throwing } from "@prisma/client";
import * as z from "zod";

export const editFormSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  dateOfBirth: z.string().min(1, { message: "Date of birth is required" }),
  school: z.string().min(2, { message: "School is required" }),
  address: z.object({
    street: z.string().min(1, { message: "Street is required" }),
    city: z.string().min(1, { message: "City is required" }),
    state: z.string().min(1, { message: "State is required" }),
    zip: z.string().min(5).max(5),
  }),
  positions: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "At least one position is required",
  }),
  batting: z.enum([Batting.RIGHT, Batting.LEFT, Batting.SWITCH]),
  throwing: z.enum([Throwing.RIGHT, Throwing.LEFT, Throwing.SWITCH]),
  bio: z.string(),
});

export type EditFormSchema = z.infer<typeof editFormSchema>;

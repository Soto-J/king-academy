import { Batting, Throwing } from "@prisma/client";
import * as z from "zod";

export const formSchema = z.object({
  school: z.string({ required_error: "School is required" }),
  address: z.object({
    street: z.string({ required_error: "Street is required" }),
    city: z.string({ required_error: "City is required" }),
    state: z.string({ required_error: "State is required" }),
    zip: z.string({ required_error: "zip is required" }).min(5).max(5),
  }),
  positions: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "At least one position is required",
  }),
  batting: z.enum([Batting.RIGHT, Batting.LEFT, Batting.SWITCH]),
  throwing: z.enum([Throwing.RIGHT, Throwing.LEFT, Throwing.SWITCH]),
  bio: z.string(),
});

export const LoginSchema = z.object({
  email: z.string({required_error: "Email required"}).email(),
  password: z.string().min(1, { message: "Password required" }),
});

export const RegisterSchema = z.object({
  email: z.string().min(6, { message: "Email required" }).email(),
  password: z.string().min(6, { message: "Minimum 6 characters required" }),
  name: z.string().min(1, { message: "Name required" }),
});

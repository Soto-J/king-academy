"use server";

import db from "@/lib/prismadb";

import bcrypt from "bcrypt";
import * as z from "zod";

import { RegisterSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }

  const { userName, password, email } = validatedFields.data;

  const userExist = await getUserByEmail(email);

  if (userExist) {
    return { error: "Email already in use" };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await db.user.create({
    data: {
      userName,
      email,
      password: hashedPassword,
    },
  });

  // TODO: Send email to user

  return { success: "User Created!" };
};

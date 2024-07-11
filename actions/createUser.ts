import { type UserJSON } from "@clerk/nextjs/server";

import prisma from "@/lib/prismadb";
import { Role } from "@prisma/client";

export async function createUser(user: UserJSON) {
  try {
    const { id, first_name, last_name, phone_numbers, email_addresses } = user;

    const phoneNumbers = phone_numbers.map((number) => number.phone_number);
    const emails = email_addresses.map((email) => email.email_address);

    const newUser = await prisma.user.create({
      data: {
        id,
        firstName: first_name,
        lastName: last_name,
        phoneNumbers,
        emails,
        role: Role.MEMBER,
      },
    });

    if (!newUser) {
      throw new Error("User not created");
    }

    return { message: "User created", newUser };
  } catch (error) {
    console.error("Create User:", error);
    throw error;
  }
}

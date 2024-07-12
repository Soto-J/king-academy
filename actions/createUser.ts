import { type UserJSON } from "@clerk/nextjs/server";

import prisma from "@/lib/prismadb";

export async function createUser(user: UserJSON) {
  try {
    const {
      id,
      first_name,
      last_name,
      phone_numbers,
      email_addresses,
      image_url,
      username,
    } = user;

    const newUser = await prisma.user.create({
      data: {
        externalId: id,
        username: username || "",
        firstName: first_name,
        lastName: last_name,
        phoneNumber: phone_numbers[0].phone_number,
        email: email_addresses[0].email_address,
        imageUrl: image_url,
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

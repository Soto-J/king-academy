import { UserJSON } from "@clerk/nextjs/server";
import { Role } from "@prisma/client";

export async function insertUserToDB(user: UserJSON) {
  try {
    const { id, first_name, last_name, phone_numbers, email_addresses } = user;

    const phoneNumbers = phone_numbers.map((number) => number.phone_number);
    const emails = email_addresses.map((email) => email.email_address);

    // Upsert: if user exists, update, else create
    const insertedUser = await prisma?.user.upsert({
      where: { id },
      create: {
        id,
        firstName: first_name,
        lastName: last_name,
        phoneNumbers,
        emails,
        role: Role.MEMBER,
      },
      update: {
        firstName: first_name,
        lastName: last_name,
        phoneNumbers,
        emails,
      },
    });

    if (!insertedUser) {
      throw new Error("User not inserted");
    }

    return { message: "User inserted", insertedUser };
  } catch (error) {
    console.error("Insert User:", error);
    return null;
  }
}

import prisma from "@/lib/prismadb";
import { type AuthObject } from "@clerk/nextjs/server";

export async function createUser(auth: AuthObject) {
  try {
    if (!auth.user) {
      throw new Error("No user provided");
    }

    const { userId } = auth;
    if (!userId) {
      throw new Error("No user ID provided");
    }

    const { firstName, lastName, phoneNumbers, emailAddresses } = auth.user;

    console.log(auth);
    console.log({ emailAddresses });

    // const newUser = await prisma.user.create({
    //   data: {
    //     id: userId,
    //     firstName: firstName || "",
    //     lastName: lastName || "",
    //     phoneNumber: phoneNumbers[0].toString(),
    //     email: emailAddresses[0],
    //   },
    // });

    return null;
  } catch (error) {
    console.error("Create User:", error);
    return null;
  }
}

import { currentUser, UserJSON } from "@clerk/nextjs/server";

import prisma from "@/lib/prismadb";
import { Prisma } from "@prisma/client";

// User type that includes posistions and address
const user = Prisma.validator<Prisma.UserDefaultArgs>()({
  include: { positions: true, address: true },
});
export type User = Prisma.UserGetPayload<typeof user>;

export async function getCurrentUser() {
  try {
    const clerkUser = await currentUser();

    if (!clerkUser?.id) {
      throw new Error("Unathorized - No current user.");
    }

    const user = await prisma.user.findUnique({
      where: {
        externalId: clerkUser.id,
      },
      include: { positions: true, address: true },
    });

    if (!user) {
      return null;
    }

    return user;
  } catch (error) {
    console.error("Get Users:", error);
    return null;
  }
}

export async function upsertUser(user: UserJSON) {
  try {
    const upsertData = {
      firstName: user.first_name,
      lastName: user.last_name,
      username: user?.username || "",
      email: user.email_addresses[0].email_address,
      imageUrl: user.image_url,
    };

    // Upsert: if user doesn't exists create else update
    const insertedUser = await prisma?.user.upsert({
      where: { externalId: user.id },
      create: { externalId: user.id, ...upsertData },
      update: { ...upsertData },
    });

    if (!insertedUser) {
      throw new Error("Problem inserting user data");
    }

    return { message: "User upserted successfully", insertedUser };
  } catch (error) {
    console.error("Insert User:", error);
    return null;
  }
}

export async function deleteUser(userId?: string) {
  try {
    if (!userId) {
      return null;
    }

    const user = await prisma.user.delete({
      where: {
        id: userId,
      },
    });

    return { message: "User deleted successfully", user };
  } catch (error) {
    console.error("Delete User:", error);
    return null;
  }
}

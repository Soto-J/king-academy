import prisma from "@/lib/prismadb";

import { currentUser } from "@clerk/nextjs";

export async function getCurrentUser() {
  try {
    const clerkUser = await currentUser();

    if (!clerkUser?.id) {
      throw new Error("Unathorized");
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

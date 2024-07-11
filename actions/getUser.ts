import prisma from "@/lib/prismadb";

export async function getUser(userId?: string) {
  try {
    if (!userId) {
      return null;
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
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

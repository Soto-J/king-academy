import prisma from "@/lib/prismadb";

export async function getUser(userId: string | null) {
  try {
    if (!userId) {
      return null;
    }

    const member = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        memberProfile: true,
      },
    });

    if (!member) {
      return null;
    }

    return member;
  } catch (error) {
    console.error("Get Users:", error);
    return null;
  }
}

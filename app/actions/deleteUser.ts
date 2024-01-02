import prisma from "@/lib/prismadb";

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

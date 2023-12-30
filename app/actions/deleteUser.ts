import prisma from "@/lib/prismadb";

export async function deleteUser(userId?: string) {
  try {
    return null;
  } catch (error) {
    console.error("Delete User:", error);
    return null;
  }
}

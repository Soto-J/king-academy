import prisma from "@/lib/prismadb";

export async function updateUser(userId?: string) {
  try {
    return null;
  } catch (error) {
    console.error("Update User:", error);
    return null;
  }
}

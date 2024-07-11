import prisma from "@/lib/prismadb";
import { UserJSON } from "@clerk/nextjs/server";

export async function updateUser(user: UserJSON) {
  try {
    return null;
  } catch (error) {
    console.error("Update User:", error);
    return null;
  }
}

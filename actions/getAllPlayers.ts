import prisma from "@/lib/prismadb";

export async function getAllPlayers() {
  try {
    return await prisma.user.findMany();
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
}

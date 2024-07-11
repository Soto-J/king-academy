import prisma from "@/lib/prismadb";

export async function getAllPlayers() {
  try {
    const players = await prisma.user.findMany();

    return players;
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
}

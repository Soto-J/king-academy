import prisma from "@/lib/prismadb";
import { Prisma } from "@prisma/client";

// Create a type that includes posistions and address
const user = Prisma.validator<Prisma.UserDefaultArgs>()({
  include: { positions: true, address: true },
});
export type User = Prisma.UserGetPayload<typeof user>;

export async function getAllPlayers() {
  try {
    return await prisma.user.findMany({
      include: { address: true, positions: true },
    });
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
}

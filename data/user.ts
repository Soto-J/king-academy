import db from "@/lib/prismadb";
import { Prisma } from "@prisma/client";

const UserWithProfile = Prisma.validator<Prisma.UserDefaultArgs>()({
  include: { profile: true },
});
export type UserWithProfile = Prisma.UserGetPayload<typeof UserWithProfile>;

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({
      where: { email },
      include: { profile: true },
    });

    return user;
  } catch (error) {
    return null;
  }
};

export const getUserById = async (id?: string) => {
  try {
    if (!id) {
      return null;
    }

    const user = await db.user.findUnique({
      where: { id },
      include: { profile: true },
    });

    return user;
  } catch (error) {
    return null;
  }
};

export const getAllUsers = async () => {
  try {
    const allUsers = await db.user.findMany({
      include: { profile: true },
    });

    return allUsers;
  } catch (error) {
    return null;
  }
};

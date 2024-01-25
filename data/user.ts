"use server";

import { Prisma } from "@prisma/client";
import db from "@/lib/prismadb";

import { UserJSON, currentUser } from "@clerk/nextjs/server";
import { capitalize } from "./helper";

const userWithProfileAndAddress = Prisma.validator<Prisma.UserDefaultArgs>()({
  include: {
    profile: {
      include: { address: true },
    },
  },
});
export type UserWithProfileAndAddress = Prisma.UserGetPayload<
  typeof userWithProfileAndAddress
>;

export const getCurrentUser = async () => {
  try {
    const clerkUser = await currentUser();

    if (!clerkUser || !clerkUser.id) {
      return null;
    }

    const user = await db.user.findUnique({
      where: { externalId: clerkUser.id },
      include: {
        profile: {
          include: { address: true },
        },
      },
    });

    if (!user) {
      throw new Error("User not found!");
    }

    return user;
  } catch (error) {
    throw error;
  }
};

export const getUserById = async (id?: string | null) => {
  try {
    if (!id) {
      throw new Error("No ID!");
    }

    const user = await db.user.findUnique({
      where: { externalId: id },
      include: {
        profile: {
          include: {
            address: true,
          },
        },
      },
    });

    if (!user) {
      throw new Error("User not found!");
    }

    return user;
  } catch (error) {
    throw error;
  }
};

export const getAllUsers = async () => {
  try {
    const users = await db.user.findMany({
      include: {
        profile: {
          include: { address: true },
        },
      },
    });

    return users;
  } catch (error) {
    return [];
  }
};

export const createOrUpdateUser = async (data: UserJSON) => {
  try {
    console.log("id", data.id);
    console.log("clerkData", data);

    const username = capitalize(data.username);

    const user = {
      username,
      email: data.email_addresses[0].email_address,
      imageUrl: data.image_url,
    };

    return await db.user.upsert({
      where: { externalId: data.id },
      create: { externalId: data.id, ...user },
      update: user,
    });
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const deleteUser = async (id?: string) => {
  try {
    if (!id) {
      throw new Error("No ID!");
    }

    const userToDelete = await db.user.findUnique({
      where: { externalId: id },
    });

    if (!userToDelete) {
      throw new Error("User not found!");
    }

    return await db.user.delete({
      where: { externalId: id },
    });
  } catch (error) {
    throw error;
  }
};

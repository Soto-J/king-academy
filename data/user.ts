"use server";

import { Position, Prisma } from "@prisma/client";
import db from "@/lib/prismadb";

import { UserJSON, currentUser } from "@clerk/nextjs/server";

import { type EditFormSchema } from "@/schemas";

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

    if (!clerkUser) return null;

    const user = await db.user.findUnique({
      where: { externalId: clerkUser.id },
      include: {
        profile: {
          include: { address: true },
        },
      },
    });

    return user;
  } catch (error) {
    return null;
  }
};

export const getUserById = async (id?: string | null) => {
  try {
    if (!id) return null;

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

    return user;
  } catch (error) {
    return null;
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
    return null;
  }
};

export const createOrUpdateUser = async (data: UserJSON) => {
  try {
    console.log("id", data.id);
    console.log("clerkData", data);

    const username = data.username
      ? data.username[0].toUpperCase() + data.username.slice(1)
      : "";

    const user = {
      username,
      email: data.email_addresses[0].email_address,
      imageUrl: data.image_url,
    };

    const createdOrUpdatedUser = await db.user.upsert({
      where: { externalId: data.id },
      create: { externalId: data.id, ...user },
      update: user,
    });

    return createdOrUpdatedUser;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const deleteUser = async (id?: string) => {
  try {
    await db.user.delete({
      where: { externalId: id },
    });

    return null;
  } catch (error) {
    return null;
  }
};

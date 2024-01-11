"use server";

import { Position, Prisma } from "@prisma/client";
import db from "@/lib/prismadb";

import { UserJSON } from "@clerk/nextjs/server";

import { type EditFormSchema } from "@/schemas";

const userWithProfileAndAddress = Prisma.validator<Prisma.UserDefaultArgs>()({
  include: {
    profile: {
      include: {
        address: true,
      },
    },
  },
});

export type UserWithProfileAndAddress = Prisma.UserGetPayload<
  typeof userWithProfileAndAddress
>;

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
          include: {
            address: true,
          },
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
    const { id, ...clerkData } = data;

    console.log("clerkData", clerkData);

    const createdOrUpdatedUser = await db.user.upsert({
      where: { externalId: id },
      create: {
        externalId: id,
        email: clerkData.email_addresses[0].email_address,
        phoneNumber: clerkData.phone_numbers[0].phone_number,
      },
      update: {
        email: clerkData.email_addresses[0].email_address,
        phoneNumber: clerkData.phone_numbers[0].phone_number,
      },
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

export const createOrUpdateProfile = async (
  userId: string,
  data: EditFormSchema,
) => {
  try {
    const profileData = {
      ...data,
      firstName: data.firstName[0].toUpperCase() + data.firstName.slice(1),
      lastName: data.lastName[0].toUpperCase() + data.lastName.slice(1),
      age: new Date().getFullYear() - new Date(data.dateOfBirth).getFullYear(),
      positions: data.positions as Position[],
      address: { create: { ...data.address } },
    };

    await db.profile.upsert({
      where: { userId },
      create: { userId, ...profileData },
      update: { ...profileData },
    });

    return { success: "User profile updated successfully!" };
  } catch (error) {
    console.log(error);
    return { error: "Error updating user profile!" };
  }
};

export const getUserProfile = async (userId: string) => {
  try {
    const profile = await db.profile.findUnique({
      where: { userId },
    });

    return profile;
  } catch (error) {
    return null;
  }
};

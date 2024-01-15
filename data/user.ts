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
          include: { address: true },
        },
      },
    });

    return users;
  } catch (error) {
    return null;
  }
};

export const getUserProfile = async (userId: string) => {
  try {
    // TODO: Create a getSelf()
    const profile = await db.profile.findUnique({
      where: { profileId: userId },
    });

    return profile;
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

export const createOrUpdateProfile = async (
  userId: string,
  data: EditFormSchema,
) => {
  try {
    console.log("data", data);

    const school = data.school
      .split(" ")
      .map((word) => word[0].toUpperCase() + word.slice(1))
      .join(" ");

    const today = new Date();
    const birthDate = new Date(data.dateOfBirth);

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    const profileData = {
      ...data,
      firstName: data.firstName[0].toUpperCase() + data.firstName.slice(1),
      lastName: data.lastName[0].toUpperCase() + data.lastName.slice(1),
      school,
      age,
      positions: data.positions as Position[],
    };

    await db.profile.upsert({
      where: { profileId: userId },
      create: {
        profileId: userId,
        ...profileData,
        address: {
          create: { ...data.address },
        },
      },
      update: {
        ...profileData,
        address: {
          update: { ...data.address },
        },
      },
    });

    return { success: "User profile updated successfully!" };
  } catch (error) {
    console.log(error);
    return { error: "Error updating user profile!" };
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

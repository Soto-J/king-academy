"use server";

import db from "@/lib/prismadb";
import { Position, Prisma } from "@prisma/client";
import { EditFormSchema } from "@/schemas";

import { getCurrentUser } from "./user";

const profileWithAddress = Prisma.validator<Prisma.ProfileDefaultArgs>()({
  include: { address: true },
});
export type ProfileWithAddress = Prisma.ProfileGetPayload<
  typeof profileWithAddress
>;

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
        address: { create: data.address },
      },
      update: {
        ...profileData,
        address: { update: data.address },
      },
    });

    return { success: "User profile updated successfully!" };
  } catch (error) {
    console.log(error);
    return { error: "Error updating user profile!" };
  }
};

export const getUserProfile = async (userId: string) => {
  try {
    const user = await getCurrentUser();

    if (!user) return null;

    const profile = await db.profile.findUnique({
      where: { profileId: user.externalId },
      include: { address: true },
    });

    return profile;
  } catch (error) {
    return null;
  }
};

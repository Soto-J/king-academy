"use server";

import db from "@/lib/prismadb";
import { Position, Prisma } from "@prisma/client";

import { EditFormSchema } from "@/schemas";

import { getCurrentUser } from "./user";
import { capitalize, getAge } from "./helper";

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

    const school = capitalize(data.school);
    const firstName = capitalize(data.firstName);
    const lastName = capitalize(data.lastName);
    const age = getAge(data.dateOfBirth);

    const profileData = {
      ...data,
      firstName,
      lastName,
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
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return { error: "Phone number already in use!" };
        throw new Error("Phone number already in use!");
      }
    }

    console.log(error);
    return { error: "Error updating user profile!" };
    throw new Error("Error updating user profile!");
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

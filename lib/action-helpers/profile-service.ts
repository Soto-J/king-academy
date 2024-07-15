import prisma from "@/lib/prismadb";

import { EditFormSchema } from "@/app/(main)/players/_components/edit-profile-form";

import { Position } from "@prisma/client";

export async function editProfile(data: EditFormSchema, userId: string) {
  try {
    const school = data.school
      .split(" ")
      .map((word) => word[0].toUpperCase() + word.slice(1).toLowerCase())
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

    const prismaData = {
      ...data,
      age,
      school,
      address: {
        upsert: {
          create: { ...data.address },
          update: { ...data.address },
        },
      },
      positions: {
        deleteMany: {}, // Remove existing positions
        create: data.positions.map((position) => ({
          position: position as Position,
        })),
      },
    };

    await prisma.user.update({
      where: { id: userId },
      data: prismaData,
    });
  } catch (error) {
    console.log("Failed to update progile", error);
    throw error;
  }
}

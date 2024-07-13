import prisma from "@/lib/prismadb";

import { Position } from "@prisma/client";
import { EditFormSchema } from "../app/(main)/players/_components/form/edit-profile-form";

export async function editUser(data: EditFormSchema, userId: string) {
  try {
    const user = await prisma.user.findFirst({
      where: { externalId: userId },
    });

    if (!user) {
      throw new Error("Unathorized - User not found");
    }

    const updatedUser = await prisma.user.update({
      where: { externalId: userId },
      data: {
        school: data.school,
        batting: data.batting,
        throwing: data.throwing,
        bio: data.bio,
        address: {
          update: {
            street: data.address.street,
            state: data.address.state,
            city: data.address.city,
            zip: data.address.zip,
          },
        },
        positions: {
          deleteMany: {}, // Remove existing positions
          create: data.positions.map((position) => ({
            position: position as Position,
          })),
        },
      },
    });

    if (!updatedUser) {
      throw new Error("Problem editing user data.");
    }

    return updatedUser;
  } catch (error) {
    console.log(error);
    return Promise.reject(error);
  }
}

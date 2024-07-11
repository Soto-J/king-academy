import { Position } from "@prisma/client";
import { EditFormSchema } from "../app/(main)/players/_components/edit-profile-form";
import prisma from "@/lib/prismadb";

export async function editUser(data: EditFormSchema, userId: string) {
  try {
    const user = await prisma.user.findFirst({
      where: { externalId: userId },
    });

    if (!user) {
      return "Unathorized - User not found";
    }
    data.address;
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        school: data.school,
        address: {
          update: {
            street: data.address.street,
            state: data.address.state,
            city: data.address.city,
            zip: data.address.zip,
          },
        },
        // TODO
        positions: {},
        batting: data.batting,
        throwing: data.throwing,
        bio: data.bio,
      },
    });

    return updatedUser;
  } catch (error) {
    console.log(error);
    return Promise.reject(error);
  }
}

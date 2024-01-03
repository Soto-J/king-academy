import { Position } from "@prisma/client";
import { EditFormSchema } from "../(main)/players/_components/edit-profile-form";
import prisma from "@/lib/prismadb";

export async function editUser(
  data: EditFormSchema,
  userPrimaryNumber: string,
) {
  try {
    const user = await prisma.user.findFirst({
      where: {
        phoneNumbers: {
          has: userPrimaryNumber,
        },
      },
    });

    if (!user) {
      return "User not found";
    }

    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        school: data.school,
        address: data.address,
        positions: data.position as Position[],
        batting: data.batting,
        throwing: data.throwing,
        bio: data.bio,
      },
    });

    return updatedUser;
  } catch (error) {
    console.log(error);
    return error;
  }
}

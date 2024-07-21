"use server";

import { revalidatePath } from "next/cache";

import { EditFormSchema } from "@/app/(main)/players/_components/edit-profile-form";

import { editProfile } from "@/lib/action-helpers/profile-service";
import { getCurrentUser } from "@/lib/action-helpers/user-service";

export async function onEditProfile(data: EditFormSchema, userId: string) {
  try {
    const currentUser = await getCurrentUser();

    if (currentUser?.id != userId) {
      throw new Error("Unathorized - User not found");
    }

    await editProfile(data, userId);

    revalidatePath("/players");

    return { message: "Edit Successful" };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

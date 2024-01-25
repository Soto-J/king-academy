"use server";

import { revalidatePath } from "next/cache";

import { EditFormSchema } from "@/schemas";
import { createOrUpdateProfile } from "@/data/profile";

export const onCreateOrUpdateProfile = async (
  userId: string,
  data: EditFormSchema,
) => {
  try {
    const profile = await createOrUpdateProfile(userId, data);

    if (profile.success) {
      revalidatePath("/profile");
    }

    return profile;
  } catch (error) {
    throw error;
  }
};

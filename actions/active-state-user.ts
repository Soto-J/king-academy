"use server";

import { toggleActiveState } from "@/lib/action-helpers/user-service";

import { revalidatePath } from "next/cache";

export async function onToggleActiveState(playerId: string) {
  try {
    await toggleActiveState(playerId);

    revalidatePath("/players");
  } catch (error) {
    throw error;
  }
}

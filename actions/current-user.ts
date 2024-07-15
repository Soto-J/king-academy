"use server";

import { getCurrentUser } from "@/lib/action-helpers/user-service";

export async function onGetCurrentUser() {
  try {
    return await getCurrentUser();
  } catch (error) {
    return null;
  }
}

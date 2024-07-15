"use server";

import { deleteUser } from "@/lib/actoin-helpers/user-service";

export async function onDeleteUser(userId: string) {
  try {
    await deleteUser(userId);

    return { message: "User deleted successfully", userId };
  } catch (error) {
    console.error("Delete User:", error);
    return null;
  }
}

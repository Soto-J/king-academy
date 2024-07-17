"use server";

import { getAlllUsers } from "@/lib/action-helpers/user-service";

export async function onGetAllPlayers() {
  try {
    return await getAlllUsers();
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
}

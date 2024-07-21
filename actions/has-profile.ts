"use server";

import { hasProfile } from "@/lib/action-helpers/profile-service";

export async function onHasProfile() {
  try {
    return await hasProfile();
  } catch (error) {
    return false;
  }
}

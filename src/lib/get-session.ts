import { headers } from "next/headers";
import { auth } from "./auth/auth";

export const getCurrentSession = async () => {
  return await auth.api.getSession({ headers: await headers() });
};

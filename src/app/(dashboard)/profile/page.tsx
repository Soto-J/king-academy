import { redirect } from "next/navigation";
import { headers } from "next/headers";

import { auth } from "@/lib/auth/auth";

import { ProfilePageView } from "@/modules/profile/ui/views/profile-page-view";

const ProfilePage = async () => {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/sign-in");

  return <ProfilePageView />;
};

export default ProfilePage;

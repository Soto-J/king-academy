import { redirect } from "next/navigation";
import { headers } from "next/headers";

import { auth } from "@/lib/auth/auth";

import { PlayersPageView } from "@/modules/players/ui/views/players-page-view";

const PlayersPage = async () => {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/sign-in");

  return <PlayersPageView />;
};

export default PlayersPage;

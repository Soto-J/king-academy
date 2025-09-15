import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getQueryClient, trpc } from "@/trpc/server";

import { auth } from "@/lib/auth/auth";

import { PlayersPageView } from "@/modules/players/ui/views/players-page-view";

const PlayersPage = async () => {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/sign-in");

  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.players.getMany.queryOptions({}));
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<p>Loading...</p>}>
        <ErrorBoundary fallback={<p>Error...</p>}>
          <PlayersPageView />
        </ErrorBoundary>
      </Suspense>
    </HydrationBoundary>
  );
};

export default PlayersPage;

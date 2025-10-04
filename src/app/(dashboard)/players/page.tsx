import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

import { SearchParams } from "nuqs";

import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getQueryClient, trpc } from "@/trpc/server";

import { auth } from "@/lib/auth/auth";

import { loadSearchParams } from "@/modules/players/server/params";

import { PlayersPageView } from "@/modules/players/ui/views/players-page-view";
import { PlayersHeader } from "@/modules/players/ui/components/players-header";

interface PlayersPageProps {
  searchParams: Promise<SearchParams>;
}

const PlayersPage = async ({ searchParams }: PlayersPageProps) => {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/sign-in");

  const filters = await loadSearchParams(searchParams);

  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(
    trpc.players.getMany.queryOptions({ ...filters }),
  );
  return (
    <>
      <PlayersHeader />

      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<p>Loading...</p>}>
          <ErrorBoundary fallback={<p>Error...</p>}>
            <PlayersPageView />
          </ErrorBoundary>
        </Suspense>
      </HydrationBoundary>
    </>
  );
};

export default PlayersPage;

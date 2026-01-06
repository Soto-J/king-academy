import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { redirect } from "next/navigation";

import { SearchParams } from "nuqs";

import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getQueryClient, trpc } from "@/trpc/server";

import { loadSearchParams } from "@/modules/players/params";

import { PlayersPageView } from "@/modules/players/ui/views/players-page-view";
import { PlayersHeader } from "@/modules/players/ui/components/players-header";
import { getCurrentSession } from "@/lib/get-session";

interface PlayersPageProps {
  searchParams: Promise<SearchParams>;
}

const PlayersPage = async ({ searchParams }: PlayersPageProps) => {
  const session = await getCurrentSession();
  if (!session) redirect("/sign-in");

  const isAdmin = session.user.role === "admin";
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
            <PlayersPageView isAdmin={isAdmin} />
          </ErrorBoundary>
        </Suspense>
      </HydrationBoundary>
    </>
  );
};

export default PlayersPage;

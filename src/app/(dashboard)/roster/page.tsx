import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { redirect } from "next/navigation";

import { SearchParams } from "nuqs";

import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getQueryClient, trpc } from "@/trpc/server";

import { getCurrentSession } from "@/lib/get-session";

import { loadSearchParams } from "@/modules/roster/params";

import { RosterPageView } from "@/modules/roster/ui/views/roster-page-view";
import { RosterPageSearchFilter } from "@/modules/roster/ui/components/roster-page-search-filter";

interface RosterPageProps {
  searchParams: Promise<SearchParams>;
}

const RosterPage = async ({ searchParams }: RosterPageProps) => {
  const session = await getCurrentSession();
  if (!session) redirect("/sign-in");

  const isAdmin = session.user.role === "admin";
  const filters = await loadSearchParams(searchParams);

  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(
    trpc.roster.getMany.queryOptions({ ...filters }),
  );

  return (
    <>
      <div className="space-y-8 pb-6">
        <div>
          <h1 className="text-foreground text-3xl font-bold">Roster</h1>
          <p className="text-muted-foreground mt-2">
            Manage and track all players in the King Academy program
          </p>
        </div>

        <RosterPageSearchFilter />
      </div>

      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<p>Loading...</p>}>
          <ErrorBoundary fallback={<p>Error...</p>}>
            <RosterPageView isAdmin={isAdmin} currentUserId={session.user.id} />
          </ErrorBoundary>
        </Suspense>
      </HydrationBoundary>
    </>
  );
};

export default RosterPage;

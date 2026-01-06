import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { redirect } from "next/navigation";

import { SearchParams } from "nuqs";

import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getQueryClient, trpc } from "@/trpc/server";

import { loadSearchParams } from "@/modules/roster/params";

import { RosterPageView } from "@/modules/roster/ui/views/roster-page-view";
import { RosterHeader } from "@/modules/roster/ui/components/roster-header";
import { getCurrentSession } from "@/lib/get-session";

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
      <RosterHeader />

      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<p>Loading...</p>}>
          <ErrorBoundary fallback={<p>Error...</p>}>
            <RosterPageView isAdmin={isAdmin} />
          </ErrorBoundary>
        </Suspense>
      </HydrationBoundary>
    </>
  );
};

export default RosterPage;

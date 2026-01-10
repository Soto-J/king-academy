import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { redirect } from "next/navigation";

import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getQueryClient, trpc } from "@/trpc/server";

import { getCurrentSession } from "@/lib/get-session";

import SchedulePageView from "@/modules/schedule/ui/views/schedule-page-view";

export default async function SchedulePage() {
  const session = await getCurrentSession();
  if (!session) redirect("/sign-in");

  const isAdmin = session.user.role === "admin";

  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.schedule.getMany.queryOptions());
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<p>Loading...</p>}>
        <ErrorBoundary fallback={<p>Error...</p>}>
          <SchedulePageView isAdmin={isAdmin} />
        </ErrorBoundary>
      </Suspense>
    </HydrationBoundary>
  );
}

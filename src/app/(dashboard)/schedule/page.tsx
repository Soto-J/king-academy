import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getQueryClient, trpc } from "@/trpc/server";

import { auth } from "@/lib/auth/auth";

import { SchedulePageView } from "@/modules/schedule/ui/views/schedule-page-view";

const SchedulePage = async () => {
  const session = await auth.api.getSession({ headers: await headers() });
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
};

export default SchedulePage;

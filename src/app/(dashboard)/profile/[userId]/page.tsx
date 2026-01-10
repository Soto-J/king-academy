import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import ProfileIdPageView from "@/modules/profile/ui/views/profile-id-page-view";

interface ProfileIdPageProps {
  params: Promise<{ userId: string }>;
}

export default async function ProfileIdPage({ params }: ProfileIdPageProps) {
  const { userId } = await params;

  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.profile.getOne.queryOptions({ userId }));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<p>Loading...</p>}>
        <ErrorBoundary fallback={<p>Error...</p>}>
          <ProfileIdPageView userId={userId} />
        </ErrorBoundary>
      </Suspense>
    </HydrationBoundary>
  );
}

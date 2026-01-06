import { ProfileIdPageView } from "@/modules/profile/ui/views/profile-id-page-view";

import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

interface ProfileIdPageProps {
  params: Promise<{ userId: string }>;
}

const ProfileIdPage = async ({ params }: ProfileIdPageProps) => {
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
};

export default ProfileIdPage;

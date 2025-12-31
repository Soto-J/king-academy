import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { redirect } from "next/navigation";

import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getQueryClient, trpc } from "@/trpc/server";

import { getCurrentSession } from "@/lib/get-session";

import { ProfilePageView } from "@/modules/profile/ui/views/profile-page-view";

const ProfilePage = async () => {
  const session = await getCurrentSession();
  if (!session) redirect("/sign-in");

  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.profile.getOne.queryOptions({}));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<p>Loading...</p>}>
        <ErrorBoundary fallback={<p>Error...</p>}>
          <ProfilePageView />
        </ErrorBoundary>
      </Suspense>
    </HydrationBoundary>
  );
};

export default ProfilePage;

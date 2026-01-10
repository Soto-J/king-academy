"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";

import Profile from "@/modules/profile/ui/components/profile";

interface ProfileIdPageView {
  userId: string;
}

export default function ProfileIdPageView({ userId }: ProfileIdPageView) {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(
    trpc.profile.getOne.queryOptions({ userId }),
  );

  return <Profile data={data} isOwnProfile={false} />;
}

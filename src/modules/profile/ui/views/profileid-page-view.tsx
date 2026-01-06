"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { Profile } from "../components/profile";
import { useTRPC } from "@/trpc/client";

interface ProfileIdPageView {
  userId: string;
}

export const ProfileIdPageView = ({ userId }: ProfileIdPageView) => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(
    trpc.profile.getOne.queryOptions({ userId }),
  );

  return (
    <div>
      <Profile data={data} isOwnProfile={false} />
    </div>
  );
};

"use client";

import { useState } from "react";

import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";

import EditProfileDialog from "@/modules/profile/ui/components/edit-profile-dialog";
import Profile from "@/modules/profile/ui/components/profile";

export default function ProfilePageView() {
  const [isOpen, setIsOpen] = useState(false);

  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.profile.getOne.queryOptions({}));

  if (!data) {
    return <div>No User Data Found</div>;
  }

  return (
    <>
      <EditProfileDialog
        initialValues={data}
        isOpen={isOpen}
        onCloseDialog={() => setIsOpen(false)}
      />

      <Profile
        data={data}
        isOwnProfile={true}
        onEditClick={() => setIsOpen(true)}
      />
    </>
  );
}

"use client";

import { useState } from "react";

import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";

import { EditProfileDialog } from "../components/edit-profile-dialog";
import { Profile } from "../components/profile";

export const ProfilePageView = () => {
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
        onOpenDialog={isOpen}
        onCloseDialog={() => setIsOpen(false)}
      />

      <Profile
        data={data}
        isOwnProfile={true}
        onEditClick={() => setIsOpen(true)}
      />
    </>
  );
};

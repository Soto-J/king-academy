"use client";

import { useState } from "react";
import { Profile } from "./profile";
import { EditProfileDialog } from "./edit-profile-dialog";
import { ProfileGetOne } from "../../types";

interface ProfileWithEditProps {
  profile: ProfileGetOne;
  isOwnProfile?: boolean;
}

export const ProfileWithEdit = ({
  profile,
  isOwnProfile = false
}: ProfileWithEditProps) => {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const handleEditClick = () => {
    setIsEditDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsEditDialogOpen(false);
  };

  return (
    <>
      <Profile
        profile={profile}
        onEditClick={handleEditClick}
        isOwnProfile={isOwnProfile}
      />

      <EditProfileDialog
        onOpenDialog={isEditDialogOpen}
        onCloseDialog={handleCloseDialog}
        initialValues={profile}
      />
    </>
  );
};
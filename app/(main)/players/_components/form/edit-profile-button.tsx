"use client";

import EditProfileForm from "./edit-profile-form";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { UserWithProfileAndAddress } from "@/data/user";

type EditProfileButtonProps = {
  user: UserWithProfileAndAddress | null;
};

const EditProfileButton = ({ user }: EditProfileButtonProps) => {
  if (!user?.id) {
    return null;
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm">Edit Profile</Button>
      </DialogTrigger>

      <DialogContent className="w-[95%]">
        <ScrollArea className="h-[80vh]">
          <EditProfileForm user={user} />
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfileButton;

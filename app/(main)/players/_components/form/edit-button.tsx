"use client";

import { EditForm } from "./edit-form";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { UserWithProfileAndAddress } from "@/data/user";
import { useState } from "react";

type EditProfileButtonProps = {
  user: UserWithProfileAndAddress | null;
};

export const EditButton = ({ user }: EditProfileButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);

  if (!user?.id) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size="sm">Edit Profile</Button>
      </DialogTrigger>

      <DialogContent className="w-[95%]">
        <ScrollArea className="h-[80vh]">
          <EditForm user={user} setIsOpen={setIsOpen} />
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

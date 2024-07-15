"use client";

import { useState } from "react";

import { User } from "@/lib/action-helpers/user-service";

import PlayerCard from "../player-card";
import EditProfileForm from "../edit-profile-form";

import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type ActionsProps = {
  currentUser: User;
  player: User;
};

export const Actions = ({ currentUser, player }: ActionsProps) => {
  const isCurrentUser = currentUser.id === player.id;
  const [isOpen, setIsOpen] = useState(false);

  const dropdownHandler = () => {
    setIsOpen(false);
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={(isOpen) => setIsOpen(isOpen)}>
      {/* Open Actions dropdown */}
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>

      {/* Displays action content */}
      <DropdownMenuContent align="end">
        <Dialog>
          {/* Opens user profile */}
          <DialogTrigger asChild>
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              View profile
            </DropdownMenuItem>
          </DialogTrigger>

          {/* Displays user profile */}
          <DialogContent className="w-[95%]">
            <ScrollArea className="h-96">
              <PlayerCard player={player} />
            </ScrollArea>
          </DialogContent>
        </Dialog>

        {/* Allows current user to edit profile */}
        {isCurrentUser && (
          <Dialog>
            <DropdownMenuSeparator />

            <DialogTrigger asChild>
              <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                Edit
              </DropdownMenuItem>
            </DialogTrigger>

            {/* Displays Edit form content */}
            <DialogContent>
              <ScrollArea className="h-[80vh]">
                <EditProfileForm
                  user={currentUser}
                  closeDropdown={dropdownHandler}
                />
              </ScrollArea>
            </DialogContent>
          </Dialog>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

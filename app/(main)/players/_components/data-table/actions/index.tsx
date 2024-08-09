"use client";

import { useState } from "react";

import { Role } from "@prisma/client";
import { User } from "@/lib/action-helpers/user-service";

import { MoreHorizontal } from "lucide-react";

import EditProfileAction from "./edit-profile-action";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ToggleActive from "./toggle-active";
import ViewProfileAction from "./view-profile-action";

type ActionsProps = {
  currentUser: User;
  player: User;
};

export const Actions = ({ currentUser, player }: ActionsProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const isCurrentUser = currentUser.id === player.id;
  const isAdmin = currentUser.role === Role.ADMIN;

  const dropdownHandler = () => {
    setIsOpen(false);
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={(isOpen) => setIsOpen(isOpen)}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <ViewProfileAction player={player} />

        <EditProfileAction
          isCurrentUser={isCurrentUser}
          currentUser={currentUser}
          dropdownHandler={dropdownHandler}
        />

        <ToggleActive
          playerId={player.id}
          isAdmin={isAdmin}
          isActive={player.isActive}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

import { useState } from "react";

import { User } from "@/actions/getAllPlayers";

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
import PlayerCard from "../player-card";
import EditProfileForm from "../edit-profile-form";


type ActionsProps = {
  currentUser: User;
  player: User;
};

export const Actions = ({currentUser, player}: ActionsProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const isCurrentUser = currentUser.id === player.id;

  return (
      <DropdownMenu
          // open={}
          // onOpenChange={(isOpen) => setIsOpen(isOpen)}
        >
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <Dialog
            // onOpenChange={(isOpen) => setIsOpen(isOpen)}
            >
              <DialogTrigger asChild>
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                  View profile
                </DropdownMenuItem>
              </DialogTrigger>

              <DialogContent className="w-[95%]">
                <ScrollArea className="h-96">
                  <PlayerCard player={player}  />
                </ScrollArea>
              </DialogContent>
            </Dialog>

            {isCurrentUser && (
              <Dialog
              // onOpenChange={(isOpen) => setIsOpen(isOpen)}
              >
                <DropdownMenuSeparator />
                <DialogTrigger asChild>
                  <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                    Edit
                  </DropdownMenuItem>
                </DialogTrigger>

                <DialogContent>
                  <ScrollArea className="h-[80vh]">
                  <EditProfileForm userId={currentUser.id} />
                  </ScrollArea>
                </DialogContent>
              </Dialog>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
  );
};

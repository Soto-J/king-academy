"use client";

import { useState } from "react";

import "@tanstack/react-table";
import { ColumnDef, RowData } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { type UserWithProfileAndAddress } from "@/data/user";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PlayerCard } from "../player/player-card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { EditForm } from "@/app/(main)/players/_components/form/edit-form";

type Column = {
  id: string;
  status: boolean;
  username: string;
  firstName: string;
  lastName: string;
};

declare module "@tanstack/react-table" {
  // interface ColumnMeta<TData extends RowData, TValue> {
  //   currentUser: UserWithProfileAndAddress;
  // }

  interface CellContext<TData extends RowData, TValue> {
    currentUser: UserWithProfileAndAddress | null;
  }
}

export const Columns: ColumnDef<UserWithProfileAndAddress>[] = [
  {
    accessorKey: "profile.isActive",
    header: "Status",
    cell: ({ row }) => {
      const player = row.original;

      return (
        <div className="flex items-center justify-center">
          <div
            className={`h-3 w-3 rounded-full ${
              player.profile?.isActive || player.profile
                ? "bg-green-500"
                : "bg-red-500"
            }`}
          />
        </div>
      );
    },
  },
  {
    accessorKey: "username",
    header: "User Name",
  },
  {
    accessorKey: "profile.firstName",
    header: "First Name",
    cell: ({ row }) => row.original.profile?.firstName || "",
  },
  {
    accessorKey: "profile.lastName",
    header: "Last Name",
    cell: ({ row }) => row.original.profile?.lastName || "",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row, currentUser }) => {
      const [isOpen, setIsOpen] = useState(false);
      const player = row.original;
      const isUser = player.id === currentUser?.id;

      return (
        <DropdownMenu
          open={isOpen}
          onOpenChange={(isOpen) => setIsOpen(isOpen)}
        >
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <Dialog onOpenChange={(isOpen) => setIsOpen(isOpen)}>
              <DialogTrigger asChild>
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                  View profile
                </DropdownMenuItem>
              </DialogTrigger>

              <DialogContent className="w-[95%]">
                <ScrollArea className="h-96">
                  <PlayerCard player={row.original} />
                </ScrollArea>
              </DialogContent>
            </Dialog>

            {isUser && (
              <Dialog onOpenChange={(isOpen) => setIsOpen(isOpen)}>
                <DropdownMenuSeparator />
                <DialogTrigger asChild>
                  <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                    Edit
                  </DropdownMenuItem>
                </DialogTrigger>

                <DialogContent>
                  <ScrollArea className="h-[80vh]">
                    <EditForm user={row.original} setIsOpen={setIsOpen} />
                  </ScrollArea>
                </DialogContent>
              </Dialog>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

// export default function Columns() {
//   return null;
// }

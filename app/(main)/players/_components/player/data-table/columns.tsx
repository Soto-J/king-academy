"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserWithProfileAndAddress } from "@/data/user";
import { PlayerCard } from "../player-card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CheckHydration } from "@/components/check-hydration";
import dynamic from "next/dynamic";

type Column = {
  id: string;
  status: boolean;
  username: string;
  firstName: string;
  lastName: string;
};

export const columns: ColumnDef<UserWithProfileAndAddress>[] = [
  {
    accessorKey: "profile.isActive" || false,
    header: "Status",
  },
  {
    accessorKey: "username",
    header: "User Name",
  },
  {
    accessorKey: "profile.firstName",
    header: "First Name",
  },
  {
    accessorKey: "profile.lastName",
    header: "Last Name",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <Dialog>
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
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

// export default function Columns() {
//   return null;
// }

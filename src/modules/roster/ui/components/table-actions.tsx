"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { IoPersonOutline } from "react-icons/io5";
import { Ellipsis, Edit, Trash2 } from "lucide-react";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";

import type { RosterGetOne } from "@/modules/roster/types";

import { authClient } from "@/lib/auth/auth-client";

import { useConfirm } from "@/hooks/use-confirm";
import { useRosterFilters } from "@/modules/roster/hooks/use-roster-filter";

import { EditPlayerDialog } from "@/modules/roster/ui/components/edit-player-dialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface TableActionsProps {
  player: RosterGetOne;
}

export const TableActions = ({ player }: TableActionsProps) => {
  const [ConfirmationDialog, confirmDelete] = useConfirm({
    title: "Delete Member Account",
    description:
      "This will permanently remove the member and all associated data. This action cannot be undone.",
  });

  const [openDialog, setOpenDialog] = useState(false);
  const router = useRouter();
  const [filters, setFilters] = useRosterFilters();

  const { data } = authClient.useSession();

  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const deleteUser = useMutation(
    trpc.roster.deleteOne.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(
          trpc.roster.getMany.queryOptions({ ...filters }),
        );
      },
      onError: (error) => console.error(error.message),
    }),
  );


  const onDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    const Ok = await confirmDelete();

    if (!Ok) {
      return;
    }

    deleteUser.mutate({ userId: player.id });
  };


  const routeTo =
    data?.session.userId === player.id ? `/profile` : `/profile/${player.id}`;

  return (
    <>
      <EditPlayerDialog
        onOpenDialog={openDialog}
        onCloseDialog={() => setOpenDialog(false)}
        initialValues={player}
      />

      <ConfirmationDialog />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="z-99 h-8 w-8 p-0 hover:bg-zinc-800/50"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
            }}
          >
            <span className="sr-only">Open menu</span>
            <Ellipsis className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="start"
          className="w-48 border-zinc-800 bg-zinc-900/95 backdrop-blur-sm"
        >
          <DropdownMenuGroup>
            <DropdownMenuItem
              onClick={() => router.push(routeTo)}
              className="group z-99 cursor-pointer text-zinc-300 focus:bg-zinc-800"
            >
              <IoPersonOutline className="mr-2 h-4 w-4 group-focus:text-zinc-300" />
              <span className="group-focus:text-zinc-300">View Profile</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>

          <DropdownMenuGroup>
            <DropdownMenuItem
              onClick={() => setOpenDialog(true)}
              className="group z-99 cursor-pointer text-zinc-300 focus:bg-zinc-800"
            >
              <Edit className="mr-2 h-4 w-4 group-focus:text-zinc-300" />
              <span className="group-focus:text-zinc-300">Edit Member</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>

          <DropdownMenuSeparator className="bg-zinc-800" />

          <DropdownMenuGroup>
            <DropdownMenuItem
              className="group z-99 cursor-pointer text-red-400 focus:bg-red-500/20 focus:text-red-600"
              onClick={onDelete}
            >
              <Trash2 className="mr-2 h-4 w-4 group-focus:text-red-600" />
              <span className="group-focus:text-red-600">Delete Member</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

"use client";

import "@tanstack/react-table";

import { ColumnDef } from "@tanstack/react-table";

import { User } from "@/lib/action-helpers/user-service";

import { Actions } from "./actions";
import { cn } from "@/lib/utils";

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "isActive",
    header: "Status",
    cell: ({ row }) => {
      return (
        <div
          className={cn(
            "mx-auto h-6 w-6 rounded-full",
            row.original.isActive ? "bg-primary" : "bg-secondary",
          )}
        />
      );
    },
  },
  {
    accessorKey: "username",
    header: "Username",
  },
  {
    accessorKey: "firstName",
    header: "First Name",
  },
  {
    accessorKey: "lastName",
    header: "Last Name",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row, currentUser }) => (
      <Actions player={row.original} currentUser={currentUser} />
    ),
  },
];

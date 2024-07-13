"use client";

import "@tanstack/react-table";

import { ColumnDef, RowData } from "@tanstack/react-table";

import { User } from "@/actions/getAllPlayers";

import { Actions } from "./actions";

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "isActive",
    header: "Status",
    cell: ({ row }) => {},
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

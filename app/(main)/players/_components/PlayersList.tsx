"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";

import { User } from "@prisma/client";

import { Player } from "./player";

import { Dialog } from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type PlayersListProps = {
  players: User[];
  currentUser: User;
};

const PlayersList = ({ players, currentUser }: PlayersListProps) => {
  const [isHydrated, setIsHydrated] = useState(false);

  const { user } = useUser();

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    return null;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          {["First Name", "Last Name", "Active", "Player Card"].map((label) => (
            <TableHead key={label}>{label}</TableHead>
          ))}
        </TableRow>
      </TableHeader>

      <TableBody>
        {players.map((player) => (
          <Dialog key={player.id}>
            <Player player={player} currentUser={currentUser} />
          </Dialog>
        ))}
      </TableBody>
    </Table>
  );
};

export default PlayersList;

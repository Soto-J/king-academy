"use client";

import { User } from "@prisma/client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";

type PlayersListProps = {
  players: User[];
};

const PlayersList = ({ players }: PlayersListProps) => {
  const [isHydrated, setIsHydrated] = useState(false);

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
          <TableHead>First Name</TableHead>
          <TableHead>Last Name</TableHead>
          <TableHead>School</TableHead>
          <TableHead>Age</TableHead>
          <TableHead>Active</TableHead>
          <TableHead>Player Card</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {players.map((player) => (
          <Dialog key={player.id}>
            <TableRow key={player.id}>
              <TableCell>{player.firstName}</TableCell>
              <TableCell>{player.lastName}</TableCell>
              <TableCell>{player.school}</TableCell>
              <TableCell>{player.school}</TableCell>
              <TableCell>Yes</TableCell>
              <DialogTrigger asChild>
                <TableCell>More Info</TableCell>
              </DialogTrigger>
            </TableRow>

            <DialogContent>
              <DialogHeader>
                <DialogTitle>Hello World</DialogTitle>
                <DialogDescription>Description</DialogDescription>
              </DialogHeader>

              <div>
                <div>School:</div>
                <div>Age:</div>
                <div>Active:</div>
                <div>
                  Positions:
                  {player.positions.map((position) => (
                    <div>{position}</div>
                  ))}
                </div>
              </div>
            </DialogContent>
          </Dialog>
        ))}
      </TableBody>
    </Table>
  );
};

export default PlayersList;

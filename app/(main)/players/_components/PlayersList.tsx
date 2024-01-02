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
import { useUser } from "@clerk/nextjs";

type PlayersListProps = {
  players: User[];
};

const PlayersList = ({ players }: PlayersListProps) => {
  const [isHydrated, setIsHydrated] = useState(false);

  const { user } = useUser();

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    return null;
  }

  const userPrimaryPhoneNumber = user?.primaryPhoneNumber?.phoneNumber || "";

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>First Name</TableHead>
          <TableHead>Last Name</TableHead>
          <TableHead>Active</TableHead>
          <TableHead>Player Card</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {players.map((player) => (
          <Dialog key={player.id}>
            <TableRow>
              <TableCell>{player.firstName}</TableCell>
              <TableCell>{player.lastName}</TableCell>
              <TableCell>Yes</TableCell>
              <DialogTrigger asChild>
                <TableCell>
                  {player.phoneNumbers.includes(userPrimaryPhoneNumber)
                    ? "Edit"
                    : "More Info"}
                </TableCell>
              </DialogTrigger>
            </TableRow>

            <DialogContent className="w-[95%]">
              <DialogHeader>
                <DialogTitle>{`${player.firstName} ${player.lastName}`}</DialogTitle>
                <DialogDescription>Player Card</DialogDescription>
              </DialogHeader>

              <div className="space-y-3 py-4">
                <div>School:</div>
                <div>Age:</div>
                <div>Address:</div>
                <div>
                  Email:{" "}
                  {player.emails.map((email) => (
                    <div key={player.id}>{email}</div>
                  ))}
                </div>
                <div>Active:</div>
                <div>Batting:</div>
                <div>Throwing:</div>
                <div>
                  Positions:
                  {player.positions.map((position) => (
                    <div key={player.id}>{position}</div>
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

"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";

import { User } from "@prisma/client";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";

import EditProfileForm from "@/app/(main)/players/_components/edit-profile-form";
import PlayerCard from "./player-card";

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
                <TableCell className="cursor-pointer">
                  {player.phoneNumbers.includes(userPrimaryPhoneNumber)
                    ? "Edit"
                    : "More Info"}
                </TableCell>
              </DialogTrigger>
            </TableRow>

            {player.phoneNumbers.includes(userPrimaryPhoneNumber) ? (
              <DialogContent>
                <ScrollArea className="h-96">
                  <EditProfileForm />
                </ScrollArea>
              </DialogContent>
            ) : (
              <DialogContent className="w-[95%]">
                <ScrollArea className="h-96">
                  <PlayerCard player={player} />
                </ScrollArea>
              </DialogContent>
            )}
          </Dialog>
        ))}
      </TableBody>
    </Table>
  );
};

export default PlayersList;

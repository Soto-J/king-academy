"use client";

import { useEffect, useState } from "react";
import { type UserWithProfile } from "@/data/user";

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

import EditProfileForm from "@/app/(main)/players/_components/form/edit-profile-form";
import PlayerCard from "./player-card";

type PlayersListProps = {
  players: UserWithProfile[];
  user: UserWithProfile | null;
};

const PlayersList = ({ players, user }: PlayersListProps) => {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    return null;
  }

  if (!players.length) {
    return <p>No players found</p>;
  }

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
              <TableCell>{player.profile?.firstName}</TableCell>
              <TableCell>{player.profile?.lastName}</TableCell>
              <TableCell>Yes</TableCell>
              <DialogTrigger asChild>
                <TableCell className="cursor-pointer">
                  {player.id === user?.id ? "Edit" : "More Info"}
                </TableCell>
              </DialogTrigger>
            </TableRow>

            {player.id === user?.id ? (
              <DialogContent className="w-[95%]">
                <ScrollArea className="h-[80vh]">
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

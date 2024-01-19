import { type UserWithProfileAndAddress } from "@/data/user";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { PlayerCard } from "./player-card";

type PlayersListProps = {
  players: UserWithProfileAndAddress[];
};

export const PlayersList = ({ players }: PlayersListProps) => {
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
                  <Button size="sm" variant="link" className="text-sm">
                    View
                  </Button>
                </TableCell>
              </DialogTrigger>
            </TableRow>

            <DialogContent className="w-[95%]">
              <ScrollArea className="h-96">
                <PlayerCard player={player} />
              </ScrollArea>
            </DialogContent>
          </Dialog>
        ))}
      </TableBody>
    </Table>
  );
};

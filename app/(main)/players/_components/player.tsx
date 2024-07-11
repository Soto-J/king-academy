import EditProfileForm from "./edit-profile-form";
import PlayerCard from "./player-card";

import { User } from "@/actions/getAllPlayers";

import { DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { TableRow, TableCell } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";

type PlayerProps = {
  player: User;
  currentUser: User;
};

export const Player = ({ player, currentUser }: PlayerProps) => {
  const isCurrentPlayer = player.id == currentUser.id;
  const action = isCurrentPlayer ? "Edit" : "More Info";

  return (
    <>
      <TableRow>
        <TableCell>{player.firstName}</TableCell>
        <TableCell>{player.lastName}</TableCell>
        <TableCell>Yes</TableCell>
        <DialogTrigger asChild>
          <TableCell className="cursor-pointer">{action}</TableCell>
        </DialogTrigger>
      </TableRow>

      <DialogContent className={isCurrentPlayer ? "" : `w-[95%]`}>
        <ScrollArea className="h-96">
          {isCurrentPlayer ? (
            <EditProfileForm userId={currentUser.id} />
          ) : (
            <PlayerCard player={player} />
          )}
        </ScrollArea>
      </DialogContent>
    </>
  );
};

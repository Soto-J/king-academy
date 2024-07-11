import { User } from "@prisma/client";

import EditProfileForm from "./edit-profile-form";
import PlayerCard from "./player-card";

import { DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { TableRow, TableCell } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";

type PlayerProps = {
  player: User;
  currentUser: User;
};

export const Player = ({ player, currentUser }: PlayerProps) => {
  const isPlayer = player.id == currentUser.id;
  const action = isPlayer ? "Edit" : "More Info";

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

      <DialogContent className={isPlayer ? "" : `w-[95%]`}>
        <ScrollArea className="h-96">
          {isPlayer ? <EditProfileForm /> : <PlayerCard player={player} />}
        </ScrollArea>
      </DialogContent>
    </>
  );
};

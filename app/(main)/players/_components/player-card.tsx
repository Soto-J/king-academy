import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { User } from "@prisma/client";

type PlayerCardProps = {
  player: User;
};

const PlayerCard = ({ player }: PlayerCardProps) => {
  return (
    <>
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
    </>
  );
};

export default PlayerCard;

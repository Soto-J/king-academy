import { User } from "@/actions/getAllPlayers";

import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

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
        <div>School: {player.school}</div>
        <div>Age: {player.age}</div>
        <div>Address: </div>
        <div>Email: {player.email}</div>
        <div>Active: {player.isActive}</div>
        <div>Batting: {player.batting}</div>
        <div>Throwing: {player.throwing}</div>
        <div>
          Positions:
          {player.positions.map((position) => (
            <div key={player.id}>{position.position}</div>
          ))}
        </div>
      </div>
    </>
  );
};

export default PlayerCard;

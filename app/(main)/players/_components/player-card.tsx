import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { type UserWithProfileAndAddress } from "@/data/user";

type PlayerCardProps = {
  player: UserWithProfileAndAddress;
};

const PlayerCard = ({ player }: PlayerCardProps) => {
  if (!player.profile) {
    return <div>Player has no profile.</div>;
  }

  return (
    <>
      <DialogHeader>
        <DialogTitle>{`${player.profile.firstName} ${player.profile.lastName}`}</DialogTitle>
        <DialogDescription>Player Card</DialogDescription>
      </DialogHeader>

      <div className="space-y-3 py-4">
        <div>School: {player.profile.school}</div>
        <div>Age: {player.profile.age}</div>
        <div>
          Address:
          <div>City: {player.profile.address?.city}</div>
          <div>State: {player.profile.address?.state}</div>
          <div>Zip: {player.profile.address?.zip}</div>
          <div>Street: {player.profile.address?.street}</div>
        </div>
        <div>Email: {player.email}</div>
        <div>Active: {player.profile.isActive}</div>
        <div>Batting: {player.profile.batting}</div>
        <div>Throwing: {player.profile.throwing}</div>
        <div>
          Positions:
          {player.profile.positions.map((position) => (
            <div key={player.id}>{position}</div>
          ))}
        </div>
      </div>
    </>
  );
};

export default PlayerCard;

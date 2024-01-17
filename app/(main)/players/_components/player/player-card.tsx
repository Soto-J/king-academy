import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { UserAvatar } from "@/components/user-avatar";
import { type UserWithProfileAndAddress } from "@/data/user";
import { PlayerAddress } from "./player-address";

type PlayerCardProps = {
  player: UserWithProfileAndAddress;
};

export const PlayerCard = ({ player }: PlayerCardProps) => {
  if (!player.profile) {
    return <div>Player has no profile.</div>;
  }

  return (
    <>
      <DialogHeader>
        <UserAvatar
          username={player.username}
          imageUrl={player.imageUrl}
          className="mx-auto"
          size="lg"
        />

        <DialogTitle className="pt-4">{`${player.profile.firstName} ${player.profile.lastName}`}</DialogTitle>
        <DialogDescription>{player.username}</DialogDescription>
      </DialogHeader>

      <div className="space-y-3 py-4 [&>div>p]:font-light [&>div>span]:font-bold [&>div>span]:text-primary [&>div]:flex [&>div]:gap-x-2">
        <div>
          <span>Active:</span>
          <p>{player.profile.isActive}</p>
        </div>

        <div>
          <span className="font-bold text-primary">School:</span>
          <p>{player.profile.school}</p>
        </div>

        <div>
          <span className="font-bold text-primary">Age:</span>
          <p>{player.profile.age}</p>
        </div>

        <div>
          <span className="font-bold text-primary">Email:</span>
          <p>{player.email}</p>
        </div>

        <div>
          <span className="font-bold text-primary">Batting:</span>
          <p className="capitalize">{player.profile.batting.toLowerCase()}</p>
        </div>

        <div>
          <span className="font-bold text-primary">Throwing:</span>
          <p className="capitalize">
            {player.profile.throwing.toLocaleLowerCase()}
          </p>
        </div>

        <div>
          <span>Positions:</span>
          <ul className="flex flex-wrap gap-x-2">
            {player.profile.positions.map((position, i) => (
              <li key={position} className="capitalize">
                {position.toLowerCase() +
                  (player.profile && i !== player.profile.positions.length - 1
                    ? ","
                    : "")}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

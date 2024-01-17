import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { UserAvatar } from "@/components/user-avatar";
import { type UserWithProfileAndAddress } from "@/data/user";

import { Mail, School } from "lucide-react";
import { FaBaseballBatBall } from "react-icons/fa6";
import { GiThrowingBall } from "react-icons/gi";
import { CiMail } from "react-icons/ci";
import { FaSchool } from "react-icons/fa";
import { FaBirthdayCake } from "react-icons/fa";
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

      <div className="space-y-5 py-4 [&>div>p]:font-light [&>div>span]:font-bold [&>div>span]:text-primary [&>div]:flex [&>div]:items-center [&>div]:gap-x-4">
        <div>
          <span>
            <FaSchool className="h-6 w-6" />
          </span>
          <p>{player.profile.school}</p>
        </div>

        <div>
          <span className="font-bold text-primary">
            <FaBirthdayCake className="h-6 w-6" />
          </span>
          <p>
            {player.profile.age}, {player.profile.dateOfBirth}
          </p>
        </div>

        <div>
          <span>
            <CiMail className="h-6 w-6" />
          </span>
          <p>{player.email}</p>
        </div>

        <div>
          <span>
            <FaBaseballBatBall className="h-6 w-6" />
          </span>
          <p className="capitalize">{player.profile.batting.toLowerCase()}</p>
        </div>

        <div>
          <span>
            <GiThrowingBall className="h-6 w-6" />
          </span>
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

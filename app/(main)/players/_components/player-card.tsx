import { User } from "@/actions/getAllPlayers";

import { FaBaseballBatBall } from "react-icons/fa6";
import { GiThrowingBall } from "react-icons/gi";
import { CiMail } from "react-icons/ci";
import { FaSchool } from "react-icons/fa";
import { FaBirthdayCake } from "react-icons/fa";

import { UserAvatar } from "@/components/user-avatar";

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
        <UserAvatar
          username={player.username}
          imageUrl={player.imageUrl || ""}
          className="mx-auto"
          size="lg"
        />

        <DialogTitle className="pt-4">{`${player.firstName} ${player.lastName}`}</DialogTitle>
        <DialogDescription>{player.username}</DialogDescription>
      </DialogHeader>

      <div className="space-y-5 py-4 [&>div>p]:font-light [&>div>span]:font-bold [&>div>span]:text-primary [&>div]:flex [&>div]:items-center [&>div]:gap-x-4">
        <div>
          <span>
            <FaSchool className="h-6 w-6" />
          </span>
          <p>{player.school}</p>
        </div>

        <div>
          <span className="font-bold text-primary">
            <FaBirthdayCake className="h-6 w-6" />
          </span>
          <p>
            {player.age}, {player.dateOfBirth}
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
          <p className="capitalize">{player.batting?.toLowerCase()}</p>
        </div>

        <div>
          <span>
            <GiThrowingBall className="h-6 w-6" />
          </span>
          <p className="capitalize">{player.throwing?.toLowerCase()}</p>
        </div>

        <div>
          <span>Positions:</span>
          <ul className="flex flex-wrap gap-x-2">
            {player.positions.map((position, i) => (
              <li key={position.id} className="capitalize">
                {position.position.toLowerCase() +
                  (i !== player.positions.length - 1
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

export default PlayerCard;

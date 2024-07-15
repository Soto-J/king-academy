import { User } from "@/lib/action-helpers/user-service";

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
  const infoItems = [
    { icon: FaSchool, label: player.school },
    {
      icon: FaBirthdayCake,
      label: `${player.age}, ${player.dateOfBirth}`,
    },
    { icon: CiMail, label: player.email },
    {
      icon: FaBaseballBatBall,
      label: player.batting?.toLowerCase(),
      className: "capitalize",
    },
    {
      icon: GiThrowingBall,
      label: player.throwing?.toLowerCase(),
      className: "capitalize",
    },
  ];

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

      <div className="space-y-5 py-4">
        {infoItems.map(({ icon: Icon, label, className = "" }, idx) => (
          <div key={idx} className="flex items-center gap-x-4">
            <span className="font-bold text-primary">
              <Icon className="h-6 w-6" />
            </span>
            <p className={className}>{label}</p>
          </div>
        ))}

        <div className="flex items-center gap-x-4">
          <span>Positions:</span>
          <ul className="flex flex-wrap gap-x-2">
            {player.positions.map((position, i) => (
              <li key={position.id} className="capitalize">
                {position.position.toLowerCase() +
                  (i !== player.positions.length - 1 ? "," : "")}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default PlayerCard;

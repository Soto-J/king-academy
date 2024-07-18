import { cn } from "@/lib/utils";
import { User } from "@/lib/action-helpers/user-service";

import { Role } from "@prisma/client";

import { FaMobileAlt } from "react-icons/fa";
import { FaBaseballBatBall } from "react-icons/fa6";
import { FaSchool } from "react-icons/fa";
import { FaBirthdayCake } from "react-icons/fa";
import { GiThrowingBall } from "react-icons/gi";
import { MdEmail } from "react-icons/md";

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
  const isAdmin = player.role === Role.ADMIN;

  const infoItems = [
    { label: "School", icon: FaSchool, data: player?.school || "" },
    {
      label: "Phone",
      icon: FaMobileAlt,
      data: `${player?.phoneNumber}` || "",
      className: isAdmin ? "" : "hidden",
    },
    {
      label: "Address",
      icon: FaMobileAlt,
      data: player.address
        ? `${player.address.street}, ${player.address.city}, ${player.address.state}, ${player.address.zip}`
        : "",
      className: isAdmin ? "" : "hidden",
    },
    {
      label: "Age",
      icon: FaBirthdayCake,
      data: `${player?.age || "0"}, ${player.dateOfBirth || ""}`,
    },
    { label: "Email", icon: MdEmail, data: player.email },
    {
      label: "Batting Orientation",
      icon: FaBaseballBatBall,
      data: player.batting?.toLowerCase() || "",
      className: "capitalize",
    },
    {
      label: "Throwing Orientation",
      icon: GiThrowingBall,
      data: player.throwing?.toLowerCase() || "",
      className: "capitalize",
    },
  ];

  return (
    <>
      <DialogHeader className="items-center">
        <UserAvatar
          username={player.username}
          imageUrl={player.imageUrl || ""}
          className="h-20 w-20 md:h-24 md:w-24"
        />

        <DialogTitle className="pt-4 text-xl">{`${player.firstName} ${player.lastName}`}</DialogTitle>
        <DialogDescription>@{player.username}</DialogDescription>
      </DialogHeader>

      <div className="space-y-6 py-10">
        {infoItems.map(({ icon: Icon, label, data, className = "" }, idx) => (
          <div key={idx} className={cn("flex items-center gap-x-4", className)}>
            <span className="font-bold text-primary">
              <Icon className="h-8 w-8" />
            </span>

            <div className="flex gap-x-2">
              <p className="font-semibold">{label}:</p>
              <p className="font-light">{data}</p>
            </div>
          </div>
        ))}

        <div className="flex items-center gap-x-4">
          <h4>Positions:</h4>

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

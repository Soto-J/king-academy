import { ProfileWithAddress } from "@/data/profile";
import { Position, UserAddress } from "@prisma/client";

type PlayerInfoProps = {
  label: string;
  playerInfo:
    | string
    | number
    | boolean
    | Date
    | Position[]
    | UserAddress
    | null;
};

export const PlayerInfo = ({ label, playerInfo }: PlayerInfoProps) => {
  return (
    <div className="flex gap-x-2">
      <span className="font-bold">{label}:</span>
      <p>{}</p>
    </div>
  );
};

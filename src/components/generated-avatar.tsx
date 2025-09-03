import { cn } from "@/lib/utils";

import { createAvatar } from "@dicebear/core";
import { botttsNeutral, initials } from "@dicebear/collection";

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface GeneratedAvatarProps {
  seed: string;
  variant: "botttsNeutral" | "initials";
  className?: string;
}

export const GeneratedAvatar = ({
  seed,
  variant,
  className,
}: GeneratedAvatarProps) => {
  const avatar =
    variant === "botttsNeutral"
      ? createAvatar(botttsNeutral, { seed })
      : createAvatar(initials, { seed, fontWeight: 500, fontSize: 42 });

  return (
    <Avatar className={cn(className)}>
      <AvatarImage src={avatar.toDataUri()} />
      <AvatarFallback>{seed.charAt(0).toUpperCase()}</AvatarFallback>
    </Avatar>
  );
};

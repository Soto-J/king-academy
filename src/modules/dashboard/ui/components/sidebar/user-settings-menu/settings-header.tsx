import { GeneratedAvatar } from "@/components/generated-avatar";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { SessionData } from "@/lib/auth/auth";
import { ChevronDownIcon } from "lucide-react";

interface UserIdentityProps {
  session: SessionData;
}

export const UserIdentity = ({ session }: UserIdentityProps) => {
  const displayAvatar = session.user.image ? (
    <Avatar>
      <AvatarImage src={session.user.image} />
    </Avatar>
  ) : (
    <GeneratedAvatar
      seed={session.user.name}
      variant="initials"
      className="size-8"
    />
  );

  return (
    <>
      {displayAvatar}

      <div className="flex min-w-0 flex-1 flex-col gap-0.5 overflow-hidden text-left">
        <p className="w-full truncate text-sm capitalize">
          {session.user.name}
        </p>
        <p className="w-full truncate text-xs">{session.user.email}</p>
      </div>

      <ChevronDownIcon className="size-4 shrink-0" />
    </>
  );
};

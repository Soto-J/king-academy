import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const avatarSizes = cva("", {
  variants: {
    size: {
      default: "h-10 w-10",
      sm: "h-8 w-8",
      md: "h-12 w-12",
      lg: "h-16 w-16",
      xl: "h-20 w-20",
      "2xl": "h-24 w-24",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

type UserAvatarProps = {
  username: string;
  imageUrl: string;
  className?: string;
} & VariantProps<typeof avatarSizes>;

export const UserAvatar = ({
  username,
  imageUrl,
  className,
  size,
}: UserAvatarProps) => {
  return (
    <div>
      <Avatar className={cn(avatarSizes({ size }), className)}>
        <AvatarImage src={imageUrl} />

        <AvatarFallback>
          {username[0]}
          {username.at(-1)}
        </AvatarFallback>
      </Avatar>
    </div>
  );
};

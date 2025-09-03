"use client";

import { useRouter } from "next/navigation";

import { authClient } from "@/lib/auth-client";

import { ChevronDownIcon, LogOutIcon } from "lucide-react";

import { useIsMobile } from "@/hooks/use-mobile";

import { GeneratedAvatar } from "@/components/generated-avatar";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

export const DashboardUserButton = () => {
  const router = useRouter();
  const isMobile = useIsMobile();
  const { data: session, isPending } = authClient.useSession();

  const onSignout = () => {
    authClient.signOut({
      fetchOptions: {
        onSuccess: () => router.push("/sign-in"),
      },
    });
  };

  if (isPending || !session?.user) {
    return <div>Loading...</div>;
  }

  if (isMobile) {
    return (
      <Drawer>
        <DrawerTrigger className="border-border/10 flex w-full items-center justify-between gap-x-2 overflow-hidden rounded-lg border bg-white/5 p-3 hover:bg-white/10">
          {session.user.image ? (
            <Avatar>
              <AvatarImage src={session.user.image} />
            </Avatar>
          ) : (
            <GeneratedAvatar
              seed={session.user.name}
              variant="initials"
              className="size-8"
            />
          )}
          <div className="flex min-w-0 flex-1 flex-col gap-0.5 overflow-hidden text-left">
            <p className="w-full truncate text-sm capitalize">
              {session.user.name}
            </p>
            <p className="w-full truncate text-xs">{session.user.email}</p>
          </div>
          <ChevronDownIcon className="size-4 shrink-0" />
        </DrawerTrigger>

        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle className="capitalize">
              {session.user.name}
            </DrawerTitle>
            <DrawerDescription>{session.user.email}</DrawerDescription>
          </DrawerHeader>

          <DrawerFooter>
            <Button variant="outline" onClick={onSignout}>
              <LogOutIcon className="size-4 text-black" />
              <span>Logout</span>
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="border-border/10 flex w-full items-center justify-between gap-x-2 overflow-hidden rounded-lg border bg-white/5 p-3 hover:bg-white/10">
        {session.user.image ? (
          <Avatar>
            <AvatarImage src={session.user.image} />
          </Avatar>
        ) : (
          <GeneratedAvatar
            seed={session.user.name}
            variant="initials"
            className="size-8"
          />
        )}

        <div className="flex min-w-0 flex-1 flex-col gap-0.5 overflow-hidden text-left">
          <p className="w-full truncate text-sm capitalize">
            {session.user.name}
          </p>
          <p className="w-full truncate text-xs">{session.user.email}</p>
        </div>

        <ChevronDownIcon className="size-4 shrink-0" />
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" side="right" className="w-72">
        <DropdownMenuLabel>
          <div className="flex flex-col gap-1">
            <span className="truncate font-medium capitalize">
              {session.user.name}
            </span>
            <span className="text-muted-foreground truncate text-sm font-normal">
              {session.user.email}
            </span>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator className="my-1" />

        <DropdownMenuItem
          onClick={onSignout}
          className="flex cursor-pointer items-center justify-between"
        >
          <span>Logout</span>
          <LogOutIcon className="size-4" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

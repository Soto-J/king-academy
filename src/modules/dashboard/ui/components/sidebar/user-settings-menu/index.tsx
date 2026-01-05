"use client";

import { useRouter } from "next/navigation";

import { LogOutIcon } from "lucide-react";

import { useIsMobile } from "@/hooks/use-mobile";
import { authClient } from "@/lib/auth/auth-client";

import type { SessionData } from "@/lib/auth/auth";

import { AvatarUpload } from "@/components/avatar-upload";

import { UserIdentity } from "./settings-header";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";

interface UserSettingsMenuProps {
  session: SessionData | null;
}

export const UserSettingsMenu = ({ session }: UserSettingsMenuProps) => {
  const router = useRouter();
  const isMobile = useIsMobile();

  if (!session) {
    return (
      <Button className="w-full" onClick={() => router.push("/sign-in")}>
        Sign In
      </Button>
    );
  }

  const onSignout = () => {
    authClient.signOut({
      fetchOptions: {
        onSuccess: () => router.push("/sign-in"),
      },
    });
  };

  if (isMobile) {
    return (
      <Drawer>
        <DrawerTrigger className="border-border/10 flex w-full items-center justify-between gap-x-2 overflow-hidden rounded-lg border bg-white/5 p-3 hover:bg-white/10">
          <UserIdentity session={session} />
        </DrawerTrigger>

        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle className="capitalize">
              {session.user.name}
            </DrawerTitle>
            <DrawerDescription>{session.user.email}</DrawerDescription>
          </DrawerHeader>

          <Separator className="mb-4" />

          <AvatarUpload />

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
        <UserIdentity session={session} />
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

        <DropdownMenuSeparator className="my-4" />

        <DropdownMenuItem
          onSelect={(e) => e.preventDefault()}
          className="flex cursor-pointer items-center justify-center"
        >
          <AvatarUpload />
        </DropdownMenuItem>

        <DropdownMenuSeparator className="my-2" />

        <DropdownMenuItem
          onClick={onSignout}
          className="flex cursor-pointer items-center justify-between py-2"
        >
          <span>Logout</span>
          <LogOutIcon className="size-4" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

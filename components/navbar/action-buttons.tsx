import { getCurrentUser } from "@/data/user";

import { ModeToggle } from "@/components/mode-toggle";

import { UserButton } from "@clerk/nextjs";

import { Link } from "@nextui-org/link";
import { NavbarItem } from "@nextui-org/navbar";

import { Button } from "@/components/ui/button";
import { User } from "@prisma/client";

type ActionButtonsProps = {
  user: User | null;
};

export const ActionButtons = ({ user }: ActionButtonsProps) => {
  if (user) {
    return (
      <NavbarItem>
        <UserButton afterSignOutUrl="/" />
      </NavbarItem>
    );
  }

  return (
    <>
      <NavbarItem className="hidden lg:flex">
        <Link href="/sign-up">Login</Link>
      </NavbarItem>
      <NavbarItem>
        <Button>Sign Up</Button>
      </NavbarItem>
      <NavbarItem className="hidden sm:block">
        <ModeToggle />
      </NavbarItem>
    </>
  );
};

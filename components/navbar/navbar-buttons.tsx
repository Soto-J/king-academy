import Link from "next/link";

import { getCurrentUser } from "@/data/user";

import { UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

export const NavbarButtons = async () => {
  const user = await getCurrentUser();

  if (!user) {
    return (
      <>
        <Button asChild>
          <Link href="/sign-up">Sign up</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/sign-in">Log in</Link>
        </Button>
      </>
    );
  }

  return <UserButton afterSignOutUrl="/" />;
};

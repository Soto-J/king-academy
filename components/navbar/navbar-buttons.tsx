import Link from "next/link";
import { UserButton } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";
import { currentUser } from "@clerk/nextjs/server";

export const NavbarButtons = async () => {
  const user = await currentUser();

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

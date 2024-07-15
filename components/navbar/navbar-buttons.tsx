import Link from "next/link";

import { UserButton, useUser } from "@clerk/nextjs";

import { Button } from "../ui/button";

const NavbarActions = () => {
  const { isSignedIn } = useUser();

  if (!isSignedIn) {
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

  return (
    <UserButton
      afterSignOutUrl="/"
      appearance={{ elements: { avatarBox: "w-10 h-10" } }}
    />
  );
};

export default NavbarActions;

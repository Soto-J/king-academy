import { UserButton, useUser } from "@clerk/nextjs";
import { Button } from "../ui/button";
import Link from "next/link";

const NavbarButtons = () => {
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
    <Button asChild>
      <UserButton afterSignOutUrl="/" />
    </Button>
  );
};

export default NavbarButtons;

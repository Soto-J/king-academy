import Link from "next/link";
import { auth, signOut } from "@/auth";
import { Button } from "../ui/button";

const NavbarButtons = async () => {
  const session = await auth();

  if (!session) {
    return (
      <>
        <Button asChild>
          <Link href="/auth/register">Sign up</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/auth/login">Log in</Link>
        </Button>
      </>
    );
  }

  return (
    <form
      action={async () => {
        "use server";

        await signOut({ redirectTo: "/" });
      }}
    >
      <Button type="submit">Sign out</Button>
    </form>
  );
};

export default NavbarButtons;

"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";

const SignUpLogInButtons = () => {
  const isSignedIn = false;

  if (isSignedIn) {
    return null;
  }

  return (
    <>
      <Button asChild>
        <Link href="/auth/register">Register</Link>
      </Button>
      <Button variant="outline" asChild>
        <Link href="/auth/log-in">Sign in</Link>
      </Button>
    </>
  );
};

export default SignUpLogInButtons;

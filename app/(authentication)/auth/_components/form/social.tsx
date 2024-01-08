"use client";

import { signIn } from "next-auth/react";

import { FcGoogle } from "react-icons/fc";

import { Button } from "@/components/ui/button";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

const Social = () => {
  const onSignIn = (provider: "google" | "github") => {
    signIn(provider, {
      callbackUrl: DEFAULT_LOGIN_REDIRECT,
    });
  };

  return (
    <div className="flex w-full items-center gap-x-2">
      <Button
        size="lg"
        className="w-full"
        variant="outline"
        onClick={() => onSignIn("google")}
      >
        <FcGoogle className="h-5 w-5" />
      </Button>
    </div>
  );
};

export default Social;

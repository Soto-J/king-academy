"use client";

import { Button } from "../../ui/button";

const NavUserButton = () => {
  const isSignedIn = false;

  if (!isSignedIn) {
    return null;
  }

  return <Button asChild>User Button goes here</Button>;
};

export default NavUserButton;

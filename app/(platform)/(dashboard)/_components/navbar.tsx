import { UserButton } from "@clerk/nextjs";
import React from "react";

const Mavbar = () => {
  return (
    <nav className="h-18 border-b p-4 shadow-lg">
      <div className="flex justify-between">
        <div>LOGO</div>
        <div>
          <UserButton />
        </div>
      </div>
    </nav>
  );
};

export default Mavbar;

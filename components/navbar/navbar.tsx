import React from "react";
import { ModeToggle } from "../ui/mode-toggle";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="h-18 border-b p-4">
      <div className="px-10 flex items-center justify-between">
        <Link href="/">LOGO</Link>
        <div className="flex text-lg">
          <Link href="/">Home</Link>
        </div>
        <ModeToggle />
      </div>
    </nav>
  );
};

export default Navbar;

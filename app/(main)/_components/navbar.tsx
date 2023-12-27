"use client";
import Link from "next/link";

import { Menu } from "lucide-react";

import { ModeToggle } from "@/components/ui/mode-toggle";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { UserButton, useUser } from "@clerk/nextjs";

const Navbar = () => {
  const { isSignedIn } = useUser();

  return (
    <nav className="h-18 border-b p-4 shadow-lg">
      <div className="flex items-center justify-between sm:px-10">
        <Link href="/">LOGO</Link>

        <div className="hidden gap-x-4 text-lg md:flex">
          <Link href="/">Home</Link>
          <Link href="/roster">Roster</Link>
          <Link href="/about-us">About Us</Link>
          <Link href="/contact">Contact</Link>
        </div>

        <div className="flex gap-6">
          <div className="flex items-center gap-2 gap-x-4">
            {isSignedIn ? (
              <Button asChild>
                <UserButton />
              </Button>
            ) : (
              <>
                <Button asChild>
                  <Link href="/sign-up">Sign up</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/sign-in">Log in</Link>
                </Button>
              </>
            )}

            <div className="hidden md:block">
              <ModeToggle />
            </div>
          </div>

          <Sheet>
            <SheetTrigger className="md:hidden" asChild>
              <Button variant="outline" size="icon">
                <Menu />
              </Button>
            </SheetTrigger>

            <SheetContent side="left">
              <Link href="/">Home</Link>
              <Link href="/roster">Roster</Link>
              <Link href="/about-us">About Us</Link>
              <Link href="/contact">Contact</Link>
              <div className="flex h-full items-end justify-end pb-4">
                <ModeToggle />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

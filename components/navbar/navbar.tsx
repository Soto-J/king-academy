import Link from "next/link";

import { Menu } from "lucide-react";

import { ModeToggle } from "@/components/ui/mode-toggle";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const Navbar = () => {
  return (
    <nav className="h-18 border-b p-4">
      <div className="flex items-center justify-between sm:px-10">
        <Link href="/">LOGO</Link>

        <div className="hidden text-lg md:flex">
          <Link href="/">Home</Link>
        </div>

        <div className="flex gap-6">
          <div className="flex gap-2">
            <Button>
              <Link href="/">Sign up</Link>
            </Button>
            <Button variant="outline">
              <Link href="/">Log in</Link>
            </Button>

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

import { Menu } from "lucide-react";

import { ModeToggle } from "@/components/ui/mode-toggle";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

type MobileMenuProps = {
  NAV_LINKS: JSX.Element[];
};

const MobileMenu = ({ NAV_LINKS }: MobileMenuProps) => {
  return (
    <Sheet>
      <SheetTrigger className="md:hidden" asChild>
        <Button variant="outline" size="icon">
          <Menu />
        </Button>
      </SheetTrigger>

      <SheetContent side="left">
        <ul className="flex flex-col gap-3">
          {NAV_LINKS.map((link, i) => (
            <li key={i}>
              <SheetClose asChild>{link}</SheetClose>
            </li>
          ))}
        </ul>
        <div className="flex h-[80%] items-end justify-end pb-4">
          <ModeToggle />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;

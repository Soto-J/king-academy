import { Menu } from "lucide-react";

import { ModeToggle } from "@/components/mode-toggle";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type MobileMenuProps = {
  NAV_LINKS: {
    label: string;
    href: string;
  }[];
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
              <SheetClose asChild key={i}>
                <Link href={link.href}>{link.label}</Link>
              </SheetClose>
            </li>
          ))}
        </ul>

        <div className="absolute bottom-4 end-4">
          <ModeToggle />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;

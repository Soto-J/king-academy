import Link from "next/link";

import { Menu } from "lucide-react";

import { ModeToggle } from "@/components/ui/mode-toggle";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

type MobileMenuProps = {
  NAV_LINKS: { label: string; href: string }[];
};

const MobileRoutes = ({ NAV_LINKS }: MobileMenuProps) => {
  return (
    <Sheet>
      <SheetTrigger className="md:hidden" asChild>
        <Button variant="outline" size="icon">
          <Menu />
        </Button>
      </SheetTrigger>

      <SheetContent side="left" className="max-w-[40%]">
        <ul className="flex flex-col gap-6 pt-6 text-xl">
          {NAV_LINKS.map(({ label, href }) => (
            <li key={label}>
              <SheetClose asChild>
                <Link href={href}>{label}</Link>
              </SheetClose>
            </li>
          ))}
        </ul>

        <ModeToggle className="absolute bottom-5 right-5" />
      </SheetContent>
    </Sheet>
  );
};

export default MobileRoutes;

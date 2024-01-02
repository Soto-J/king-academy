import { Menu } from "lucide-react";

import { ModeToggle } from "@/components/ui/mode-toggle";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

type MobileMenuProps = {
  NAV_LINKS: JSX.Element;
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
        <div className="flex flex-col gap-3">{NAV_LINKS}</div>
        <div className="flex h-full items-end justify-end pb-4">
          <ModeToggle />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;

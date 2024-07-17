"use client";

import { ModeToggle } from "@/components/ui/mode-toggle";

import { KingAcademyLogo } from "../king-academy-logo";

import DesktopRoutes from "./desktop-routes";
import MobileRoutes from "./mobile-routes";
import NavbarActions from "./navbar-buttons";

const Navbar = () => {
  const NAV_LINKS = [
    { label: "Home", href: "/" },
    { label: "Galary", href: "/galary" },
    { label: "About Us", href: "/about-us" },
    { label: "Contact", href: "/contact" },
    { label: "Players", href: "/players" },
  ];

  return (
    <nav className="h-18 border-b p-4 shadow-lg">
      <div className="flex items-center justify-between sm:px-10">
        <KingAcademyLogo />

        <DesktopRoutes routes={NAV_LINKS} />

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-x-4">
            <NavbarActions />

            <ModeToggle className="hidden md:block" />
          </div>

          <MobileRoutes NAV_LINKS={NAV_LINKS} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

"use client";

import { ModeToggle } from "@/components/ui/mode-toggle";

import { KingAcademyLogo } from "../king-academy-logo";

import NavbarActions from "./navbar-buttons";
import MobileMenu from "./mobile-menu";
import NavbarRoutes from "./navbar-routes";


const Navbar = () => {
  const NAV_LINKS = [
    { label: "Home", href: "/" },
    { label: "Players", href: "/players" },
    { label: "About Us", href: "/about-us" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <nav className="h-18 border-b p-4 shadow-lg">
      <div className="flex items-center justify-between sm:px-10">
        <KingAcademyLogo />

        <NavbarRoutes routes={NAV_LINKS} />

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-x-4">
            <NavbarActions />

            <ModeToggle className="hidden md:block" />
          </div>

          <MobileMenu NAV_LINKS={NAV_LINKS} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

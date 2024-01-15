import Link from "next/link";

import { NavbarButtons } from "./navbar-buttons";
import MobileMenu from "./mobile-menu";

import { ModeToggle } from "@/components/mode-toggle";
import { Logo } from "@/components/logo";

export const Navbar = async () => {
  const NAV_LINKS = [
    { label: "Home", href: "/" },
    { label: "Players", href: "/players" },
    { label: "About Us", href: "/about-us" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <nav className="h-18 border-b p-4 shadow-lg">
      <div className="flex items-center justify-between sm:px-10">
        <Logo />

        <ul className="hidden gap-x-4 text-lg md:flex">
          {NAV_LINKS.map((link, i) => (
            <li key={i}>
              <Link href={link.href}>{link.label}</Link>
            </li>
          ))}
        </ul>

        <div className="flex gap-6">
          <div className="flex items-center gap-2 gap-x-4">
            <NavbarButtons />

            <div className="hidden md:block">
              <ModeToggle />
            </div>
          </div>

          <MobileMenu NAV_LINKS={NAV_LINKS} />
        </div>
      </div>
    </nav>
  );
};

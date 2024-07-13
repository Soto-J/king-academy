"use client";
import Link from "next/link";

import NavbarButtons from "./navbar-buttons";
import MobileMenu from "./mobile-menu";

import { ModeToggle } from "@/components/ui/mode-toggle";
import { KingAcademyLogo } from "../king-academy-logo";

const Navbar = () => {
  // const NAV_LINKS = [
  //   <Link href="/">Home</Link>,
  //   <Link href="/players">Players</Link>,
  //   <Link href="/about-us">About Us</Link>,
  //   <Link href="/contact">Contact</Link>,
  // ];
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

        <ul className="hidden gap-x-4 text-lg md:flex">
          {NAV_LINKS.map(({ label, href }) => (
            <li key={label}>
              <Link href={href}>{label}</Link>
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

export default Navbar;

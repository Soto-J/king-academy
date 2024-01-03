"use client";
import Link from "next/link";

import NavbarButtons from "./navbar-buttons";
import MobileMenu from "./mobile-menu";

import { ModeToggle } from "@/components/ui/mode-toggle";

const Navbar = () => {
  const NAV_LINKS = [
    <Link href="/">Home</Link>,
    <Link href="/players">Players</Link>,
    <Link href="/about-us">About Us</Link>,
    <Link href="/contact">Contact</Link>,
  ];

  return (
    <nav className="h-18 border-b p-4 shadow-lg">
      <div className="flex items-center justify-between sm:px-10">
        <Link href="/">LOGO</Link>

        <ul className="hidden gap-x-4 text-lg md:flex">
          {NAV_LINKS.map((link, i) => (
            <li key={i}>{link}</li>
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

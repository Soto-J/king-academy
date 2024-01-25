"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import { Link } from "@nextui-org/link";
import { ModeToggle } from "../mode-toggle";
import { SocialMedia } from "./social-media";
import { ActionButtons } from "./action-buttons";
import { User } from "@prisma/client";

type NavbarProps = {
  user: User | null;
};

export const NewNav = ({ user }: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navbarItems = [
    { label: "Home", href: "/" },
    { label: "Players", href: "/players" },
    { label: "Profile", href: "/profile" },
    { label: "About Us", href: "/aboutus" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <Navbar
      isBordered
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      className=""
    >
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        />
      </NavbarContent>

      <NavbarContent className="pr-3 sm:hidden" justify="center">
        <NavbarBrand>
          <Logo />
          <p className="pl-2 font-bold text-inherit">King Academy</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden gap-4 sm:flex" justify="center">
        <NavbarBrand>
          <Logo />
          {/* <p className="font-bold text-inherit">ACME</p> */}
        </NavbarBrand>

        {navbarItems.map(({ label, href }) => (
          <NavbarItem key={label}>
            <Link color="foreground" href={href} aria-current="page">
              {label}
            </Link>
          </NavbarItem>
        ))}

        {/* <NavbarItem>
          <Link color="foreground" href="#">
            Features
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link href="#" aria-current="page">
            Customers
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Integrations
          </Link>
        </NavbarItem> */}
      </NavbarContent>

      <NavbarContent justify="end">
        <ActionButtons user={user} />
      </NavbarContent>

      <NavbarMenu>
        {navbarItems.map(({ label, href }, index) => (
          <NavbarMenuItem key={label}>
            <Link
              className="w-full"
              color={
                index === 2
                  ? "warning"
                  : index === navbarItems.length - 1
                    ? "danger"
                    : "foreground"
              }
              href={href}
              size="lg"
            >
              {label}
            </Link>
          </NavbarMenuItem>
        ))}

        <NavbarMenuItem className="absolute bottom-4 right-4">
          <ModeToggle />
        </NavbarMenuItem>

        <NavbarMenuItem>
          <SocialMedia />
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
};

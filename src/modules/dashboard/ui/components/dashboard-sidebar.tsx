"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

import {
  Calendar,
  ChevronRight,
  Home,
  Images,
  Settings,
  User,
  Users,
} from "lucide-react";

import {
  useFilterNavigationItems,
  type NavigationItem,
} from "@/modules/dashboard/hooks/use-authorization";

import { Separator } from "@/components/ui/separator";
import { DashboardUserButton } from "./dashboard-user-button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export const DashboardSidebar = () => {
  const pathname = usePathname();

  const navigationItemsConfig: NavigationItem[] = [
    {
      icon: Home,
      label: "Home",
      href: "/",
      roles: ["public", "user", "admin"],
    },
    {
      icon: Images,
      label: "Gallery",
      href: "/galery",
      roles: ["public", "user", "admin"],
    },
    {
      icon: Calendar,
      label: "Training Schedule",
      href: "/schedule",
      roles: ["user", "admin"],
    },
    {
      icon: Users,
      label: "Players",
      href: "/players",
      roles: ["admin"],
    },
  ];

  const personalItemsConfig: NavigationItem[] = [
    {
      icon: User,
      label: "My Profile",
      href: "/profile",
      roles: ["user", "admin"],
    },
    {
      icon: Settings,
      label: "Settings",
      href: "/settings",
      roles: ["user", "admin"],
    },
  ];

  const navigationItems = useFilterNavigationItems(navigationItemsConfig);
  const personalItems = useFilterNavigationItems(personalItemsConfig);

  return (
    <Sidebar className="shadow-2xl">
      <SidebarHeader className="p-6 pt-10">
        <Link href="/" className="group flex gap-x-3">
          <Image
            src="/logo.jpg"
            alt="King Academy Logo"
            width={42}
            height={42}
            priority
            className="rounded object-cover ring-2 ring-white/20 transition-all group-hover:scale-105"
          />

          <div>
            <h1 className="text-sidebar-foreground text-lg font-bold">
              King Academy
            </h1>
            <p className="text-sidebar-foreground/70 text-xs">
              Baseball Excellence
            </p>
          </div>
        </Link>
      </SidebarHeader>

      <Separator className="via-primary/50 my-4 h-px bg-gradient-to-r from-transparent to-transparent" />

      <SidebarContent className="px-4 py-6">
        <SidebarGroup className="space-y-4">
          <h3 className="text-muted-foreground px-2 text-xs font-semibold tracking-wider uppercase">
            Main Navigation
          </h3>

          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {navigationItems.map(({ href, label, icon: Icon }) => (
                <SidebarMenuItem key={href}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === href}
                    className={cn(
                      "relative overflow-hidden rounded-lg transition-all duration-300",
                      pathname === href
                        ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-md"
                        : "hover:bg-sidebar-accent/50 text-sidebar-foreground",
                    )}
                  >
                    <Link
                      href={href}
                      className="flex items-center gap-3 px-3 py-2.5 font-medium"
                    >
                      <Icon size={18} />
                      <span>{label}</span>
                      {pathname === href && (
                        <ChevronRight
                          className="text-primary ml-auto"
                          size={16}
                        />
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <Separator className="via-primary/50 my-4 h-px bg-gradient-to-r from-transparent to-transparent" />

        <SidebarGroup className="space-y-4">
          <h3 className="text-muted-foreground px-2 text-xs font-semibold tracking-wider uppercase">
            Personal
          </h3>

          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {personalItems.map(({ href, label, icon: Icon }) => (
                <SidebarMenuItem key={href}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === href}
                    className={cn(
                      "relative overflow-hidden rounded-lg transition-all duration-300",
                      pathname === href
                        ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-md"
                        : "hover:bg-sidebar-accent/50 text-sidebar-foreground",
                    )}
                  >
                    <Link
                      href={href}
                      className="flex items-center gap-3 px-3 py-2.5 font-medium"
                    >
                      <Icon size={18} />
                      <span>{label}</span>
                      {pathname === href && (
                        <ChevronRight
                          className="text-primary ml-auto"
                          size={16}
                        />
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 pb-8">
        <DashboardUserButton />
      </SidebarFooter>
    </Sidebar>
  );
};

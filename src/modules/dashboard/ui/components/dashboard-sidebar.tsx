"use client";

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
import { cn } from "@/lib/utils";
import {
  ChevronRight,
  Users,
  Settings,
  Trophy,
  Calendar,
  Home,
  User,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { DashboardUserButton } from "./dashboard-user-button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import Image from "next/image";

export const DashboardSidebar = () => {
  const pathname = usePathname();

  const navigationItems = [
    { icon: Home, label: "Dashboard", href: "/" },
    { icon: Calendar, label: "Training Schedule", href: "/schedule" },
    { icon: Trophy, label: "Teams", href: "/teams" },
    { icon: Users, label: "Players", href: "/players" },
  ];

  const personalItems = [
    { icon: User, label: "My Profile", href: "/profile" },
    { icon: Settings, label: "Settings", href: "/settings" },
  ];
  return (
    <Sidebar className="bg-sidebar border-sidebar-border shadow-2xl">
      <SidebarHeader className="relative p-6">
        <Link href="/" className="group flex items-center gap-3">
          <div className="relative h-10 w-10 overflow-hidden rounded-xl shadow-lg transition-all group-hover:scale-105">
            <Image
              src="/logo.jpg"
              alt="King Academy Logo"
              fill
              className="object-contain"
            />
          </div>

          <div>
            <h1 className="text-lg font-bold text-sidebar-foreground">King Academy</h1>
            <p className="text-xs text-sidebar-foreground/70">Baseball Excellence</p>
          </div>
        </Link>
      </SidebarHeader>

      <Separator className="bg-sidebar-border mx-4 h-px" />

      <SidebarContent className="px-4 py-6">
        <SidebarGroup>
          <div className="mb-4">
            <h3 className="text-muted-foreground px-2 text-xs font-semibold tracking-wider uppercase">
              Main Navigation
            </h3>
          </div>
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

        <Separator className="bg-sidebar-border my-6 h-px" />

        <SidebarGroup>
          <div className="mb-4">
            <h3 className="text-muted-foreground px-2 text-xs font-semibold tracking-wider uppercase">
              Personal
            </h3>
          </div>

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

      <SidebarFooter className="p-4">
        <DashboardUserButton />
      </SidebarFooter>
    </Sidebar>
  );
};

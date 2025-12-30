"use client";

import { Activity } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

import { ChevronRight } from "lucide-react";

import type { SessionData } from "@/lib/auth/auth";
import { useFilterNavigationItems } from "@/modules/dashboard/hooks/use-filter-navigation-items";

import {
  navigationItemsConfig,
  personalItemsConfig,
} from "@/modules/dashboard/ui//navigation-items";

import { DashboardHeader } from "@/modules/dashboard/ui/components/dashboard-header";
import { Separator } from "@/components/ui/separator";
import { DashboardUserButton } from "./dashboard-user-button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/modules/dashboard/ui/components/sidebar";

interface DashboardSidebarProps {
  session: SessionData | null;
}

export const DashboardSidebar = ({ session }: DashboardSidebarProps) => {
  const pathname = usePathname();

  const isAuthenticated = !!session?.user;
  const role =
    session?.user?.role === "admin" || session?.user?.role === "user"
      ? session.user.role
      : null;

  const navigationItems = useFilterNavigationItems(navigationItemsConfig, role);
  const personalItems = useFilterNavigationItems(personalItemsConfig, role);

  return (
    <Sidebar className="shadow-2xl">
      <DashboardHeader title="King Academy" description="Baseball Excellense" />

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

        <Activity mode={isAuthenticated ? "visible" : "hidden"}>
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
        </Activity>
      </SidebarContent>

      <SidebarFooter className="p-4 pb-8">
        <DashboardUserButton session={session} />
      </SidebarFooter>
    </Sidebar>
  );
};

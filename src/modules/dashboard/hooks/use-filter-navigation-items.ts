"use client";

import { UserTable } from "@/db/types";
import { SessionData } from "@/lib/auth/auth";
import { LucideIcon } from "lucide-react";

export type UserRole = "public" | "user" | "admin";

export interface AuthState {
  isLoading: boolean;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isUser: boolean;
  user: UserTable | null;
}

export interface NavigationItem {
  icon: LucideIcon;
  label: string;
  href: string;
  roles: UserRole[];
  requiresAuth?: boolean;
  requiresAdmin?: boolean;
}

export const useFilterNavigationItems = (
  items: NavigationItem[],
  session: SessionData | null,
): NavigationItem[] => {
  const isAuthenticated = !!session?.user;
  const isAdmin = session?.user.role === "admin";

  return items.filter((item) => {
    if (item.roles.includes("public")) return true;

    if (!isAuthenticated) {
      return item.roles.includes("public");
    }

    if (isAdmin) {
      return item.roles.includes("admin") || item.roles.includes("user");
    }

    return item.roles.includes("user");
  });
};

export const canAccessRoute = (
  requiredRoles: UserRole[],
  userRole: string | undefined,
): boolean => {
  if (requiredRoles.includes("public")) return true;
  if (!userRole) return requiredRoles.includes("public");

  if (userRole === "admin") {
    return requiredRoles.some((role) => ["admin", "user"].includes(role));
  }

  return requiredRoles.includes(userRole as UserRole);
};

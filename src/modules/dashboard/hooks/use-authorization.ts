"use client";

import { authClient } from "@/lib/auth/auth-client";
import { LucideIcon } from "lucide-react";

export type UserRole = "public" | "user" | "admin";

export interface AuthState {
  isLoading: boolean;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isUser: boolean;
  user: {
    id: string;
    name: string;
    email: string;
    role?: string | null;
    image?: string | null;
    emailVerified?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    banned?: boolean | null;
    banReason?: string | null;
    banExpires?: Date | null;
  } | null;
}

export interface NavigationItem {
  icon: LucideIcon;
  label: string;
  href: string;
  roles: UserRole[];
  requiresAuth?: boolean;
  requiresAdmin?: boolean;
}

export const useAuthorization = () => {
  const { data: sessionData, isPending } = authClient.useSession();

  return {
    isAuthenticated: !!sessionData?.user,
    isAdmin: sessionData?.user?.role === "admin",
    isUser: sessionData?.user?.role === "user",
    user: sessionData?.user || null,
  };
};

export const useFilterNavigationItems = (
  items: NavigationItem[],
): NavigationItem[] => {
  const { isAuthenticated, isAdmin } = useAuthorization();

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

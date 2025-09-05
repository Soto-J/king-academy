"use client";

import { authClient } from "@/lib/auth/auth-client";

export type UserRole = "public" | "user" | "admin";

export interface AuthState {
  isLoading: boolean;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isUser: boolean;
  user: any | null;
}

export interface NavigationItem {
  icon: any;
  label: string;
  href: string;
  roles: UserRole[];
  requiresAuth?: boolean;
  requiresAdmin?: boolean;
}

export const useAuthorization = (): AuthState => {
  const { data: sessionData, isPending } = authClient.useSession();

  const isAuthenticated = !!sessionData?.user;
  const isAdmin = isAuthenticated && sessionData?.user?.role === "admin";
  const isUser = isAuthenticated && sessionData?.user?.role === "user";

  return {
    isLoading: isPending,
    isAuthenticated,
    isAdmin,
    isUser,
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

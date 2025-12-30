"use client";

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

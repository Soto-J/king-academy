import type { ComponentType } from "react";

import { UserTable } from "@/db/types";

export type NavigationItem = {
  icon: ComponentType<{ className?: string }>;
  label: string;
  href: `/${string}`;
  roles?: readonly UserTable["role"][];
};

const ROLE_ACCESS: Record<UserTable["role"], readonly UserTable["role"][]> = {
  user: ["user"],
  admin: ["user", "admin"],
} as const;

export const useFilterNavigationItems = (
  items: readonly NavigationItem[],
  userRole: UserTable["role"] | null,
) => {
  return items.filter((item) => {
    if (!item.roles) return true;

    if (!userRole) return false;

    return item.roles.some((r) => ROLE_ACCESS[userRole].includes(r));
  });
};

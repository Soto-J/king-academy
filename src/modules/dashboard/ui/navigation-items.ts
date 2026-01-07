import {
  Calendar,
  Home,
  Images,
  Settings,
  User as UserIcon,
  Users,
} from "lucide-react";

export const navigationItemsConfig = [
  {
    icon: Home,
    label: "Home",
    href: "/",
  },
  {
    icon: Images,
    label: "Gallery",
    href: "/gallery",
  },
  {
    icon: Calendar,
    label: "Schedule",
    href: "/schedule",
    roles: ["user", "admin"],
  },
  {
    icon: Users,
    label: "Roster",
    href: "/roster",
    roles: ["user", "admin"],
  },
] as const;

export const personalItemsConfig = [
  {
    icon: UserIcon,
    label: "My Profile",
    href: "/profile",
    roles: ["user", "admin"],
  },
  // {
  //   icon: Settings,
  //   label: "Settings",
  //   href: "/settings",
  //   roles: ["user", "admin"],
  // },
] as const;

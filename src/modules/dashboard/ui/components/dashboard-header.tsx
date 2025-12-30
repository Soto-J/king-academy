import { SidebarHeader } from "./sidebar";
import Link from "next/link";
import Image from "next/image";

interface DashboardHeaderProps {
  title: string;
  description: string;
}

export const DashboardHeader = ({
  title,
  description,
}: DashboardHeaderProps) => {
  return (
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
          <h1 className="text-sidebar-foreground text-lg font-bold">{title}</h1>
          <p className="text-sidebar-foreground/70 text-xs">{description}</p>
        </div>
      </Link>
    </SidebarHeader>
  );
};

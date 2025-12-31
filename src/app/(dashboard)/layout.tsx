import { Toaster } from "sonner";

import { getCurrentSession } from "@/lib/get-session";

import { DashboardSidebar } from "@/modules/dashboard/ui/components/sidebar/dashboard-sidebar";
import { SidebarToggle } from "@/modules/dashboard/ui/components/sidebar/sidebar-toggle";
import {
  SidebarProvider,
  SidebarInset,
} from "@/modules/dashboard/ui/components/sidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const session = await getCurrentSession();

  return (
    <SidebarProvider>
      <DashboardSidebar session={session} />
      <Toaster />

      <SidebarInset className="bg-accent">
        <SidebarToggle />
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}

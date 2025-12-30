import { Toaster } from "sonner";

import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/modules/dashboard/ui/components/dashboard-sidebar";
import { SidebarToggle } from "@/modules/dashboard/ui/components/sidebar-toggle";
import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const session = await auth.api.getSession({ headers: await headers() });

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

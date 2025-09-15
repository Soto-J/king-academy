import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/modules/dashboard/ui/components/dashboard-sidebar";
import { SidebarToggle } from "@/modules/dashboard/ui/components/sidebar-toggle";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <SidebarProvider>
      <DashboardSidebar />

      <SidebarInset className="bg-accent">
        <SidebarToggle />
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}

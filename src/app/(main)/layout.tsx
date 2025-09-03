import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/modules/dashboard/ui/components/dashboard-sidebar";
import { SidebarToggle } from "@/modules/dashboard/ui/components/sidebar-toggle";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <SidebarProvider>
      <DashboardSidebar />

      <main>
        <SidebarToggle />
        {children}
      </main>
    </SidebarProvider>
  );
};

export default MainLayout;

type DashboardLayoutProps = {
  children: React.ReactNode;
};

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return <div className="h-full">{children}</div>;
};

export default DashboardLayout;

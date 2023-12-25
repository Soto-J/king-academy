import Navbar from "./_components/navbar";

type DashboardLayoutProps = {
  children: React.ReactNode;
};

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div>
      <Navbar />
      <div>{children}</div>
    </div>
  );
};

export default DashboardLayout;

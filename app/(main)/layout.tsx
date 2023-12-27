type MainPageLayoutProps = {
  children: React.ReactNode;
};

const MainLayout = ({ children }: MainPageLayoutProps) => {
  return (
    <div className="h-full">
      <div className="pb-20 pt-40">{children}</div>
    </div>
  );
};

export default MainLayout;

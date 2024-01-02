type MainPageLayoutProps = {
  children: React.ReactNode;
};

const MainLayout = ({ children }: MainPageLayoutProps) => {
  return (
    <div className="h-full">
      <div className="mx-auto w-[95%] pb-16 pt-28">{children}</div>
    </div>
  );
};

export default MainLayout;

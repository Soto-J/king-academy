type MainPageLayoutProps = {
  children: React.ReactNode;
};

const MainLayout = ({ children }: MainPageLayoutProps) => {
  return <div className="mx-auto h-full w-[95%] pb-16 pt-20">{children}</div>;
};

export default MainLayout;

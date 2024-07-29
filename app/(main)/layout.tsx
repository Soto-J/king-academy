type MainPageLayoutProps = {
  children: React.ReactNode;
};

const MainLayout = ({ children }: MainPageLayoutProps) => {
  return (
    <div className="mx-auto min-h-[84vh] w-[95%] max-w-5xl pb-16 pt-20">
      {children}
    </div>
  );
};

export default MainLayout;

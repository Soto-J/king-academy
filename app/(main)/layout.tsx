type MainPageLayoutProps = {
  children: React.ReactNode;
};

const MainPageLayout = ({ children }: MainPageLayoutProps) => {
  return (
    <div className="h-full">
      <main className="pb-20 pt-40">{children}</main>
    </div>
  );
};

export default MainPageLayout;

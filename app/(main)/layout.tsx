import { CheckHydration } from "@/components/check-hydration";

type MainPageLayoutProps = {
  children: React.ReactNode;
};

const MainLayout = ({ children }: MainPageLayoutProps) => {
  return (
    <CheckHydration>
      <div className="mx-auto h-full w-[95%] pb-44 pt-20">{children}</div>
    </CheckHydration>
  );
};

export default MainLayout;

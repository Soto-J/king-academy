import Navbar from "@/app/(main)/_components/navbar";
import React from "react";

type MainPageLayoutProps = {
  children: React.ReactNode;
};

const MainPageLayout = ({ children }: MainPageLayoutProps) => {
  return (
    <div className="h-full">
      <Navbar />
      <main className="pb-20 pt-40">{children}</main>
    </div>
  );
};

export default MainPageLayout;

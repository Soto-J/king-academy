import { ClerkProvider } from "@clerk/nextjs";
import React from "react";

type ClerkLayoutProps = {
  children: React.ReactNode;
};

const ClerkLayout = ({ children }: ClerkLayoutProps) => {
  return (
    <ClerkProvider>
      <main>{children}</main>
    </ClerkProvider>
  );
};

export default ClerkLayout;

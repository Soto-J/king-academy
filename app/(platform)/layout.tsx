import { ClerkProvider } from "@clerk/nextjs";

type PlatformLayoutProps = {
  children: React.ReactNode;
};
const PlatformLayout = ({ children }: PlatformLayoutProps) => {
  return <ClerkProvider>{children}</ClerkProvider>;
};

export default PlatformLayout;

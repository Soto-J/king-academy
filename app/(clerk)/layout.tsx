type ClerkLayoutProps = {
  children: React.ReactNode;
};

const ClerkLayout = ({ children }: ClerkLayoutProps) => {
  return (
    <div className="flex h-full items-center justify-center">
      <div className="pb-20 pt-40">{children}</div>
    </div>
  );
};

export default ClerkLayout;

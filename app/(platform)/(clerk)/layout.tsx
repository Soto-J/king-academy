type ClerkLayoutProps = {
  children: React.ReactNode;
};

const ClerkLayout = ({ children }: ClerkLayoutProps) => {
  return (
    <div className="flex justify-center pt-24">
      {children}
    </div>
  );
};

export default ClerkLayout;

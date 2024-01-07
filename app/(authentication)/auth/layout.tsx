type AuthLayoutProps = {
  children: React.ReactNode;
};

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="flex h-full items-center justify-center pb-24">
      {children}
    </div>
  );
};

export default AuthLayout;

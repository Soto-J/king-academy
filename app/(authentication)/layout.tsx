const AuthenticationLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-full items-center justify-center pb-20 pt-10">
      {children}
    </div>
  );
};

export default AuthenticationLayout;

const AuthenticationLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-full items-center justify-center py-20">
      {children}
    </div>
  );
};

export default AuthenticationLayout;

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function Authlayout({ children }: AuthLayoutProps) {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <main className="w-full max-w-sm md:max-w-3xl">{children}</main>
    </div>
  );
}

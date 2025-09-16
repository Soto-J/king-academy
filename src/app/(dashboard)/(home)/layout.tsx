export default function Homelayout({ children }: LayoutProps<"/">) {
  return <div className="mx-auto w-[90%] py-8">{children}</div>;
}

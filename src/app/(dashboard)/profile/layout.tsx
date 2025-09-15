export default function ProfileLayout({ children }: LayoutProps<"/profile">) {
  return <div className="mx-auto w-[90%] py-8">{children}</div>;
}

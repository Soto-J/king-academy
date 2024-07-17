import Link from "next/link";

type DesktopRoutes = {
  routes: { label: string; href: string }[];
};

const DesktopRoutes = ({ routes }: DesktopRoutes) => {
  return (
    <ul className="hidden gap-x-6 text-lg md:flex">
      {routes.map(({ label, href }) => (
        <li key={label}>
          <Link href={href}>{label}</Link>
        </li>
      ))}
    </ul>
  );
};

export default DesktopRoutes;

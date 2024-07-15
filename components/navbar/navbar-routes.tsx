import Link from "next/link";

type NavbarRoutes = {
  routes: { label: string; href: string }[];
};

const NavbarRoutes = ({ routes }: NavbarRoutes) => {
  return (
    <ul className="hidden gap-x-4 text-lg md:flex">
      {routes.map(({ label, href }) => (
        <li key={label}>
          <Link href={href}>{label}</Link>
        </li>
      ))}
    </ul>
  );
};

export default NavbarRoutes;

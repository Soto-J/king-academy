import { onGetCurrentUser } from "@/actions/current-user";
import Link from "next/link";

type DesktopRoutes = {
  routes: { routeName: string; href: string }[];
};

const DesktopRoutes = async ({ routes }: DesktopRoutes) => {
  const currentUser = await onGetCurrentUser();

  return (
    <ul className="hidden gap-x-6 text-lg md:flex">
      {routes.map(({ routeName, href }) => {
        if (routeName === "Players" && !currentUser) {
          return;
        }

        return (
          <li key={routeName}>
            <Link href={href}>{routeName}</Link>
          </li>
        );
      })}
    </ul>
  );
};

export default DesktopRoutes;

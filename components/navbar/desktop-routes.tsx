import Link from "next/link";

import { onGetCurrentUser } from "@/actions/current-user";

type DesktopRoutes = {
  routes: { routeName: string; href: string }[];
};

const DesktopRoutes = async ({ routes }: DesktopRoutes) => {
  const currentUser = await onGetCurrentUser();

  return (
    <ul className="hidden gap-x-4 text-lg lg:flex lg:gap-x-10">
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

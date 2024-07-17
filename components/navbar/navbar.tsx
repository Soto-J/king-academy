import { ModeToggle } from "@/components/ui/mode-toggle";
import { KingAcademyLogo } from "@/components/king-academy-logo";

import DesktopRoutes from "./desktop-routes";
import MobileRoutes from "./mobile-routes";
import NavbarActions from "./navbar-buttons";

const Navbar = () => {
  const NAV_LINKS = [
    { routeName: "Home", href: "/" },
    { routeName: "Galary", href: "/galary" },
    { routeName: "About Us", href: "/about-us" },
    { routeName: "Contact", href: "/contact" },
    { routeName: "Players", href: "/players" },
  ];

  return (
    <nav className="h-18 border-b p-4 shadow-lg">
      <div className="flex items-center justify-between sm:px-10">
        <KingAcademyLogo />

        <DesktopRoutes routes={NAV_LINKS} />

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-x-4">
            <NavbarActions />

            <ModeToggle className="hidden lg:block" />
          </div>

          <MobileRoutes NAV_LINKS={NAV_LINKS} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

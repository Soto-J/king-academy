import Link from "next/link";

import { Facebook, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="flex w-full items-center border-t p-4">
      <p className="text-[.5rem] font-light">
        Copyright © 2024 King Academy - All Rights Reserved.
      </p>
      <div className="ml-auto flex gap-x-6 sm:px-10">
        <Link href="/">
          <Instagram className="h-6 w-6" />
        </Link>

        <Link href="/">
          <Facebook className="h-6 w-6" />
        </Link>
      </div>
    </footer>
  );
};

export default Footer;

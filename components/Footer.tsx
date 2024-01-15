import { Facebook, Instagram } from "lucide-react";
import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="fixed bottom-0 left-0 z-30 flex w-full border-t bg-muted p-4">
      <div className="ml-auto flex gap-x-6 sm:px-10">
        <Link
          href="https://www.instagram.com/baseballking_academy?igsh=MWFjaDg0dm9tZmZncA%3D%3D&utm_source=qr"
          target="_blank"
        >
          <Instagram className="h-6 w-6" />
        </Link>
        <Link href="https://www.facebook.com/" target="_blank">
          <Facebook className="h-6 w-6" />
        </Link>
      </div>
    </footer>
  );
};

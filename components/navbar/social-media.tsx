import { Link } from "@nextui-org/link";
import { Facebook, Instagram } from "lucide-react";

export const SocialMedia = () => {
  return (
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
  );
};

import Image from "next/image";
import Link from "next/link";

export const Logo = () => {
  return (
    <Link href="/" className="overflow-hidden rounded-full">
      <Image src="/logo.jpg" alt="King-Academy" width={45} height={45} />
    </Link>
  );
};

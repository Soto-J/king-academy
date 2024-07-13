import Image from "next/image";
import Link from "next/link";

export const KingAcademyLogo = () => {
  return (
    <Link href="/" className="overflow-hidden rounded-full">
      <Image src="/logo.jpg" alt="King-Academy" width={50} height={50} />
    </Link>
  );
};

import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/" className="overflow-hidden rounded-full">
      <Image src="/logo.jpg" alt="King-Academy" width={55} height={55} />
    </Link>
  );
};

export default Logo;

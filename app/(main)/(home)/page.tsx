import Image from "next/image";

export default async function Home() {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h2 className="pb-2 text-center text-3xl font-semibold">Welcome</h2>
        <Image src="/team.jpg" alt="team" width={500} height={500} />
      </div>
    </div>
  );
}

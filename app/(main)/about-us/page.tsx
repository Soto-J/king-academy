import Image from "next/image";

const AboutUsPage = () => {
  return (
    <div>
      <h1 className="pb-2 text-center text-3xl font-semibold">About Us</h1>
      <Image src="/team.jpg" alt="team" width={500} height={500} />
    </div>
  );
};

export default AboutUsPage;

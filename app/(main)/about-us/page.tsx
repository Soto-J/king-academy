import Image from "next/image";

import src from "/public/images/June 29, 2024--192.jpg";

const AboutUsPage = () => {
  return (
    <div className="">
      <div className="grid grid-cols-2 items-center gap-x-4 tracking-wide">
        <p className="font-light tracking-wide sm:text-xl sm:leading-8">
          Baseball King Academy is a nonprofit organization based in the Bronx
          and Manhattan. Our mission is to develop young men by teaching them
          the fundamentals of baseball. Since the early 2000s, Baseball King
          Academy has been committed to this goal, supported by a dedicated
          staff with professional and collegiate playing experience. We have
          positively impacted many kids' lives and will continue to do so every
          day.
        </p>

        {/* <div className="relative h-full">
          <Image
            fill
            src={src}
            alt="About us"
            quality={100}
            className="object-cover object-left"
          />
        </div> */}
        <Image
          src={src}
          alt="About us"
          quality={100}
          className="object-cover object-right"
        />
      </div>
    </div>
  );
};

export default AboutUsPage;

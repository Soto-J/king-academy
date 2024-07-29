import Image from "next/image";

import src from "/public/images/June 29, 2024--192.jpg";

const AboutUsPage = () => {
  return (
    <div className="mx-auto flex min-h-[50vh] max-w-2xl items-center justify-center p-4 md:max-w-5xl">
      <div className="grid w-full max-w-4xl grid-cols-1 items-center gap-8 md:grid-cols-2">
        <p className="text-center font-light tracking-wide text-primary sm:text-lg sm:leading-8 md:text-start">
          Baseball King Academy is a nonprofit organization based in the Bronx
          and Manhattan. Our mission is to develop young men by teaching them
          the fundamentals of baseball. Since the early 2000s, Baseball King
          Academy has been committed to this goal, supported by a dedicated
          staff with professional and collegiate playing experience. We have
          positively impacted many kids&apos; lives and will continue to do so
          every day.
        </p>

        <div className="relative h-64 w-full overflow-hidden rounded-lg">
          <div className="absolute left-1/2 top-0 h-full w-[75%] -translate-x-1/2 transform md:w-[80%]">
            <Image
              fill
              priority
              src={src}
              alt="Baseball King Academy - Developing young athletes"
              className="rounded-lg object-cover object-left"
              quality={100}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;

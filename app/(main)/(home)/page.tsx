import ImageSlider from "./_components/image-slides";

export default async function Home() {
  return (
    <div className="mx-auto w-[95%] max-w-2xl text-center tracking-wide ">
      <div className="pb-12">
        <h1 className=" pb-2 text-2xl font-bold sm:text-5xl">King Academy</h1>
        <h4 className="font-light">Where Young Athletes Grow and Shine</h4>
      </div>

      <ImageSlider />

      <p className="py-12 font-light sm:text-xl sm:leading-8">
        At King Academy, we are passionate about creating a dynamic and
        enjoyable environment where young athletes can learn, play, and excel in
        the sport of baseball. Our dedicated team is committed to fostering
        teamwork, sportsmanship, and skill development in a supportive and
        family-friendly atmosphere. Whether your child is a seasoned player or
        just starting their baseball journey, we offer opportunities for
        everyone to participate, make new friends, and experience the joy of the
        game. Join us for an exciting season full of unforgettable moments and
        plenty of home runs!
      </p>
    </div>
  );
}

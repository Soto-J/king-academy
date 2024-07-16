import ImageSlider from "./_components/image-slides";

export default async function Home() {
  return (
    <div className="mx-auto w-[95%] max-w-2xl text-center">
      <h1 className="pb-12 text-2xl font-bold sm:text-3xl">
        Welcome to the King Academy Baseball League!
      </h1>

      <ImageSlider />

      <p className="py-12 leading-8 sm:text-lg">
        We are thrilled to provide a fun and engaging environment for young
        athletes to learn, play, and grow in the sport of baseball. Our league
        is dedicated to fostering teamwork, sportsmanship, and skill development
        in a supportive and family-friendly atmosphere. Whether your child is a
        seasoned player or just starting out, we offer opportunities for
        everyone to participate and enjoy the great game of baseball. Join us
        for an exciting season filled with memorable experiences, new
        friendships, and plenty of home runs!
      </p>
    </div>
  );
}

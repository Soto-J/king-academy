import ImageSlider from "./_components/image-slides";

export default async function Home() {
  return (
    <div className="flex flex-col items-center justify-between p-24">
      <h2>Welcome</h2>

      <ImageSlider />
    </div>
  );
}

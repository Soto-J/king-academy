import Image from "next/image";

import image5 from "@/public/images/june 29, 2024--5.jpg";

import { galleryImages } from "./_components/images";

const GalleryPage = () => {
  return (
    <div>
      <h1 className="text-center text-3xl">Gallery</h1>

      <Image
        src={image5}
        alt=""
        className="pt-20"
        // style={{
        //   maxWidth: "100%",
        //   height: "50%",
        // }}
      />

      <ul className="grid gap-6 pt-6 md:grid-cols-2">
        {galleryImages.map((src, idx) => (
          <li key={idx} className="relative h-64 w-full">
            <Image
              fill
              // src={`/images/june 29, 2024--${src}.jpg`}
              src={src}
              alt={""}
              className="object-cover"
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GalleryPage;

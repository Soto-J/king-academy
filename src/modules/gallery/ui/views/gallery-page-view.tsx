"use client";

import { useState } from "react";
import Image from "next/image";

import { useSuspenseQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";

import Masonry from "react-masonry-css";

import { Maximize2 } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

import { GalleryModal } from "../components/gallery-modal";

export const GalleryPageView = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const trpc = useTRPC();
  const { data: images } = useSuspenseQuery(
    trpc.gallery.loadImages.queryOptions({}),
  );

  const breakpointColumns = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  };

  const handleImageClick = (index: number) => {
    setSelectedImage(index);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  const handlePrevious = () => {
    if (selectedImage !== null && selectedImage > 0) {
      setSelectedImage(selectedImage - 1);
    }
  };

  const handleNext = () => {
    if (selectedImage !== null && selectedImage < images.length - 1) {
      setSelectedImage(selectedImage + 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 dark:from-slate-900 dark:to-slate-800">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="pb-4 text-center">
          <h1 className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text pb-4 text-5xl font-bold text-transparent">
            Photo Gallery
          </h1>

          <p className="text-muted-foreground pb-4 text-xl">
            Capturing moments from June 29, 2024 • {images.length} photos
          </p>
        </div>

        <Masonry
          breakpointCols={breakpointColumns}
          className="-ml-6 flex w-auto"
          columnClassName="pl-6 bg-clip-padding"
        >
          {images.map((image, index) => (
            <Card
              key={image.id}
              className="group mb-6 cursor-pointer overflow-hidden border-white/50 bg-white/80 shadow-lg backdrop-blur-sm transition-all duration-300 will-change-transform hover:-translate-y-1 hover:shadow-xl"
              onClick={() => handleImageClick(index)}
            >
              <CardContent className="relative p-0">
                <div className="relative overflow-hidden">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={400}
                    height={0}
                    className="h-auto w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                    sizes="(max-width: 500px) 100vw, (max-width: 700px) 50vw, (max-width: 1100px) 33vw, 25vw"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-all duration-200 group-hover:bg-black/20 group-hover:opacity-100">
                    <div className="translate-y-2 transform rounded-full bg-white/90 p-3 backdrop-blur-sm transition-transform duration-200 group-hover:translate-y-0">
                      <Maximize2 className="h-6 w-6 text-slate-700" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </Masonry>

        <GalleryModal
          images={images}
          selectedImage={selectedImage ?? 0}
          open={selectedImage !== null}
          onClose={handleCloseModal}
          onPrevious={handlePrevious}
          onNext={handleNext}
        />
      </div>
    </div>
  );
};

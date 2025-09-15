"use client";

import { useState } from "react";
import Image from "next/image";
import { Maximize2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { loadImages } from "../../utilities";
import { GalleryModal } from "../components/gallery-modal";

interface GalleryImage {
  src: string;
  alt: string;
  id: string;
}

export const GaleryPageView = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const images = loadImages();

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
        <div className="mb-12 text-center">
          <h1 className="mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-5xl font-bold text-transparent">
            Photo Gallery
          </h1>
          <p className="text-muted-foreground mb-8 text-xl">
            Capturing moments from June 29, 2024 • {images.length} photos
          </p>
        </div>

        {/* Masonry Grid */}
        <div className="columns-1 gap-6 space-y-6 sm:columns-2 lg:columns-3 xl:columns-4">
          {images.map((image, index) => (
            <Card
              key={image.id}
              className="group cursor-pointer break-inside-avoid overflow-hidden border-white/50 bg-white/80 shadow-lg backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
              onClick={() => handleImageClick(index)}
            >
              <CardContent className="relative p-0">
                <div className="relative overflow-hidden">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={400}
                    height={300}
                    className="h-auto w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-all duration-300 group-hover:bg-black/20 group-hover:opacity-100">
                    <div className="translate-y-4 transform rounded-full bg-white/90 p-3 backdrop-blur-sm transition-transform duration-300 group-hover:translate-y-0">
                      <Maximize2 className="h-6 w-6 text-slate-700" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {selectedImage !== null && (
          <GalleryModal
            images={images}
            selectedImage={selectedImage}
            onClose={handleCloseModal}
            onPrevious={handlePrevious}
            onNext={handleNext}
          />
        )}
      </div>
    </div>
  );
};

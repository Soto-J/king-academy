"use client";

import { useEffect } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

interface GalleryImage {
  src: string;
  alt: string;
  id: string;
}

interface GalleryModalProps {
  images: GalleryImage[];
  selectedImage: number;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
}

export const GalleryModal = ({
  images,
  selectedImage,
  onClose,
  onPrevious,
  onNext,
}: GalleryModalProps) => {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = images[selectedImage].src;
    link.download = images[selectedImage].src.split("/").pop() || "image.jpg";
    link.click();
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "Escape":
          onClose();
          break;
        case "ArrowLeft":
          if (selectedImage > 0) onPrevious();
          break;
        case "ArrowRight":
          if (selectedImage < images.length - 1) onNext();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImage, images.length, onClose, onPrevious, onNext]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 backdrop-blur-sm">
      <div className="relative flex h-full max-h-full w-full max-w-6xl items-center justify-center">
        {/* Close Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-white/20 text-white backdrop-blur-sm hover:bg-white/30"
        >
          <X className="h-6 w-6" />
        </Button>

        {/* Navigation Buttons */}
        {selectedImage > 0 && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onPrevious}
            className="absolute left-4 z-10 bg-white/20 text-white backdrop-blur-sm hover:bg-white/30"
          >
            <ChevronLeft className="h-8 w-8" />
          </Button>
        )}

        {selectedImage < images.length - 1 && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onNext}
            className="absolute right-4 z-10 bg-white/20 text-white backdrop-blur-sm hover:bg-white/30"
          >
            <ChevronRight className="h-8 w-8" />
          </Button>
        )}

        {/* Download Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={handleDownload}
          className="absolute top-4 right-16 z-10 bg-white/20 text-white backdrop-blur-sm hover:bg-white/30"
        >
          <Download className="h-6 w-6" />
        </Button>

        {/* Main Image */}
        <div className="relative max-h-full max-w-full">
          <Image
            src={images[selectedImage].src}
            alt={images[selectedImage].alt}
            width={1200}
            height={800}
            className="max-h-full max-w-full rounded-lg object-contain shadow-2xl"
          />
        </div>

        {/* Image Counter */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 transform rounded-full bg-white/20 px-4 py-2 text-white backdrop-blur-sm">
          {selectedImage + 1} of {images.length}
        </div>
      </div>
    </div>
  );
};

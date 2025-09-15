"use client";

import { useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogTitle,
} from "@/components/ui/dialog";

interface GalleryImage {
  src: string;
  alt: string;
  id: string;
}

interface GalleryModalProps {
  images: GalleryImage[];
  selectedImage: number;
  open: boolean;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
}

export const GalleryModal = ({
  images,
  selectedImage,
  open,
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

  // Preload adjacent images for faster navigation
  useEffect(() => {
    const preloadImage = (src: string) => {
      const htmlImg = new window.Image();
      htmlImg.src = src;
    };

    // Preload previous image
    if (selectedImage > 0) {
      preloadImage(images[selectedImage - 1].src);
    }

    // Preload next image
    if (selectedImage < images.length - 1) {
      preloadImage(images[selectedImage + 1].src);
    }
  }, [selectedImage, images]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-screen max-h-screen w-screen h-screen bg-black/95 border-none p-0 [&>button]:hidden">
        <DialogTitle className="sr-only">
          Gallery Image {selectedImage + 1} of {images.length}
        </DialogTitle>
        <div className="relative flex h-full w-full items-center justify-center">
          {/* Close Button */}
          <DialogClose asChild>
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 z-20 bg-white/20 text-white backdrop-blur-sm hover:bg-white/30"
            >
              ✕
            </Button>
          </DialogClose>

          {/* Navigation Buttons */}
          {selectedImage > 0 && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onPrevious}
              className="pointer-events-auto absolute top-1/2 left-4 z-20 -translate-y-1/2 bg-white/20 text-white backdrop-blur-sm hover:bg-white/30"
            >
              <ChevronLeft className="h-8 w-8" />
            </Button>
          )}

          {selectedImage < images.length - 1 && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onNext}
              className="pointer-events-auto absolute top-1/2 right-4 z-20 -translate-y-1/2 bg-white/20 text-white backdrop-blur-sm hover:bg-white/30"
            >
              <ChevronRight className="h-8 w-8" />
            </Button>
          )}

          {/* Download Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={handleDownload}
            className="absolute top-4 right-16 z-20 bg-white/20 text-white backdrop-blur-sm hover:bg-white/30"
          >
            <Download className="h-6 w-6" />
          </Button>

          {/* Main Image Container - True Full Screen */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative h-full w-full">
              <Image
                src={images[selectedImage].src}
                alt={images[selectedImage].alt}
                fill
                className="object-contain"
                sizes="100vw"
                priority
                unoptimized={false}
              />
            </div>
          </div>

          {/* Image Counter */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 transform rounded-full bg-white/20 px-4 py-2 text-white backdrop-blur-sm z-20">
            {selectedImage + 1} of {images.length}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

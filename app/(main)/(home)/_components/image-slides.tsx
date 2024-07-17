"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

import Autoplay from "embla-carousel-autoplay";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

const ImageSlider = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const carouselPlugin = useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true }),
  );

  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  const photoAlbum = ["38", "39", "40"];

  return (
    <div className="mx-auto w-[90%]">
      <Carousel
        plugins={[carouselPlugin.current]}
        setApi={setApi}
        onMouseEnter={carouselPlugin.current.stop}
        onMouseLeave={carouselPlugin.current.reset}
        className="mx-auto w-[95%] max-w-lg"
      >
        <CarouselContent>
          {photoAlbum.map((src, index) => (
            <CarouselItem key={index}>
              <Card>
                <CardContent className="relative flex aspect-square items-center justify-center p-6">
                  <Image
                    fill
                    src={`/images/${src}.jpg`}
                    alt={src}
                    sizes="w-full h-full"
                    className="object-cover"
                  />
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      <div className="py-2 text-center text-sm text-muted-foreground">
        {current} of {count}
      </div>
    </div>
  );
};

export default ImageSlider;

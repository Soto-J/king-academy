"use client";

import { useState, useEffect, useRef } from "react";

import Image from "next/image";

import Autoplay from "embla-carousel-autoplay";

import { cn } from "@/lib/utils";

import { sliderImages } from "../../images";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

const HeroCarousel = () => {
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

  return (
    <div className="relative mx-auto w-full max-w-2xl">
      <div className="from-primary/10 via-primary/5 to-primary/10 border-border/20 relative overflow-hidden rounded-3xl border bg-gradient-to-br p-12 pb-6 shadow-2xl backdrop-blur-sm">
        <Carousel
          plugins={[carouselPlugin.current]}
          setApi={setApi}
          onMouseEnter={carouselPlugin.current.stop}
          onMouseLeave={carouselPlugin.current.reset}
          className="relative z-10 rounded-2xl"
        >
          <CarouselContent>
            {sliderImages.map(({ src, alt }, idx) => (
              <CarouselItem key={idx} className="bg-transparent">
                <Card className="border-0 p-0 shadow-none">
                  <CardContent className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-xl">
                    <Image
                      fill
                      src={src}
                      alt={alt}
                      className="object-cover brightness-90"
                      priority={idx === 0}
                    />

                    {/* Image loading */}
                    <div className="from-primary/20 absolute right-0 bottom-0 left-0 z-20 h-1/3 bg-gradient-to-t to-transparent" />
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious className="bg-primary/80 border-border/20 hover:bg-muted -left-10 shadow-lg backdrop-blur-sm" />
          <CarouselNext className="bg-primary/80 border-border/20 hover:bg-muted -right-10 shadow-lg backdrop-blur-sm" />
        </Carousel>

        {/* Dot indicators */}
        <div className="relative z-10 flex justify-center space-x-2 pt-6">
          {Array.from({ length: count }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => api?.scrollTo(idx)}
              className={cn(
                "hover:bg-primary/60 h-3 rounded-full transition-all duration-300",
                idx === current - 1
                  ? "bg-primary shadow-primary/25 w-8 shadow-lg"
                  : "bg-muted-foreground/60 hover:bg-muted-foreground/80 w-3",
              )}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        {/* Slide counter */}
        <div className="absolute top-3 right-4 z-20 rounded-full bg-black/20 px-3 py-1.5 text-xs font-medium text-white/90 backdrop-blur-md">
          {current} / {count}
        </div>
      </div>
    </div>
  );
};

export default HeroCarousel;

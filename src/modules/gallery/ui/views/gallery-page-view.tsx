"use client";

import { useEffect, useState } from "react";

import { useSuspenseQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";

import NextJsImages from "../components/nextjs-images";

import { Photo, RowsPhotoAlbum } from "react-photo-album";
import "react-photo-album/rows.css";

import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

import Counter from "yet-another-react-lightbox/plugins/counter";
import "yet-another-react-lightbox/plugins/counter.css";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Download from "yet-another-react-lightbox/plugins/download";

import { Skeleton } from "@/components/ui/skeleton";

export const GalleryPageView = () => {
  const [index, setIndex] = useState(-1);
  const [ready, setReady] = useState(false);

  const trpc = useTRPC();
  const { data: photos } = useSuspenseQuery(
    trpc.gallery.loadImages.queryOptions({}),
  );

  const plugins = [Counter, Fullscreen, Slideshow, Zoom, Download];

  const counter = {
    container: {
      style: { top: "unset", bottom: 0 },
    },
  };

  useEffect(() => {
    requestAnimationFrame(() => {
      setReady(true);
    });
  }, []);

  if (!ready) {
    return <GalleryPageViewSkeleton />;
  }

  return (
    <>
      <RowsPhotoAlbum
        photos={photos}
        componentsProps={() => ({
          image: { loading: "eager" },
        })}
        targetRowHeight={150}
        onClick={({ index }) => setIndex(index)}
      />

      <Lightbox
        open={index >= 0}
        close={() => setIndex(-1)}
        index={index}
        plugins={plugins}
        slides={photos}
        render={{ slide: NextJsImages }}
        counter={counter}
      />
    </>
  );
};

export const GalleryPageViewSkeleton = () => {
  const mockPhotos: Photo[] = Array.from({ length: 20 }, (_, i) => ({
    src: "placeholder",
    width: 4,
    height: 3,
  }));

  return (
    <>
      {/* TODO */}
      {/* <RowsPhotoAlbum
        photos={mockPhotos}
        targetRowHeight={150}
        skeleton={<Skeleton className="bg-primary h-full w-full rounded-sm" />}
        render={{
          photo: () => (
            <div>
              <Skeleton className="bg-primary h-full w-full rounded-sm" />
            </div>
          ),
        }}
      /> */}
      <div className="flex flex-wrap gap-2">
        {Array.from({ length: 16 }).map((_, i) => (
          <Skeleton
            key={i}
            className="bg-muted h-[150px] w-[250px] rounded-sm"
          />
        ))}
      </div>
    </>
  );
};

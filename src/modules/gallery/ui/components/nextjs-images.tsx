"use client";

import Image from "next/image";
import {
  isImageFitCover,
  isImageSlide,
  Slide,
  useLightboxProps,
  useLightboxState,
  ContainerRect,
} from "yet-another-react-lightbox";

const isNextJsImage = (slide: Slide) => {
  return (
    isImageSlide(slide) &&
    typeof slide.width === "number" &&
    typeof slide.height === "number"
  );
};

interface LightBoxProps {
  slide: Slide;
  offset: number;
  rect: ContainerRect;
}

export default function NextJsImages({ slide, offset, rect }: LightBoxProps) {
  const {
    on: { click },
    carousel: { imageFit },
  } = useLightboxProps();

  const { currentIndex } = useLightboxState();

  const cover = isImageSlide(slide) && isImageFitCover(slide, imageFit);

  if (!isNextJsImage(slide)) return undefined;

  const slideHeight = slide?.height ?? 0;
  const slideWidth = slide?.width ?? 0;

  const width = !cover
    ? Math.round(Math.min(rect.width, (rect.height / slideHeight) * slideWidth))
    : rect.width;

  const height = !cover
    ? Math.round(Math.min(rect.height, (rect.width / slideWidth) * slideHeight))
    : rect.height;

  const onClick =
    offset === 0 ? () => click?.({ index: currentIndex }) : undefined;

  return (
    <div
      style={{
        position: "relative",
        width,
        height,
        aspectRatio: `${width} / ${height}`,
      }}
    >
      <Image
        fill
        alt={slide?.alt || ""}
        src={slide.src}
        loading="eager"
        draggable={false}
        // placeholder={slide.blurDataURL ? "blur" : undefined}
        style={{
          objectFit: cover ? "cover" : "contain",
          cursor: click ? "pointer" : undefined,
        }}
        sizes={`${Math.ceil((width / window.innerWidth) * 100)}vw`}
        onClick={onClick}
      />
    </div>
  );
}

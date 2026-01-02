import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getQueryClient, trpc } from "@/trpc/server";

import {
  GalleryPageView,
  GalleryPageViewSkeleton,
} from "@/modules/gallery/ui/views/gallery-page-view";

const GalleryPage = () => {
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.gallery.loadImages.queryOptions({}));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<GalleryPageViewSkeleton />}>
        <ErrorBoundary fallback={<div>Error</div>}>
          <GalleryPageView />
        </ErrorBoundary>
      </Suspense>
    </HydrationBoundary>
  );
};

export default GalleryPage;

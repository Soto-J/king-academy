import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getQueryClient, trpc } from "@/trpc/server";

import { GaleryPageView } from "@/modules/galery/ui/views/galery-page-view";

const GalleryPage = () => {
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.gallery.loadImages.queryOptions({}));
  
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<p>Loading...</p>}>
        <ErrorBoundary fallback={<p>Loading...</p>}>
          <GaleryPageView />
        </ErrorBoundary>
      </Suspense>
    </HydrationBoundary>
  );
};

export default GalleryPage;

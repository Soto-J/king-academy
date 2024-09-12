import db from "@/lib/prismadb";

import { getCurrentUser } from "@/lib/action-helpers/user-service";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

export const ourFileRouter = {
  thumbnailUploader: f({
    image: { maxFileSize: "4MB", maxFileCount: 1 },
  })
    .middleware(async () => {
      const currentUser = await getCurrentUser();

      if (!currentUser) {
        throw new UploadThingError("Unauthorized");
      }

      return { user: currentUser };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      await db.user.update({
        where: { externalId: metadata.user.id },
        data: { imageUrl: file.url },
      });

      console.log("thumbnail uploaded", file.url);
      return { fileUrl: file.url };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;

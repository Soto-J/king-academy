"use client";

import { useState } from "react";
import { useUploadThing } from "@/lib/utils/uploadthing";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

export const AvatarUpload = () => {
  const [files, setFiles] = useState<File[]>([]);
  const router = useRouter();

  const { startUpload, isUploading } = useUploadThing("imageUploader", {
    onClientUploadComplete: (res) => {
      console.log("Upload completed:", res);
      router.refresh();
    },
    onUploadError: (error) => {
      console.error("Upload error:", error);
      // TODO: replace with toast later
      alert(`Upload failed: ${error.message}`);
    },
  });

  return (
    <Button disabled={isUploading} onClick={() => startUpload(files)}>
      Upload Avatar
    </Button>
  );
};

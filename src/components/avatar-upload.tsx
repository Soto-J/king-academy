"use client";

import { ReactNode, useRef } from "react";
import { useUploadThing } from "@/lib/utils/uploadthing";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface AvatarUploadProps {
  children: ReactNode;
  showButton?: boolean;
  buttonText?: string;
  isOwnProfile: boolean;
  onUploadStart?: () => void;
  onUploadComplete?: () => void;
}

export const AvatarUpload = ({
  children,
  showButton = true,
  buttonText = "Upload Avatar",
  isOwnProfile,
  onUploadStart,
  onUploadComplete,
}: AvatarUploadProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const { startUpload, isUploading } = useUploadThing("imageUploader", {
    onClientUploadComplete: (res) => {
      console.log("Upload completed:", res);
      onUploadComplete?.();
      router.refresh();
    },
    onUploadError: (error) => {
      console.error("Upload error:", error);
      // TODO: replace with toast later
      alert(`Upload failed: ${error.message}`);
    },
  });

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(e.target.files ?? []);

    if (selected.length > 0) {
      onUploadStart?.();
      await startUpload(selected);
    }
  };

  const handleClick = () => {
    if (!isOwnProfile) return;

    inputRef.current?.click();
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <Input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={onFileChange}
        disabled={isUploading}
      />

      <button
        type="button"
        onClick={handleClick}
        disabled={isUploading}
        className="group relative cursor-pointer transition-all disabled:cursor-not-allowed disabled:opacity-50"
      >
        {children}
        <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/60 opacity-0 transition-opacity group-hover:opacity-100">
          <span className="text-xs font-medium text-white">
            {isUploading ? "Uploading..." : "Change"}
          </span>
        </div>
      </button>

      {showButton && (
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={isUploading}
          onClick={handleClick}
        >
          {isUploading ? "Uploading..." : buttonText}
        </Button>
      )}
    </div>
  );
};

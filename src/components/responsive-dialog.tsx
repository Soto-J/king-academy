"use client";

import { useRef } from "react";

import { useIsMobile } from "@/hooks/use-mobile";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";

interface ResponsiveDialogProps {
  children: React.ReactNode;
  title: string;
  description: string;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

export const ResponsiveDialog = ({
  children,
  title,
  description,
  isOpen,
  onOpenChange,
}: ResponsiveDialogProps) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <Drawer open={isOpen} onOpenChange={onOpenChange}>
        <DrawerContent
          ref={contentRef}
          onOpenAutoFocus={(e) => {
            e.preventDefault();

            // Move focus to the drawer content container
            requestAnimationFrame(() => {
              contentRef.current?.focus();
            });
          }}
          className="flex max-h-[90vh] w-full max-w-full flex-col p-4"
          tabIndex={-1}
        >
          <DrawerHeader>
            <DrawerTitle>{title}</DrawerTitle>
            <DrawerDescription>{description}</DrawerDescription>
          </DrawerHeader>

          {children}
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="flex max-h-[75vh] flex-col pr-4">
        <DialogHeader className="py-4">
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        {children}
      </DialogContent>
    </Dialog>
  );
};

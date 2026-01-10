"use client";

import { useState, JSX } from "react";

import ResponsiveDialog from "@/components/responsive-dialog";
import { Button } from "@/components/ui/button";

interface UseConfirmProps {
  title: string;
  description: string;
}

export const useConfirm = ({
  title,
  description,
}: UseConfirmProps): [() => JSX.Element, () => Promise<boolean>] => {
  const [promise, setPromise] = useState<{
    resolve: (value: boolean) => void;
  } | null>(null);

  const confirm = (): Promise<boolean> => {
    return new Promise((resolve) => {
      setPromise({ resolve });
    });
  };

  const handleClose = () => {
    setPromise(null);
  };

  const handleConfirm = () => {
    promise?.resolve(true);
    handleClose();
  };

  const handleCancel = () => {
    promise?.resolve(false);
    handleClose();
  };

  const ConfirmationDialog = () => (
    <ResponsiveDialog
      title={title}
      description={description}
      isOpen={promise !== null}
      onOpenChange={handleClose}
    >
      <div className="flex w-full flex-col-reverse items-center justify-end gap-2 pt-4 lg:flex-row">
        <Button
          onClick={handleCancel}
          variant="outline"
          className="w-full lg:w-auto"
        >
          Cancel
        </Button>
        <Button onClick={handleConfirm} className="w-full lg:w-auto">
          Confirm
        </Button>
      </div>
    </ResponsiveDialog>
  );

  return [ConfirmationDialog, confirm];
};

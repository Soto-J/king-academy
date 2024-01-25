import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import React from "react";

type ActionButtonsProps = {
  disabled: boolean;
};
export const ActionButtons = ({ disabled }: ActionButtonsProps) => {
  return (
    <div className="mt-8 flex w-full justify-end gap-x-4">
      <DialogClose asChild>
        <Button size="lg" disabled={disabled} variant="secondary">
          Cancel
        </Button>
      </DialogClose>

      <Button
        type="submit"
        size="lg"
        disabled={disabled}
        className="font-semibold"
      >
        Submit
      </Button>
    </div>
  );
};

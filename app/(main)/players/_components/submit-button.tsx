"use client";

import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";

type SubmitButtonProps = {
  closeDropdown?: () => void;
};

const SubmitButton = ({ closeDropdown }: SubmitButtonProps) => {
  if (closeDropdown) {
    return (
      <DialogClose asChild>
        <Button type="submit" className="ml-auto mt-8 block">
          Submit
        </Button>
      </DialogClose>
    );
  }

  return (
    <Button type="submit" className="ml-auto mt-8 block">
      Submit
    </Button>
  );
};

export default SubmitButton;

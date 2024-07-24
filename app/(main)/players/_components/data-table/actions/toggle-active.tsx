import { useTransition } from "react";

import { onToggleActiveState } from "@/actions/active-state-user";
import { Button } from "@/components/ui/button";
import {
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

type ToggleActiveProps = {
  playerId: string;
  isAdmin: boolean;
  isActive: boolean | null;
};

const ToggleActive = ({ playerId, isAdmin, isActive }: ToggleActiveProps) => {
  const [isPending, startTransition] = useTransition();

  if (!isAdmin) {
    return null;
  }

  const label = isActive ? "Deactivate" : "Activate";

  const onToggle = () => {
    startTransition(() => {
      console.log("Toggling");

      onToggleActiveState(playerId)
        .then(() => console.log("Success"))
        .catch(() => console.log("Problem toggling"));
    });
  };

  return (
    <>
      <DropdownMenuSeparator />
      <DropdownMenuItem asChild>
        <Button
          onClick={onToggle}
          variant="ghost"
          size="sm"
          className="w-full justify-start hover:outline-none"
        >
          {label}
        </Button>
      </DropdownMenuItem>
    </>
  );
};

export default ToggleActive;

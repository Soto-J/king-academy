import { Button } from "@/components/ui/button";
import {
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

type ToggleActiveProps = {
  isAdmin: boolean;
};

const ToggleActive = ({ isAdmin }: ToggleActiveProps) => {
  if (!isAdmin) {
    return null;
  }

  const onToggle = async () => {
    try {
      // await onToggleActiveState();
      console.log("Toggling");
    } catch (error) {
      console.log(error);
      return null;
    }
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
          Activate
        </Button>
      </DropdownMenuItem>
    </>
  );
};

export default ToggleActive;

import { User } from "@/lib/action-helpers/user-service";

import EditProfileForm from "../../edit-profile-form";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

type EditProfileActionProps = {
  currentUser: User;
  isCurrentUser: boolean;
  dropdownHandler: () => void;
};

const EditProfileAction = ({
  currentUser,
  isCurrentUser,
  dropdownHandler,
}: EditProfileActionProps) => {
  if (!isCurrentUser) {
    return null;
  }

  return (
    <Dialog>
      <DropdownMenuSeparator />

      <DialogTrigger asChild>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          Edit
        </DropdownMenuItem>
      </DialogTrigger>

      {/* Displays Edit form content */}
      <DialogContent className="w-[90%]">
        <ScrollArea className="h-[80vh]">
          <EditProfileForm user={currentUser} closeDropdown={dropdownHandler} />
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfileAction;

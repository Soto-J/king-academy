import PlayerCard from "../../player-card";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { User } from "@/lib/action-helpers/user-service";

type ViewProfileActionProps = {
  player: User;
};

const ViewProfileAction = ({ player }: ViewProfileActionProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          View profile
        </DropdownMenuItem>
      </DialogTrigger>

      <DialogContent className="h-[80vh] w-[90%]">
        <ScrollArea className="h-full">
          <PlayerCard player={player} />
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default ViewProfileAction;

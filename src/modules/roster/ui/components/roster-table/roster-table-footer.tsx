import { Users, UserCheck, UserX } from "lucide-react";
import { TableCell, TableFooter, TableRow } from "@/components/ui/table";

interface RosterTableFooterProps {
  isAdmin: boolean;
  totalPlayers: number;
  totalActive: number;
}

export const RosterTableFooter = ({
  isAdmin,
  totalPlayers,
  totalActive,
}: RosterTableFooterProps) => {
  const colSpan = isAdmin ? 5 : 4;
  const totalInactive = totalPlayers - totalActive;

  return (
    <TableFooter className=" ">
      <TableRow className="border-border/30 bg-muted/20 border-t-2">
        <TableCell colSpan={colSpan} className="py-4">
          <div className="flex gap-4">
            {/* Total Players */}
            <div className="flex items-center gap-1">
              <Users className="text-muted-foreground size-4" />

              <span className="text-foreground text-xs font-bold">
                {totalPlayers}
              </span>
            </div>

            {/* Active/Inactive Split */}
            <div className="flex items-center gap-1">
              <UserCheck className="text-primary size-4" />
              <span className="text-primary text-xs font-semibold">
                {totalActive}
              </span>
            </div>

            <div className="flex items-center gap-1 text-xs">
              <UserX className="text-destructive size-4" />
              <span className="text-destructive font-semibold">
                {totalInactive}
              </span>
            </div>
          </div>
        </TableCell>
      </TableRow>
    </TableFooter>
  );
};

import { Activity } from "react";

import { calculateAge, cn } from "@/lib/utils";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";

import { TableActions } from "../table-actions";
import { RosterGetMany } from "@/modules/roster/types";

interface RosterTableBodyProps {
  roster: RosterGetMany["players"];
  isAdmin: boolean;
}

export const RosterTableBody = ({ roster, isAdmin }: RosterTableBodyProps) => {
  return (
    <TableBody>
      {roster.map((player, i) => (
        <TableRow
          key={player.id}
          className={cn(
            "border-border/10 hover:bg-muted/20",
            i % 2 == 0 && "bg-muted/40",
          )}
        >
          <TableCell className="text-foreground font-medium">
            {player.name}
          </TableCell>
          <TableCell className="text-muted-foreground text-center">
            {player.position}
          </TableCell>
          <TableCell className="text-muted-foreground text-center">
            {player.school}
          </TableCell>
          <TableCell className="text-center">
            <span
              className={cn(
                "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
                player.isActive
                  ? "bg-primary/10 text-primary"
                  : "bg-destructive/10 text-destructive",
              )}
            >
              {player.isActive ? "Active" : "Inactive"}
            </span>
          </TableCell>

          <Activity mode={isAdmin ? "visible" : "hidden"}>
            <TableCell className="text-center">
              <TableActions player={player} />
            </TableCell>
          </Activity>
        </TableRow>
      ))}
    </TableBody>
  );
};

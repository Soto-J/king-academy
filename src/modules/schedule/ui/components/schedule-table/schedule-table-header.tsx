import { Activity } from "react";

import { TableHeader, TableRow, TableHead } from "@/components/ui/table";

interface ScheduleTableHeaderProps {
  isAdmin: boolean;
}

export const ScheduleTableHeader = ({ isAdmin }: ScheduleTableHeaderProps) => {
  return (
    <TableHeader>
      <TableRow className="border-border/20">
        <TableHead className="text-muted-foreground">Game #</TableHead>
        <TableHead className="text-muted-foreground">Date</TableHead>
        <TableHead className="text-muted-foreground">Start Time</TableHead>
        <TableHead className="text-muted-foreground text-center">
          End Time
        </TableHead>
        <TableHead className="text-muted-foreground">Division</TableHead>
        <TableHead className="text-muted-foreground">Visiting Team</TableHead>
        <TableHead className="text-muted-foreground">Home Team</TableHead>
        <TableHead className="text-muted-foreground">Location</TableHead>
        <TableHead className="text-muted-foreground">Status</TableHead>

        <Activity mode={isAdmin ? "visible" : "hidden"}>
          <TableHead className="text-muted-foreground pr-6 text-right">
            Actions
          </TableHead>
        </Activity>
      </TableRow>
    </TableHeader>
  );
};

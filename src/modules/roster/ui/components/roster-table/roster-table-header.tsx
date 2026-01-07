import { Activity } from "react";

import { TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface RosterTableHeaderProps {
  isAdmin: boolean;
}

export const RosterTableHeader = ({ isAdmin }: RosterTableHeaderProps) => {
  return (
    <TableHeader>
      <TableRow className="bg-muted/10">
        <TableHead className="text-muted-foreground">Name</TableHead>
        <TableHead className="text-muted-foreground text-center">
          Position
        </TableHead>
        <TableHead className="text-muted-foreground truncate text-center">
          School
        </TableHead>
        <TableHead className="text-muted-foreground text-center">
          Status
        </TableHead>

        <Activity mode={isAdmin ? "visible" : "hidden"}>
          <TableHead className="text-muted-foreground text-center">
            Actions
          </TableHead>
        </Activity>
      </TableRow>
    </TableHeader>
  );
};

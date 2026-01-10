import { TableHeader, TableRow, TableHead } from "@/components/ui/table";

interface ScheduleTableHeaderProps {
  isAdmin: boolean;
}

export default function ScheduleTableHeader({
  isAdmin,
}: ScheduleTableHeaderProps) {
  return (
    <TableHeader>
      <TableRow className="border-border/20">
        <TableHead className="text-muted-foreground">Game #</TableHead>
        <TableHead className="text-muted-foreground text-center">
          Date
        </TableHead>
        <TableHead className="text-muted-foreground">Start Time</TableHead>

        <TableHead className="text-muted-foreground">Visiting Team</TableHead>
        <TableHead className="text-muted-foreground">Home Team</TableHead>
        <TableHead className="text-muted-foreground text-center">
          Location
        </TableHead>
        {/* <TableHead className="text-muted-foreground text-center">
          Status
        </TableHead> */}
      </TableRow>
    </TableHeader>
  );
}

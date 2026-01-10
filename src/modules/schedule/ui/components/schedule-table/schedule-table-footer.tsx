import { TableFooter, TableRow, TableCell } from "@/components/ui/table";

interface ScheduleTableFooter {
  isAdmin: boolean;
  totalGames: number;
}

export const ScheduleTableFooter = ({
  isAdmin,
  totalGames,
}: ScheduleTableFooter) => {
  return (
    <TableFooter>
      <TableRow className="border-border/20">
        <TableCell colSpan={isAdmin ? 9 : 8} className="text-muted-foreground">
          Total Season Games
        </TableCell>

        <TableCell className="text-foreground text-right font-medium">
          {totalGames}
        </TableCell>
      </TableRow>
    </TableFooter>
  );
};

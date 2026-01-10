import { Activity } from "react";
import { format, parse } from "date-fns";
import { MapPin, Edit3, Trash } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { TableBody, TableRow, TableCell } from "@/components/ui/table";
import { ScheduleGetMany, ScheduleGetOne } from "@/modules/schedule/types";

interface ScheduleTableBodyProps {
  isAdmin: boolean;
  schedules: ScheduleGetMany;
  onEdit: (schedule: ScheduleGetOne) => void;
  onDelete: (scheduleId: string) => void;
}

export const ScheduleTableBody = ({
  isAdmin,
  schedules,
  onEdit,
  onDelete,
}: ScheduleTableBodyProps) => {
  return (
    <TableBody>
      {schedules?.map((schedule, index) => {
        if (!schedule) return null;

        const isHomeschedule = schedule.homeTeam === "King Academy";
        const isUpcoming = schedule.date
          ? new Date(schedule.date) >= new Date()
          : false;

        return (
          <TableRow
            key={schedule.id}
            className={cn(
              "border-border/10 hover:bg-muted/30 h-16",
              index % 2 === 0 ? "bg-secondary" : "bg-accent",
            )}
          >
            <TableCell className="text-foreground pl-6 font-medium">
              {schedule.gameNumber}
            </TableCell>
            <TableCell className="text-foreground font-medium">
              {format(schedule.date, "MM/dd/yy")}
            </TableCell>
            <TableCell className="text-muted-foreground">
              {format(
                parse(schedule.startTime, "HH:mm:ss", new Date()),
                "h:mm a",
              )}
            </TableCell>
            <TableCell className="text-muted-foreground">
              {format(
                parse(schedule.endTime, "HH:mm:ss", new Date()),
                "h:mm a",
              )}
            </TableCell>
            <TableCell className="text-muted-foreground">
              {schedule.division}
            </TableCell>
            <TableCell
              className={cn(
                schedule.visitingTeam === "King Academy"
                  ? "text-primary font-semibold"
                  : "text-muted-foreground",
              )}
            >
              {schedule.visitingTeam}
            </TableCell>
            <TableCell
              className={cn(
                schedule.homeTeam === "King Academy"
                  ? "text-primary font-semibold"
                  : "text-muted-foreground",
              )}
            >
              {schedule.homeTeam}
            </TableCell>

            <TableCell className="text-muted-foreground">
              <div className="flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                <span>{schedule.location}</span>
              </div>
            </TableCell>

            <TableCell>
              <div className="flex flex-col items-start gap-1">
                <span
                  className={cn(
                    "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
                    isHomeschedule
                      ? "bg-green-500/10 text-green-600"
                      : "bg-blue-500/10 text-blue-600",
                  )}
                >
                  {isHomeschedule ? "HOME" : "AWAY"}
                </span>

                {isUpcoming && (
                  <span className="inline-flex items-center rounded-full bg-orange-500/10 px-2.5 py-0.5 text-xs font-medium text-orange-600">
                    UPCOMING
                  </span>
                )}
              </div>
            </TableCell>

            <Activity mode={isAdmin ? "visible" : "hidden"}>
              <TableCell className="pr-4 text-right">
                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onEdit(schedule)}
                    className="h-6 w-6"
                  >
                    <Edit3 className="h-4 w-4" />
                  </Button>

                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => onDelete(schedule.id)}
                    className="h-6 w-6"
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </Activity>
          </TableRow>
        );
      })}
    </TableBody>
  );
};

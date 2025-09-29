"use client";

import { useConfirm } from "@/hooks/use-confirm";
import { toast } from "sonner";
import { Calendar, Edit3, MapPin, Trash } from "lucide-react";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";

import { cn } from "@/lib/utils";

import { ScheduleGetMany, ScheduleGetOne } from "@/modules/schedule/types";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface ScheduleTableProps {
  isAdmin: boolean;
  schedules: ScheduleGetMany;
  setSelectedSchedule: (schedule: ScheduleGetOne) => void;
}

export const ScheduleTable = ({
  isAdmin,
  schedules,
  setSelectedSchedule,
}: ScheduleTableProps) => {
  const [ConfirmationDialog, confirmDelete] = useConfirm({
    title: "Delete Schedule",
    description: "Are you sure? This action can't be undone.",
  });

  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const deleteSchedule = useMutation(
    trpc.schedule.delete.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(
          trpc.schedule.getMany.queryOptions(),
        );

        toast.success("Schedule successfully deleted.");
      },
      onError: (error) => {
        console.error(error);
      },
    }),
  );

  const onEdit = (schedule: ScheduleGetOne) => {
    setSelectedSchedule(schedule);
  };

  const onDelete = async (scheduleId: string) => {
    const OK = await confirmDelete();

    if (!OK) return;

    deleteSchedule.mutate({ scheduleId });
  };

  const totalGames = schedules.length;
  return (
    <>
      <ConfirmationDialog />

      <Card className="from-muted/30 to-primary/5 border-border/20 bg-gradient-to-br">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Season Schedule - 7U Hybrid Division
          </CardTitle>
        </CardHeader>

        <CardContent className="p-0">
          <Table>
            <TableCaption className="text-muted-foreground">
              King Academy soccer schedule for the 2025 season.
            </TableCaption>

            <TableHeader>
              <TableRow className="border-border/20">
                <TableHead className="text-muted-foreground">Game #</TableHead>
                <TableHead className="text-muted-foreground">Date</TableHead>
                <TableHead className="text-muted-foreground">Time</TableHead>
                <TableHead className="text-muted-foreground">
                  End Time
                </TableHead>
                <TableHead className="text-muted-foreground">
                  Division
                </TableHead>
                <TableHead className="text-muted-foreground">
                  Visiting Team
                </TableHead>
                <TableHead className="text-muted-foreground">
                  Home Team
                </TableHead>
                <TableHead className="text-muted-foreground">
                  Location
                </TableHead>
                <TableHead className="text-muted-foreground">Status</TableHead>
                {isAdmin && (
                  <TableHead className="text-muted-foreground pr-6 text-right">
                    Actions
                  </TableHead>
                )}
              </TableRow>
            </TableHeader>

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
                      {schedule.date
                        ? new Date(schedule.date).toLocaleDateString()
                        : "TBD"}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {schedule.startTime}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {schedule.endTime}
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
                        {schedule.location}
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
                    {isAdmin && (
                      <TableCell className="pr-4 text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onEdit(schedule)}
                            className="h-8 w-8 p-0"
                          >
                            <Edit3 className="h-4 w-4" />
                          </Button>

                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => onDelete(schedule.id)}
                            className="h-8 w-8 p-0"
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    )}
                  </TableRow>
                );
              })}
            </TableBody>

            <TableFooter>
              <TableRow className="border-border/20">
                <TableCell
                  colSpan={isAdmin ? 9 : 8}
                  className="text-muted-foreground"
                >
                  Total Season Games
                </TableCell>

                <TableCell className="text-foreground text-right font-medium">
                  {totalGames}
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </CardContent>
      </Card>
    </>
  );
};

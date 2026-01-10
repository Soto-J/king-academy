"use client";

import { useConfirm } from "@/hooks/use-confirm";
import { toast } from "sonner";
import { Calendar } from "lucide-react";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";

import { ScheduleGetMany, ScheduleGetOne } from "@/modules/schedule/types";

import { ScheduleTableHeader } from "./schedule-table-header";
import { ScheduleTableBody } from "./schedule-table-body";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableCaption } from "@/components/ui/table";
import { ScheduleTableFooter } from "./schedule-table-footer";

interface ScheduleTableProps {
  isAdmin: boolean;
  schedules: ScheduleGetMany;
  setSelectedSchedule: (schedule: ScheduleGetOne) => void;
  onOpenDialog: () => void;
}

export const ScheduleTable = ({
  isAdmin,
  schedules,
  setSelectedSchedule,
  onOpenDialog,
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
    onOpenDialog();
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

            <ScheduleTableHeader isAdmin={isAdmin} />
            <ScheduleTableBody
              isAdmin={isAdmin}
              schedules={schedules}
              onEdit={onEdit}
              onDelete={onDelete}
            />
            <ScheduleTableFooter isAdmin={isAdmin} totalGames={totalGames} />
          </Table>
        </CardContent>
      </Card>
    </>
  );
};

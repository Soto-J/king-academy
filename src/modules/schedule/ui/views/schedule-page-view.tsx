"use client";

import { useState } from "react";

import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";

import { ScheduleGetOne } from "@/modules/schedule/types";

import { ScheduleHeader } from "@/modules/schedule/ui/components/schedule-header";
import { ScheduleStats } from "@/modules/schedule/ui/components/schedule-stats";
import { ScheduleTable } from "@/modules/schedule/ui/components/schedule-table";
import { ScheduleDialog } from "@/modules/schedule/ui/components/schedule-dialog";

interface SchedulePageViewProps {
  isAdmin: boolean;
}

export const SchedulePageView = ({ isAdmin }: SchedulePageViewProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSchedule, setSelectedSchedule] =
    useState<ScheduleGetOne | null>(null);

  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.schedule.getMany.queryOptions());

  const totalGames = data.length;
  const homeGames = data.filter(
    (game) => game.homeTeam === "King Academy",
  ).length;
  const awayGames = totalGames - homeGames;
  const upcomingGames = data.filter(
    (game) => new Date(game.date) >= new Date(),
  ).length;

  return (
    <>
      <ScheduleDialog
        onOpenDialog={isOpen}
        onCloseDialog={() => {
          setIsOpen(false);
          setSelectedSchedule(null);
        }}
        initialValues={selectedSchedule}
        mode={selectedSchedule ? "Edit" : "Create"}
      />

      <div className="space-y-8">
        <ScheduleHeader
          isAdmin={isAdmin}
          onOpenDialog={() => setIsOpen(true)}
        />

        <ScheduleStats
          totalGames={totalGames}
          homeGames={homeGames}
          awayGames={awayGames}
          upcomingGames={upcomingGames}
        />

        <ScheduleTable
          isAdmin={isAdmin}
          schedules={data}
          setSelectedSchedule={(schedule) => setSelectedSchedule(schedule)}
          onOpenDialog={() => setIsOpen(true)}
        />
      </div>
    </>
  );
};

"use client";

import { useState } from "react";

import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";

import { ScheduleGetOne } from "@/modules/schedule/types";
import { scheduleData } from "../../data";

import { ScheduleHeader } from "@/modules/schedule/ui/components/schedule-header";
import { ScheduleStats } from "@/modules/schedule/ui/components/schedule-stats";
import { ScheduleTable } from "@/modules/schedule/ui/components/schedule-table";
import { ScheduleDialog } from "../components/schedule-dialog";

export const SchedulePageView = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scheduleSelected, setScheduleSelected] =
    useState<ScheduleGetOne | null>(null);

  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.schedule.getMany.queryOptions());

  const totalGames = scheduleData.length;
  const homeGames = scheduleData.filter(
    (game) => game.homeTeam === "King Academy",
  ).length;
  const awayGames = totalGames - homeGames;
  const upcomingGames = scheduleData.filter(
    (game) => new Date(game.date) >= new Date(),
  ).length;

  return (
    <>
      <ScheduleDialog
        onOpenDialog={isOpen}
        onCloseDialog={() => setIsOpen(false)}
        initialValues={scheduleSelected}
        mode="Create"
      />

      <div className="space-y-8">
        <ScheduleHeader onOpenDialog={() => setIsOpen(true)} />

        <ScheduleStats
          totalGames={totalGames}
          homeGames={homeGames}
          awayGames={awayGames}
          upcomingGames={upcomingGames}
        />

        <ScheduleTable schedules={data} />
      </div>
    </>
  );
};

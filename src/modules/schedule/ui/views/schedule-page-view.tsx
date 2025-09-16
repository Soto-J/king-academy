import { scheduleData } from "../../data";

import { ScheduleHeader } from "@/modules/schedule/ui/components/schedule-header";
import { ScheduleStats } from "@/modules/schedule/ui/components/schedule-stats";
import { ScheduleTable } from "@/modules/schedule/ui/components/schedule-table";

export const SchedulePageView = () => {
  const totalGames = scheduleData.length;
  const homeGames = scheduleData.filter(
    (game) => game.homeTeam === "King Academy",
  ).length;
  const awayGames = totalGames - homeGames;
  const upcomingGames = scheduleData.filter(
    (game) => new Date(game.date) >= new Date(),
  ).length;

  return (
    <div className="space-y-8">
      <ScheduleHeader />

      <ScheduleStats
        totalGames={totalGames}
        homeGames={homeGames}
        awayGames={awayGames}
        upcomingGames={upcomingGames}
      />

      <ScheduleTable />
    </div>
  );
};

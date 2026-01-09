import { Clock, Home, MapPin, Trophy } from "lucide-react";

import { cn } from "@/lib/utils";

interface ScheduleStatsProps {
  totalGames: number;
  homeGames: number;
  awayGames: number;
  upcomingGames: number;
}

export const ScheduleStats = ({
  totalGames,
  homeGames,
  awayGames,
  upcomingGames,
}: ScheduleStatsProps) => {
  const content = [
    {
      title: "Total Games",
      value: totalGames,
      icon: Trophy,
      iconColor: "text-primary",
      bgColor: "from-primary/20 to-primary/5",
    },
    {
      title: "Home Games",
      value: homeGames,
      icon: Home,
      iconColor: "text-green-600",
      bgColor: "from-green-500/10 to-green-500/5",
    },
    {
      title: "Away Games",
      value: awayGames,
      icon: MapPin,
      iconColor: "text-blue-600",
      bgColor: "from-blue-500/10 to-blue-500/5",
    },
    {
      title: "Upcoming",
      value: upcomingGames,
      icon: Clock,
      iconColor: "text-orange-600",
      bgColor: "from-orange-500/10 to-orange-500/5",
    },
  ] as const;

  return (
    <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
      {content.map(({ title, value, icon: Icon, iconColor, bgColor }) => (
        <div
          key={title}
          className={cn(
            "border-border/20 rounded-lg bg-gradient-to-br p-2",
            bgColor,
          )}
        >
          <div className="flex flex-row items-center justify-between space-y-0">
            <div className="text-muted-foreground text-sm font-medium">
              <Icon className={cn("h-4 w-4", iconColor)} />
              {title}
            </div>

            <div className="text-foreground font-semi-bold">
              {value}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

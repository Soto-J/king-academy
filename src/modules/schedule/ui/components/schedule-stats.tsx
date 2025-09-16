import { Clock, Home, MapPin, Trophy } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
  return (
    <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
      <Card className="from-primary/10 to-primary/5 border-border/20 bg-gradient-to-br">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-muted-foreground text-sm font-medium">
            Total Games
          </CardTitle>

          <Trophy className="text-primary h-4 w-4" />
        </CardHeader>

        <CardContent>
          <div className="text-foreground text-2xl font-bold">{totalGames}</div>
        </CardContent>
      </Card>

      <Card className="border-border/20 bg-gradient-to-br from-green-500/10 to-green-500/5">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-muted-foreground text-sm font-medium">
            Home Games
          </CardTitle>

          <Home className="h-4 w-4 text-green-600" />
        </CardHeader>

        <CardContent>
          <div className="text-foreground text-2xl font-bold">{homeGames}</div>
        </CardContent>
      </Card>

      <Card className="border-border/20 bg-gradient-to-br from-blue-500/10 to-blue-500/5">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-muted-foreground text-sm font-medium">
            Away Games
          </CardTitle>

          <MapPin className="h-4 w-4 text-blue-600" />
        </CardHeader>

        <CardContent>
          <div className="text-foreground text-2xl font-bold">{awayGames}</div>
        </CardContent>
      </Card>

      <Card className="border-border/20 bg-gradient-to-br from-orange-500/10 to-orange-500/5">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-muted-foreground text-sm font-medium">
            Upcoming
          </CardTitle>

          <Clock className="h-4 w-4 text-orange-600" />
        </CardHeader>

        <CardContent>
          <div className="text-foreground text-2xl font-bold">
            {upcomingGames}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

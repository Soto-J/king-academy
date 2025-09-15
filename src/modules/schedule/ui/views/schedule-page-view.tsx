import { Calendar, Clock, MapPin, Trophy, Users, Home } from "lucide-react";

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

import { scheduleData } from "../../data";

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
      {/* Background decorative elements */}
      <div className="bg-primary/5 absolute -top-20 -right-20 h-40 w-40 rounded-full blur-3xl" />
      <div className="bg-brand-red/5 absolute top-1/3 -left-20 h-32 w-32 rounded-full blur-2xl" />

      {/* Header Section */}
      <div className="relative">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-foreground text-3xl font-bold">
              Game Schedule
            </h1>
            <p className="text-muted-foreground mt-2">
              Complete schedule for King Academy 7U Hybrid Division
            </p>
          </div>
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <Calendar className="mr-2 h-4 w-4" />
            Add to Calendar
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-4">
        <Card className="from-primary/10 to-primary/5 border-border/20 bg-gradient-to-br">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-muted-foreground text-sm font-medium">
              Total Games
            </CardTitle>
            <Trophy className="text-primary h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-foreground text-2xl font-bold">
              {totalGames}
            </div>
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
            <div className="text-foreground text-2xl font-bold">
              {homeGames}
            </div>
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
            <div className="text-foreground text-2xl font-bold">
              {awayGames}
            </div>
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

      {/* Schedule Table */}
      <Card className="from-muted/30 to-primary/5 border-border/20 bg-gradient-to-br">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Season Schedule - 7U Hybrid Division
          </CardTitle>
        </CardHeader>
        <CardContent>
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
                <TableHead className="text-muted-foreground text-right">
                  Status
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {scheduleData.map((game, index) => {
                const isHomeGame = game.homeTeam === "King Academy";
                const isUpcoming = new Date(game.date) >= new Date();

                return (
                  <TableRow
                    key={game.id}
                    className={`border-border/10 hover:bg-muted/30 h-16 ${
                      index % 2 === 0 ? "bg-secondary" : "bg-accent"
                    }`}
                  >
                    <TableCell className="text-foreground pl-6 font-medium">
                      {game.id}
                    </TableCell>
                    <TableCell className="text-foreground font-medium">
                      {game.date}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {game.time}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {game.endTime}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {game.division}
                    </TableCell>
                    <TableCell
                      className={`${game.visitingTeam === "King Academy" ? "text-primary font-semibold" : "text-muted-foreground"}`}
                    >
                      {game.visitingTeam}
                    </TableCell>
                    <TableCell
                      className={`${game.homeTeam === "King Academy" ? "text-primary font-semibold" : "text-muted-foreground"}`}
                    >
                      {game.homeTeam}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {game.location}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex flex-col items-end gap-1">
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            isHomeGame
                              ? "bg-green-500/10 text-green-600"
                              : "bg-blue-500/10 text-blue-600"
                          }`}
                        >
                          {isHomeGame ? "HOME" : "AWAY"}
                        </span>
                        {isUpcoming && (
                          <span className="inline-flex items-center rounded-full bg-orange-500/10 px-2.5 py-0.5 text-xs font-medium text-orange-600">
                            UPCOMING
                          </span>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
            <TableFooter>
              <TableRow className="border-border/20">
                <TableCell colSpan={8} className="text-muted-foreground">
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
    </div>
  );
};

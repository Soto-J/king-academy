import { Calendar, MapPin } from "lucide-react";

import { cn } from "@/lib/utils";

import { scheduleData } from "../../data";

import { ScheduleGetMany } from "@/modules/schedule/types";

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
  schedules: ScheduleGetMany;
}
export const ScheduleTable = ({ schedules }: ScheduleTableProps) => {
  const totalGames = scheduleData.length;

  return (
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
              <TableHead className="text-muted-foreground hidden md:table-cell">
                End Time
              </TableHead>
              <TableHead className="text-muted-foreground hidden lg:table-cell">
                Division
              </TableHead>
              <TableHead className="text-muted-foreground">
                Visiting Team
              </TableHead>
              <TableHead className="text-muted-foreground">Home Team</TableHead>
              <TableHead className="text-muted-foreground hidden sm:table-cell">
                Location
              </TableHead>
              <TableHead className="text-muted-foreground pr-4 text-right">
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
                  className={cn(
                    "border-border/10 hover:bg-muted/30 h-16",
                    index % 2 === 0 ? "bg-secondary" : "bg-accent",
                  )}
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
                  <TableCell className="text-muted-foreground hidden md:table-cell">
                    {game.endTime}
                  </TableCell>
                  <TableCell className="text-muted-foreground hidden lg:table-cell">
                    {game.division}
                  </TableCell>
                  <TableCell
                    className={cn(
                      game.visitingTeam === "King Academy"
                        ? "text-primary font-semibold"
                        : "text-muted-foreground",
                    )}
                  >
                    {game.visitingTeam}
                  </TableCell>
                  <TableCell
                    className={cn(
                      game.homeTeam === "King Academy"
                        ? "text-primary font-semibold"
                        : "text-muted-foreground",
                    )}
                  >
                    {game.homeTeam}
                  </TableCell>

                  <TableCell className="text-muted-foreground hidden sm:table-cell">
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
  );
};

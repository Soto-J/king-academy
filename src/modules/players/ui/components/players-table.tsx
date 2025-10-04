"use client";

import { User, Award, Calendar } from "lucide-react";

import { GetPlayers } from "@/modules/players/server/types";

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

interface PlayersTableProps {
  data: GetPlayers;
}

export const PlayersTable = ({ data }: PlayersTableProps) => {
  const calculateAge = (dob: Date | null) => {
    if (!dob) return "N/A";

    const today = new Date();
    const age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();

    return monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())
      ? age - 1
      : age;
  };

  const players = data.players.map((player) => ({
    id: player.id,
    name: player.name || "N/A",
    position: player.position || "N/A",
    age: calculateAge(player.dob),
    team: player.school || "N/A",
    battingAvg: "N/A",
    status: player.isActive ? "Active" : "Inactive",
  }));

  const averageBattingAvg = "N/A";

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Card className="from-primary/10 to-primary/5 border-border/20 bg-gradient-to-br">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-muted-foreground text-sm font-medium">
              Total Players
            </CardTitle>

            <User className="text-primary h-4 w-4" />
          </CardHeader>

          <CardContent>
            <div className="text-foreground text-2xl font-bold">
              {data.totalPlayers}
            </div>
          </CardContent>
        </Card>

        <Card className="from-primary/10 to-primary/5 border-border/20 bg-gradient-to-br">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-muted-foreground text-sm font-medium">
              Active Players
            </CardTitle>
            <Award className="text-primary h-4 w-4" />
          </CardHeader>

          <CardContent>
            <div className="text-foreground text-2xl font-bold">
              {data.totalActive}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="from-muted/30 to-primary/5 border-border/20 bg-gradient-to-br">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <User className="h-5 w-5" />
            Player Roster
          </CardTitle>
        </CardHeader>

        <CardContent>
          <Table>
            <TableCaption className="text-muted-foreground">
              Complete roster of King Academy baseball players.
            </TableCaption>
            <TableHeader>
              <TableRow className="border-border/20">
                <TableHead className="text-muted-foreground">Name</TableHead>
                <TableHead className="text-muted-foreground">
                  Position
                </TableHead>
                <TableHead className="text-muted-foreground">Age</TableHead>
                <TableHead className="text-muted-foreground">School</TableHead>
                <TableHead className="text-muted-foreground text-right">
                  Batting Avg
                </TableHead>
                <TableHead className="text-muted-foreground text-right">
                  Status
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {players.map((player) => (
                <TableRow
                  key={player.id}
                  className="border-border/10 hover:bg-muted/20"
                >
                  <TableCell className="text-foreground font-medium">
                    {player.name}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {player.position}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {player.age}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {player.team}
                  </TableCell>
                  <TableCell className="text-foreground text-right font-mono">
                    {player.battingAvg}
                  </TableCell>
                  <TableCell className="text-right">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        player.status === "Active"
                          ? "bg-primary/10 text-primary"
                          : "bg-destructive/10 text-destructive"
                      }`}
                    >
                      {player.status}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>

            <TableFooter>
              <TableRow className="border-border/20">
                <TableCell colSpan={5} className="text-muted-foreground">
                  Total Players
                </TableCell>
                <TableCell className="text-foreground text-right font-medium">
                  {data.totalPlayers}
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

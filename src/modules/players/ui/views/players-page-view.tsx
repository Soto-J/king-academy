import { User, Award, Calendar, MapPin } from "lucide-react";

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

const players = [
  {
    id: "P001",
    name: "Alex Rodriguez",
    position: "Shortstop",
    age: 16,
    team: "Lions",
    battingAvg: ".285",
    status: "Active",
  },
  {
    id: "P002",
    name: "Mike Chen",
    position: "Pitcher",
    age: 15,
    team: "Eagles",
    battingAvg: ".198",
    status: "Active",
  },
  {
    id: "P003",
    name: "Sarah Johnson",
    position: "Catcher",
    age: 17,
    team: "Hawks",
    battingAvg: ".321",
    status: "Active",
  },
  {
    id: "P004",
    name: "David Martinez",
    position: "First Base",
    age: 16,
    team: "Lions",
    battingAvg: ".267",
    status: "Injured",
  },
  {
    id: "P005",
    name: "Emma Thompson",
    position: "Outfield",
    age: 15,
    team: "Eagles",
    battingAvg: ".289",
    status: "Active",
  },
  {
    id: "P006",
    name: "Ryan Walsh",
    position: "Second Base",
    age: 17,
    team: "Hawks",
    battingAvg: ".245",
    status: "Active",
  },
  {
    id: "P007",
    name: "Olivia Parker",
    position: "Third Base",
    age: 16,
    team: "Lions",
    battingAvg: ".312",
    status: "Active",
  },
];

export const PlayersPageView = () => {
  const totalPlayers = players.length;
  const activePlayers = players.filter((p) => p.status === "Active").length;
  const averageBattingAvg = (
    players.reduce((sum, p) => sum + parseFloat(p.battingAvg), 0) /
    players.length
  ).toFixed(3);

  return (
    <div className="space-y-8">
      {/* Background decorative elements */}
      <div className="bg-primary/5 absolute -top-20 -right-20 h-40 w-40 rounded-full blur-3xl" />
      <div className="bg-brand-red/5 absolute top-1/3 -left-20 h-32 w-32 rounded-full blur-2xl" />

      {/* Header Section */}
      <div className="relative">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-foreground text-3xl font-bold">Players</h1>
            <p className="text-muted-foreground mt-2">
              Manage and track all players in the King Academy program
            </p>
          </div>
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
            Add New Player
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        <Card className="from-primary/10 to-primary/5 border-border/20 bg-gradient-to-br">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-muted-foreground text-sm font-medium">
              Total Players
            </CardTitle>
            <User className="text-primary h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-foreground text-2xl font-bold">
              {totalPlayers}
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
              {activePlayers}
            </div>
          </CardContent>
        </Card>

        <Card className="from-primary/10 to-primary/5 border-border/20 bg-gradient-to-br">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-muted-foreground text-sm font-medium">
              Avg Batting
            </CardTitle>
            <Calendar className="text-primary h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-foreground text-2xl font-bold">
              {averageBattingAvg}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Players Table */}
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
                <TableHead className="text-muted-foreground">
                  Player ID
                </TableHead>
                <TableHead className="text-muted-foreground">Name</TableHead>
                <TableHead className="text-muted-foreground">
                  Position
                </TableHead>
                <TableHead className="text-muted-foreground">Age</TableHead>
                <TableHead className="text-muted-foreground">Team</TableHead>
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
                    {player.id}
                  </TableCell>
                  <TableCell className="text-foreground">
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
                <TableCell colSpan={6} className="text-muted-foreground">
                  Total Players
                </TableCell>
                <TableCell className="text-foreground text-right font-medium">
                  {totalPlayers}
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

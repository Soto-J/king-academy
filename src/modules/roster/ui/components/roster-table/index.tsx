"use client";

import { User } from "lucide-react";

import { RosterGetMany } from "@/modules/roster/types";

import { RosterTableHeader } from "./roster-table-header";
import { RosterTableBody } from "./roster-table-body";
import { RosterTableFooter } from "./roster-table-footer";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableCaption } from "@/components/ui/table";

interface RosterTableProps {
  isAdmin: boolean;
  data: RosterGetMany;
}

export const RosterTable = ({ isAdmin, data }: RosterTableProps) => {
  const players = data.players.map((player) => ({
    ...player,
    position: player.position || "N/A",
    battingAvg: "N/A",
  }));

  return (
    <div className="space-y-8">
      <Card className="from-muted/30 to-primary/5 border-border/20 bg-gradient-to-br">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <User className="h-5 w-5" />
            Player Roster
          </CardTitle>
        </CardHeader>

        <CardContent>
          <Table>
            <RosterTableHeader isAdmin={isAdmin} />
            <RosterTableBody roster={data.players} isAdmin={isAdmin} />
            <RosterTableFooter
              isAdmin={isAdmin}
              totalPlayers={data.totalPlayers}
              totalActive={data.totalActive}
            />

            <TableCaption className="text-muted-foreground text-center">
              Complete roster of King Academy baseball players.
            </TableCaption>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

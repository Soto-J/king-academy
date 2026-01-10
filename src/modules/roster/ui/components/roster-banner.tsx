import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, User } from "lucide-react";

interface RosterPageBannersProps {
  totalActive: number;
  totalPlayers: number;
}

export default function RosterPageBanners ({
  totalActive,
  totalPlayers,
}: RosterPageBannersProps)  {
  return (
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
            {totalActive}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

import { Trophy } from "lucide-react";
import { BiBaseball } from "react-icons/bi";
import { PiBaseballHelmetDuotone } from "react-icons/pi";
import { GiBaseballGlove } from "react-icons/gi";

import { ProfileGetOne } from "@/modules/profile/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface BaseballProfileProps {
  baseballProfile: ProfileGetOne["baseballProfile"];
}

export const BaseballProfile = ({ baseballProfile }: BaseballProfileProps) => {
  const formatPositionLabel = (position: string) => {
    return position
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const formatStanceLabel = (stance: string) => {
    return stance.charAt(0).toUpperCase() + stance.slice(1);
  };

  return (
    <Card className="from-muted/50 to-primary/10 border-border/20 bg-gradient-to-br shadow-md backdrop-blur-sm">
      <CardHeader className="from-primary/5 to-primary/10 bg-gradient-to-r">
        <CardTitle className="text-foreground flex items-center gap-2">
          <Trophy className="text-primary h-5 w-5" />
          Baseball Profile
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-8 pt-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="border-border/20 from-primary/10 to-primary/5 rounded-lg border bg-gradient-to-br p-6 text-center backdrop-blur-sm">
            <div className="text-primary mb-2 flex items-center justify-center gap-2">
              <GiBaseballGlove className="h-5 w-5" />
              <span className="text-sm font-semibold">Primary Position</span>
            </div>

            <p className="text-foreground text-lg font-bold">
              {baseballProfile?.positions?.[0]
                ? formatPositionLabel(baseballProfile.positions[0].position)
                : "Not specified"}
            </p>
          </div>

          <div className="border-border/20 from-secondary/10 to-secondary/5 rounded-lg border bg-gradient-to-br p-6 text-center backdrop-blur-sm">
            <div className="text-secondary-foreground mb-2 flex items-center justify-center gap-2">
              <PiBaseballHelmetDuotone className="h-5 w-5" />

              <span className="text-sm font-semibold">Batting Stance</span>
            </div>

            <p className="text-foreground text-lg font-bold">
              {baseballProfile?.battingStance
                ? formatStanceLabel(baseballProfile.battingStance)
                : "Not specified"}
            </p>
          </div>

          <div className="border-border/20 from-accent/10 to-accent/5 rounded-lg border bg-gradient-to-br p-6 text-center backdrop-blur-sm">
            <div className="text-accent-foreground mb-2 flex items-center justify-center gap-2">
              <BiBaseball className="h-5 w-5" />

              <span className="text-sm font-semibold">Throwing Arm</span>
            </div>

            <p className="text-foreground text-lg font-bold">
              {baseballProfile?.throwingArm
                ? formatStanceLabel(baseballProfile.throwingArm)
                : "Not specified"}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

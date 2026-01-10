import { MapPin } from "lucide-react";

import { ProfileGetOne } from "@/modules/profile/types";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ProfileLocationProps {
  address: ProfileGetOne["profile"]["address"];
}

export default function ProfileLocation({ address }: ProfileLocationProps) {
  const hasAddress = address?.street || address?.city || address?.state;

  if (!hasAddress) {
    return null;
  }

  return (
    <Card className="from-muted/50 to-primary/10 border-border/20 bg-gradient-to-br shadow-md backdrop-blur-sm">
      <CardHeader className="from-primary/5 to-primary/10 bg-gradient-to-r">
        <CardTitle className="text-foreground flex items-center gap-2">
          <MapPin className="text-primary h-5 w-5" />
          Location
        </CardTitle>
      </CardHeader>

      <CardContent className="pt-6">
        <div className="border-border/20 bg-card/50 rounded-lg border p-3 backdrop-blur-sm">
          {address?.street && (
            <p className="text-foreground mb-2 font-semibold">
              {address.street}
            </p>
          )}

          <p className="text-muted-foreground font-medium">
            {[address?.city, address?.state?.toUpperCase(), address?.zipCode]
              .filter(Boolean)
              .join(", ")}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

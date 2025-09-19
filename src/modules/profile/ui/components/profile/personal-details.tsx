import { format } from "date-fns";
import { User, Phone, GraduationCap, Calendar } from "lucide-react";

import { ProfileGetOne } from "@/modules/profile/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface PersonalDetailsProps {
  profile: ProfileGetOne["profile"];
}

export const PersonalDetails = ({ profile }: PersonalDetailsProps) => {
  const formatDate = (date: string | Date | null) => {
    if (!date) return "Not specified";
    return format(new Date(date), "MMMM d, yyyy");
  };

  return (
    <Card className="from-muted/50 to-primary/10 border-border/20 bg-gradient-to-br shadow-md backdrop-blur-sm">
      <CardHeader className="from-primary/5 to-primary/10 bg-gradient-to-r">
        <CardTitle className="text-foreground flex items-center gap-2">
          <User className="text-primary h-5 w-5" />
          Personal Details
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4 pt-6">
        {profile?.dateOfBirth && (
          <div className="border-border/20 bg-card/50 rounded-lg border p-3 backdrop-blur-sm">
            <div className="text-primary mb-1 flex items-center gap-2">
              <Calendar className="h-4 w-4" />

              <span className="text-sm font-semibold">Date of Birth</span>
            </div>

            <p className="text-foreground font-medium">
              {formatDate(profile.dateOfBirth)}
            </p>
          </div>
        )}

        {profile?.school && (
          <div className="border-border/20 bg-card/50 rounded-lg border p-3 backdrop-blur-sm">
            <div className="text-primary mb-1 flex items-center gap-2">
              <GraduationCap className="h-4 w-4" />

              <span className="text-sm font-semibold">School</span>
            </div>

            <p className="text-foreground font-medium">{profile.school}</p>
          </div>
        )}

        {profile?.phoneNumber && (
          <div className="border-border/20 bg-card/50 rounded-lg border p-3 backdrop-blur-sm">
            <div className="text-primary mb-1 flex items-center gap-2">
              <Phone className="h-4 w-4" />

              <span className="text-sm font-semibold">Phone</span>
            </div>
            
            <p className="text-foreground font-medium">{profile.phoneNumber}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

import { Activity } from "react";
import { User, Phone, GraduationCap, Calendar, Mail } from "lucide-react";

import { ProfileGetOne } from "@/modules/profile/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDate, formatPhoneNumber } from "@/lib/utils";

interface PersonalDetailsProps {
  profile: ProfileGetOne["profile"];
  email?: string;
}

export const PersonalDetails = ({ profile, email }: PersonalDetailsProps) => {
  return (
    <Card className="from-muted/50 to-primary/10 border-border/20 bg-gradient-to-br shadow-md backdrop-blur-sm">
      <CardHeader className="from-primary/5 to-primary/10 bg-gradient-to-r">
        <CardTitle className="text-foreground flex items-center gap-2">
          <User className="text-primary h-5 w-5" />
          Personal Details
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4 pt-6">
        <Activity mode={profile?.dateOfBirth ? "visible" : "hidden"}>
          <div className="border-border/20 bg-card/50 rounded-lg border p-3 backdrop-blur-sm">
            <div className="text-primary mb-1 flex items-center gap-2">
              <Calendar className="h-4 w-4" />

              <span className="text-sm font-semibold">Date of Birth</span>
            </div>

            <p className="text-foreground font-medium">
              {formatDate(profile.dateOfBirth)}
            </p>
          </div>
        </Activity>

        <Activity mode={profile?.school ? "visible" : "hidden"}>
          <div className="border-border/20 bg-card/50 rounded-lg border p-3 backdrop-blur-sm">
            <div className="text-primary mb-1 flex items-center gap-2">
              <GraduationCap className="h-4 w-4" />

              <span className="text-sm font-semibold">School</span>
            </div>

            <p className="text-foreground font-medium">{profile.school}</p>
          </div>
        </Activity>

        <Activity mode={email ? "visible" : "hidden"}>
          <div className="border-border/20 bg-card/50 rounded-lg border p-3 backdrop-blur-sm">
            <div className="text-primary mb-1 flex items-center gap-2">
              <Mail className="text-primary h-4 w-4" />

              <span className="text-sm font-semibold">Email</span>
            </div>

            <p className="text-foreground font-medium">{email}</p>
          </div>
        </Activity>
        <Activity mode={profile?.phoneNumber ? "visible" : "hidden"}>
          <div className="border-border/20 bg-card/50 rounded-lg border p-3 backdrop-blur-sm">
            <div className="text-primary mb-1 flex items-center gap-2">
              <Phone className="h-4 w-4" />

              <span className="text-sm font-semibold">Phone</span>
            </div>

            <p className="text-foreground font-medium">
              {formatPhoneNumber(profile.phoneNumber ?? "")}
            </p>
          </div>
        </Activity>
      </CardContent>
    </Card>
  );
};

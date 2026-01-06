import { Activity } from "react";
import { Calendar, Mail, Edit, Star } from "lucide-react";

import { calculateAge, getInitials } from "@/lib/utils";

import { ProfileGetOne } from "@/modules/profile/types";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AvatarUpload } from "@/components/avatar-upload";

interface ProfileHeaderProps {
  data: ProfileGetOne;
  onEditClick?: () => void;
  isOwnProfile?: boolean;
}

export const ProfileHeader = ({
  data,
  onEditClick,
  isOwnProfile = false,
}: ProfileHeaderProps) => {
  return (
    <Card className="from-primary/15 via-secondary/5 to-primary/15 border-border/20 relative overflow-hidden border bg-gradient-to-br shadow-xl backdrop-blur-sm">
      <div className="from-brand-red via-primary to-brand-red absolute top-0 left-0 h-1 w-full bg-gradient-to-r" />
      <Activity mode={isOwnProfile && onEditClick ? "visible" : "hidden"}>
        <Button
          variant="outline"
          size="sm"
          onClick={onEditClick}
          className="border-border/20 bg-card/70 text-foreground hover:bg-card hover:text-foreground absolute right-6 gap-2"
        >
          <Edit className="h-4 w-4" />
          Edit
        </Button>
      </Activity>

      <CardContent className="pt-10 pb-8">
        <div className="flex items-start gap-6 md:flex-row md:items-center">
          <AvatarUpload showButton={false} isOwnProfile={isOwnProfile}>
            <Avatar className="ring-primary/20 h-20 w-20 shadow-lg ring-4 lg:h-28 lg:w-28">
              <AvatarImage
                src={data.user.image || undefined}
                alt={data.user.name}
              />

              <AvatarFallback className="from-primary/10 to-primary/20 text-primary bg-gradient-to-br font-bold lg:text-2xl">
                {getInitials(data.user.name)}
              </AvatarFallback>
            </Avatar>
          </AvatarUpload>

          <div className="flex-1 space-y-4">
            <div className="flex items-center gap-1 lg:gap-4">
              <Star className="fill-primary/20 text-primary h-6 w-6 lg:h-8 lg:w-8" />

              <h1 className="text-foreground truncate text-3xl leading-tight font-bold text-wrap sm:text-4xl lg:text-5xl">
                {data.user.name}
              </h1>
            </div>

            {/* <div className="text-muted-foreground flex flex-wrap gap-2 text-xs sm:gap-4">
              <div className="bg-card/60 border-border/10 flex items-center gap-2 rounded-full border px-3 py-1">
                <Mail className="text-primary h-4 w-4" />
                {data.user.email}
              </div>

              {data.profile?.dateOfBirth && (
                <Badge
                  variant="secondary"
                  className="bg-card/60 border-border/10 flex items-center gap-2 rounded-full border px-3 py-1"
                >
                  <Calendar className="mr-1 h-3 w-3" />
                  Age {calculateAge(data.profile.dateOfBirth)}
                </Badge>
              )}
            </div> */}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

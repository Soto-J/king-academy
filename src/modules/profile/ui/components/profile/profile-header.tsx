import {
  Phone,
  GraduationCap,
  Calendar,
  Mail,
  Trophy,
  Target,
  Edit,
  Star,
  Zap,
} from "lucide-react";

import { ProfileGetOne } from "@/modules/profile/types";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

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
  const formatPositionLabel = (position: string) => {
    return position
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const formatStanceLabel = (stance: string) => {
    return stance.charAt(0).toUpperCase() + stance.slice(1);
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const calculateAge = (birthDate: string | Date | null) => {
    if (!birthDate) return null;

    const today = new Date();
    const birth = new Date(birthDate);

    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birth.getDate())
    ) {
      age--;
    }

    return age;
  };

  const age = calculateAge(data.profile?.dateOfBirth);

  return (
    <Card className="from-primary/15 via-secondary/5 to-primary/15 border-border/20 relative overflow-hidden border bg-gradient-to-br shadow-xl backdrop-blur-sm">
      <div className="from-brand-red via-primary to-brand-red absolute top-0 left-0 h-1 w-full bg-gradient-to-r" />

      {isOwnProfile && onEditClick && (
        <Button
          variant="outline"
          size="sm"
          onClick={onEditClick}
          className="border-border/20 bg-card/70 text-foreground hover:bg-card hover:text-foreground absolute right-6 gap-2"
        >
          <Edit className="h-4 w-4" />
          Edit
        </Button>
      )}
      <CardContent className="pt-10 pb-8">
        <div className="flex items-start gap-6 md:flex-row md:items-center">
          <div>
            <Avatar className="ring-primary/20 h-20 w-20 shadow-lg ring-4 lg:h-28 lg:w-28">
              <AvatarImage
                src={data.user.image || undefined}
                alt={data.user.name}
              />

              <AvatarFallback className="from-primary/10 to-primary/20 text-primary bg-gradient-to-br font-bold lg:text-2xl">
                {getInitials(data.user.name)}
              </AvatarFallback>
            </Avatar>

            {/* {data.baseballProfile?.positions?.[0] && (
              <Badge className="bg-primary text-primary-foreground absolute -bottom-2 left-1/2 -translate-x-1/2 transform shadow-md">
                <Trophy className="mr-1 h-3 w-3" />
                {formatPositionLabel(
                  data.baseballProfile.positions[0].position,
                )}
              </Badge>
            )} */}
          </div>

          <div className="flex-1 space-y-4">
            <div className="flex items-center gap-1 lg:gap-4">
              <Star className="fill-primary/20 text-primary h-6 w-6 lg:h-8 lg:w-8" />

              <h1 className="text-foreground truncate text-3xl leading-tight font-bold sm:text-4xl lg:text-5xl">
                {data.user.name}
              </h1>
            </div>

            <div className="text-muted-foreground flex flex-wrap gap-2 text-sm sm:gap-4">
              <div className="bg-card/60 border-border/10 flex items-center gap-2 rounded-full border px-3 py-1">
                <Mail className="text-primary h-4 w-4" />
                {data.user.email}
              </div>

              {age && (
                <Badge
                  variant="secondary"
                  className="bg-card/60 border-border/10 flex items-center gap-2 rounded-full border px-3 py-1"
                >
                  <Calendar className="mr-1 h-3 w-3" />
                  Age {age}
                </Badge>
              )}

              {data.profile?.phoneNumber && (
                <div className="bg-card/60 border-border/10 flex items-center gap-2 rounded-full border px-3 py-1">
                  <Phone className="text-primary h-4 w-4" />
                  {data.profile.phoneNumber}
                </div>
              )}

              {data.profile?.school && (
                <div className="bg-card/60 border-border/10 flex items-center gap-2 rounded-full border px-3 py-1">
                  <GraduationCap className="text-primary h-4 w-4" />
                  {data.profile.school}
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

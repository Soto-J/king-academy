import { format } from "date-fns";

import {
  User,
  MapPin,
  Phone,
  GraduationCap,
  Calendar,
  Mail,
  Trophy,
  Target,
  Shield,
  FileText,
  Edit,
} from "lucide-react";

import { ProfileGetOne } from "../../types";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ProfileProps {
  profile: ProfileGetOne;
  onEditClick?: () => void;
  isOwnProfile?: boolean;
}

export const Profile = ({
  profile,
  onEditClick,
  isOwnProfile = false,
}: ProfileProps) => {
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

  const formatDate = (date: string | Date | null) => {
    if (!date) return "Not specified";
    return format(new Date(date), "MMMM d, yyyy");
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

  if (!profile?.user) {
    return (
      <Card className="w-full">
        <CardContent className="flex h-48 items-center justify-center">
          <p className="text-muted-foreground">Profile not found</p>
        </CardContent>
      </Card>
    );
  }

  const age = calculateAge(profile.profile?.dateOfBirth);

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <Card className="relative overflow-hidden">
        <div className="from-primary/5 via-primary/10 to-primary/5 absolute inset-0 bg-gradient-to-br" />
        <CardContent className="relative pt-8 pb-6">
          <div className="flex flex-col items-start gap-6 md:flex-row md:items-center">
            <Avatar className="ring-primary/10 h-24 w-24 ring-4">
              <AvatarImage
                src={profile.user.image || undefined}
                alt={profile.user.name}
              />
              <AvatarFallback className="bg-primary/10 text-primary text-xl font-bold">
                {getInitials(profile.user.name)}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 space-y-2">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-foreground text-3xl font-bold">
                    {profile.user.name}
                  </h1>
                  {profile.profile?.position && (
                    <p className="text-primary text-lg font-medium">
                      {formatPositionLabel(profile.profile.position)}
                    </p>
                  )}
                  {age && (
                    <p className="text-muted-foreground text-sm">Age {age}</p>
                  )}
                </div>

                {isOwnProfile && onEditClick && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={onEditClick}
                    className="gap-2"
                  >
                    <Edit className="h-4 w-4" />
                    Edit Profile
                  </Button>
                )}
              </div>

              <div className="text-muted-foreground flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Mail className="h-4 w-4" />
                  {profile.user.email}
                </div>
                {profile.profile?.phoneNumber && (
                  <div className="flex items-center gap-1">
                    <Phone className="h-4 w-4" />
                    {profile.profile.phoneNumber}
                  </div>
                )}
                {profile.profile?.school && (
                  <div className="flex items-center gap-1">
                    <GraduationCap className="h-4 w-4" />
                    {profile.profile.school}
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Personal Information */}
        <div className="space-y-6 lg:col-span-2">
          {/* Bio Section */}
          {profile.profile?.bio && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="text-primary h-5 w-5" />
                  About
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {profile.profile.bio}
                </p>
              </CardContent>
            </Card>
          )}

          {/* Baseball Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="text-primary h-5 w-5" />
                Baseball Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <div className="text-muted-foreground flex items-center gap-2 text-sm">
                    <Target className="h-4 w-4" />
                    Primary Position
                  </div>
                  <p className="font-medium">
                    {profile.profile?.position
                      ? formatPositionLabel(profile.profile.position)
                      : "Not specified"}
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="text-muted-foreground flex items-center gap-2 text-sm">
                    <Shield className="h-4 w-4" />
                    Batting Stance
                  </div>
                  <p className="font-medium">
                    {profile.profile?.stance
                      ? formatStanceLabel(profile.profile.stance)
                      : "Not specified"}
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="text-muted-foreground flex items-center gap-2 text-sm">
                    <Target className="h-4 w-4" />
                    Throwing Arm
                  </div>
                  <p className="font-medium">
                    {profile.profile?.arm
                      ? formatStanceLabel(profile.profile.arm)
                      : "Not specified"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar Information */}
        <div className="space-y-6">
          {/* Personal Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="text-primary h-5 w-5" />
                Personal Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {profile.profile?.dateOfBirth && (
                <div className="space-y-1">
                  <div className="text-muted-foreground flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4" />
                    Date of Birth
                  </div>
                  <p className="font-medium">
                    {formatDate(profile.profile.dateOfBirth)}
                  </p>
                </div>
              )}

              {profile.profile?.school && (
                <div className="space-y-1">
                  <div className="text-muted-foreground flex items-center gap-2 text-sm">
                    <GraduationCap className="h-4 w-4" />
                    School
                  </div>
                  <p className="font-medium">{profile.profile.school}</p>
                </div>
              )}

              {profile.profile?.phoneNumber && (
                <div className="space-y-1">
                  <div className="text-muted-foreground flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4" />
                    Phone
                  </div>
                  <p className="font-medium">{profile.profile.phoneNumber}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Address */}
          {(profile.profile?.street ||
            profile.profile?.city ||
            profile.profile?.state) && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="text-primary h-5 w-5" />
                  Address
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-1">
                  {profile.profile.street && (
                    <p className="font-medium">{profile.profile.street}</p>
                  )}
                  <p className="text-muted-foreground">
                    {[
                      profile.profile.city,
                      profile.profile.state,
                      profile.profile.zipCode,
                    ]
                      .filter(Boolean)
                      .join(", ")}
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

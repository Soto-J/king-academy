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
  Star,
  Medal,
  Zap,
} from "lucide-react";

import { ProfileGetOne } from "../../types";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

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
      {/* Baseball-themed Profile Header */}
      <Card className="relative overflow-hidden border-2 border-amber-200/50">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-amber-50 to-orange-50" />
        <div className="absolute top-0 left-0 h-2 w-full bg-gradient-to-r from-red-500 via-white to-blue-500" />
        <CardContent className="relative pt-8 pb-6">
          <div className="flex flex-col items-start gap-6 md:flex-row md:items-center">
            <div className="relative">
              <Avatar className="h-28 w-28 shadow-lg ring-4 ring-amber-300/30">
                <AvatarImage
                  src={profile.user.image || undefined}
                  alt={profile.user.name}
                />
                <AvatarFallback className="bg-gradient-to-br from-amber-100 to-orange-100 text-2xl font-bold text-amber-800">
                  {getInitials(profile.user.name)}
                </AvatarFallback>
              </Avatar>
              {profile.baseballProfile?.position && (
                <Badge className="absolute -bottom-2 left-1/2 -translate-x-1/2 transform bg-amber-600 text-white shadow-md">
                  <Trophy className="mr-1 h-3 w-3" />
                  {formatPositionLabel(profile.baseballProfile.position)}
                </Badge>
              )}
            </div>

            <div className="flex-1 space-y-3">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <h1 className="bg-gradient-to-r from-amber-700 to-orange-600 bg-clip-text text-4xl font-bold text-transparent">
                      {profile.user.name}
                    </h1>
                    <Star className="h-6 w-6 fill-amber-400 text-amber-500" />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {age && (
                      <Badge
                        variant="secondary"
                        className="bg-blue-100 text-blue-800"
                      >
                        <Calendar className="mr-1 h-3 w-3" />
                        Age {age}
                      </Badge>
                    )}
                    {profile.baseballProfile?.battingStance && (
                      <Badge
                        variant="secondary"
                        className="bg-green-100 text-green-800"
                      >
                        <Target className="mr-1 h-3 w-3" />
                        {formatStanceLabel(profile.baseballProfile.battingStance)} Batter
                      </Badge>
                    )}
                    {profile.baseballProfile?.throwingArm && (
                      <Badge
                        variant="secondary"
                        className="bg-purple-100 text-purple-800"
                      >
                        <Zap className="mr-1 h-3 w-3" />
                        {formatStanceLabel(profile.baseballProfile.throwingArm)} Thrower
                      </Badge>
                    )}
                  </div>
                </div>

                {isOwnProfile && onEditClick && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={onEditClick}
                    className="gap-2 border-amber-300 bg-white/70 text-amber-700 hover:bg-white hover:text-amber-800"
                  >
                    <Edit className="h-4 w-4" />
                    Edit Profile
                  </Button>
                )}
              </div>

              <div className="flex flex-wrap gap-4 text-sm text-slate-600">
                <div className="flex items-center gap-2 rounded-full bg-white/60 px-3 py-1">
                  <Mail className="h-4 w-4 text-amber-600" />
                  {profile.user.email}
                </div>
                {profile.profile?.phoneNumber && (
                  <div className="flex items-center gap-2 rounded-full bg-white/60 px-3 py-1">
                    <Phone className="h-4 w-4 text-amber-600" />
                    {profile.profile.phoneNumber}
                  </div>
                )}
                {profile.profile?.school && (
                  <div className="flex items-center gap-2 rounded-full bg-white/60 px-3 py-1">
                    <GraduationCap className="h-4 w-4 text-amber-600" />
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
            <Card className="border-l-4 border-l-amber-400 shadow-md">
              <CardHeader className="bg-gradient-to-r from-amber-50 to-orange-50">
                <CardTitle className="flex items-center gap-2 text-amber-800">
                  <FileText className="h-5 w-5 text-amber-600" />
                  Player Story
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="text-slate-700 leading-relaxed text-base">
                  {profile.profile.bio}
                </p>
              </CardContent>
            </Card>
          )}

          {/* Baseball Statistics & Information */}
          <Card className="border-l-4 border-l-emerald-400 shadow-md">
            <CardHeader className="bg-gradient-to-r from-emerald-50 to-green-50">
              <CardTitle className="flex items-center gap-2 text-emerald-800">
                <Trophy className="h-5 w-5 text-emerald-600" />
                Baseball Profile
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border border-blue-200">
                  <div className="flex items-center justify-center gap-2 text-blue-700 mb-2">
                    <Target className="h-5 w-5" />
                    <span className="font-semibold text-sm">Primary Position</span>
                  </div>
                  <p className="font-bold text-lg text-blue-800">
                    {profile.baseballProfile?.position
                      ? formatPositionLabel(profile.baseballProfile.position)
                      : "Not specified"}
                  </p>
                </div>

                <div className="text-center p-4 bg-gradient-to-br from-red-50 to-red-100 rounded-lg border border-red-200">
                  <div className="flex items-center justify-center gap-2 text-red-700 mb-2">
                    <Shield className="h-5 w-5" />
                    <span className="font-semibold text-sm">Batting Stance</span>
                  </div>
                  <p className="font-bold text-lg text-red-800">
                    {profile.baseballProfile?.battingStance
                      ? formatStanceLabel(profile.baseballProfile.battingStance)
                      : "Not specified"}
                  </p>
                </div>

                <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg border border-purple-200">
                  <div className="flex items-center justify-center gap-2 text-purple-700 mb-2">
                    <Zap className="h-5 w-5" />
                    <span className="font-semibold text-sm">Throwing Arm</span>
                  </div>
                  <p className="font-bold text-lg text-purple-800">
                    {profile.baseballProfile?.throwingArm
                      ? formatStanceLabel(profile.baseballProfile.throwingArm)
                      : "Not specified"}
                  </p>
                </div>
              </div>

              {/* Achievement Badge Section */}
              <div className="mt-6 p-4 bg-gradient-to-r from-yellow-50 to-amber-50 rounded-lg border border-amber-200">
                <div className="flex items-center gap-2 mb-3">
                  <Medal className="h-5 w-5 text-amber-600" />
                  <span className="font-semibold text-amber-800">Player Highlights</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {profile.baseballProfile?.position && (
                    <Badge className="bg-amber-100 text-amber-800 border-amber-300">
                      {formatPositionLabel(profile.baseballProfile.position)} Specialist
                    </Badge>
                  )}
                  {profile.baseballProfile?.battingStance && (
                    <Badge className="bg-green-100 text-green-800 border-green-300">
                      {formatStanceLabel(profile.baseballProfile.battingStance)} Hitter
                    </Badge>
                  )}
                  {profile.baseballProfile?.throwingArm && (
                    <Badge className="bg-blue-100 text-blue-800 border-blue-300">
                      {formatStanceLabel(profile.baseballProfile.throwingArm)}-Handed
                    </Badge>
                  )}
                  {age && age >= 18 && (
                    <Badge className="bg-purple-100 text-purple-800 border-purple-300">
                      College Eligible
                    </Badge>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar Information */}
        <div className="space-y-6">
          {/* Personal Details */}
          <Card className="border-l-4 border-l-blue-400 shadow-md">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
              <CardTitle className="flex items-center gap-2 text-blue-800">
                <User className="h-5 w-5 text-blue-600" />
                Personal Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              {profile.profile?.dateOfBirth && (
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <div className="flex items-center gap-2 text-blue-700 mb-1">
                    <Calendar className="h-4 w-4" />
                    <span className="font-semibold text-sm">Date of Birth</span>
                  </div>
                  <p className="font-medium text-slate-800">
                    {formatDate(profile.profile.dateOfBirth)}
                  </p>
                </div>
              )}

              {profile.profile?.school && (
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <div className="flex items-center gap-2 text-blue-700 mb-1">
                    <GraduationCap className="h-4 w-4" />
                    <span className="font-semibold text-sm">School</span>
                  </div>
                  <p className="font-medium text-slate-800">{profile.profile.school}</p>
                </div>
              )}

              {profile.profile?.phoneNumber && (
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <div className="flex items-center gap-2 text-blue-700 mb-1">
                    <Phone className="h-4 w-4" />
                    <span className="font-semibold text-sm">Phone</span>
                  </div>
                  <p className="font-medium text-slate-800">{profile.profile.phoneNumber}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Address */}
          {(profile.profile?.street ||
            profile.profile?.city ||
            profile.profile?.state) && (
            <Card className="border-l-4 border-l-red-400 shadow-md">
              <CardHeader className="bg-gradient-to-r from-red-50 to-pink-50">
                <CardTitle className="flex items-center gap-2 text-red-800">
                  <MapPin className="h-5 w-5 text-red-600" />
                  Location
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  {profile.profile.street && (
                    <p className="font-semibold text-slate-800 mb-2">{profile.profile.street}</p>
                  )}
                  <p className="text-slate-600 font-medium">
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

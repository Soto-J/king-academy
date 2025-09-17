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
  data: ProfileGetOne;
  onEditClick?: () => void;
  isOwnProfile?: boolean;
}

export const Profile = ({
  data,
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

  if (!data?.user) {
    return (
      <Card className="w-full">
        <CardContent className="flex h-48 items-center justify-center">
          <p className="text-muted-foreground">Profile not found</p>
        </CardContent>
      </Card>
    );
  }

  const age = calculateAge(data.profile?.dateOfBirth);

  return (
    <div className="space-y-6">
      <Card className="relative overflow-hidden border-2 border-amber-200/50">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-amber-50 to-orange-50" />
        <div className="absolute top-0 left-0 h-2 w-full bg-gradient-to-r from-red-500 via-white to-blue-500" />

        <CardContent className="relative pt-8 pb-6">
          <div className="flex flex-col items-start gap-6 md:flex-row md:items-center">
            <div className="relative">
              <Avatar className="h-28 w-28 shadow-lg ring-4 ring-amber-300/30">
                <AvatarImage
                  src={data.user.image || undefined}
                  alt={data.user.name}
                />
                <AvatarFallback className="bg-gradient-to-br from-amber-100 to-orange-100 text-2xl font-bold text-amber-800">
                  {getInitials(data.user.name)}
                </AvatarFallback>
              </Avatar>

              {data.baseballProfile?.positions?.[0] && (
                <Badge className="absolute -bottom-2 left-1/2 -translate-x-1/2 transform bg-amber-600 text-white shadow-md">
                  <Trophy className="mr-1 h-3 w-3" />
                  {formatPositionLabel(
                    data.baseballProfile.positions[0].position,
                  )}
                </Badge>
              )}
            </div>

            <div className="flex-1 space-y-3">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <h1 className="bg-gradient-to-r from-amber-700 to-orange-600 bg-clip-text text-4xl font-bold text-transparent">
                      {data.user.name}
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
                    {data.baseballProfile?.battingStance && (
                      <Badge
                        variant="secondary"
                        className="bg-green-100 text-green-800"
                      >
                        <Target className="mr-1 h-3 w-3" />
                        {formatStanceLabel(
                          data.baseballProfile.battingStance,
                        )}{" "}
                        Batter
                      </Badge>
                    )}
                    {data.baseballProfile?.throwingArm && (
                      <Badge
                        variant="secondary"
                        className="bg-purple-100 text-purple-800"
                      >
                        <Zap className="mr-1 h-3 w-3" />
                        {formatStanceLabel(
                          data.baseballProfile.throwingArm,
                        )}{" "}
                        Thrower
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
                  {data.user.email}
                </div>
                {data.profile?.phoneNumber && (
                  <div className="flex items-center gap-2 rounded-full bg-white/60 px-3 py-1">
                    <Phone className="h-4 w-4 text-amber-600" />
                    {data.profile.phoneNumber}
                  </div>
                )}
                {data.profile?.school && (
                  <div className="flex items-center gap-2 rounded-full bg-white/60 px-3 py-1">
                    <GraduationCap className="h-4 w-4 text-amber-600" />
                    {data.profile.school}
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
          {data.profile?.bio && (
            <Card className="border-l-4 border-l-amber-400 shadow-md">
              <CardHeader className="bg-gradient-to-r from-amber-50 to-orange-50">
                <CardTitle className="flex items-center gap-2 text-amber-800">
                  <FileText className="h-5 w-5 text-amber-600" />
                  Player Story
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="text-base leading-relaxed text-slate-700">
                  {data.profile.bio}
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
            <CardContent className="space-y-6 pt-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                <div className="rounded-lg border border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100 p-4 text-center">
                  <div className="mb-2 flex items-center justify-center gap-2 text-blue-700">
                    <Target className="h-5 w-5" />
                    <span className="text-sm font-semibold">
                      Primary Position
                    </span>
                  </div>

                  <p className="text-lg font-bold text-blue-800">
                    {data.baseballProfile?.positions?.[0]
                      ? formatPositionLabel(
                          data.baseballProfile.positions[0].position,
                        )
                      : "Not specified"}
                  </p>
                </div>

                <div className="rounded-lg border border-red-200 bg-gradient-to-br from-red-50 to-red-100 p-4 text-center">
                  <div className="mb-2 flex items-center justify-center gap-2 text-red-700">
                    <Shield className="h-5 w-5" />
                    <span className="text-sm font-semibold">
                      Batting Stance
                    </span>
                  </div>

                  <p className="text-lg font-bold text-red-800">
                    {data.baseballProfile?.battingStance
                      ? formatStanceLabel(data.baseballProfile.battingStance)
                      : "Not specified"}
                  </p>
                </div>

                <div className="rounded-lg border border-purple-200 bg-gradient-to-br from-purple-50 to-purple-100 p-4 text-center">
                  <div className="mb-2 flex items-center justify-center gap-2 text-purple-700">
                    <Zap className="h-5 w-5" />
                    <span className="text-sm font-semibold">Throwing Arm</span>
                  </div>
                  <p className="text-lg font-bold text-purple-800">
                    {data.baseballProfile?.throwingArm
                      ? formatStanceLabel(data.baseballProfile.throwingArm)
                      : "Not specified"}
                  </p>
                </div>
              </div>

              {/* Achievement Badge Section */}
              <div className="mt-6 rounded-lg border border-amber-200 bg-gradient-to-r from-yellow-50 to-amber-50 p-4">
                <div className="mb-3 flex items-center gap-2">
                  <Medal className="h-5 w-5 text-amber-600" />
                  <span className="font-semibold text-amber-800">
                    Player Highlights
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {data.baseballProfile?.positions?.[0] && (
                    <Badge className="border-amber-300 bg-amber-100 text-amber-800">
                      {formatPositionLabel(
                        data.baseballProfile.positions[0].position,
                      )}{" "}
                      Specialist
                    </Badge>
                  )}
                  {data.baseballProfile?.battingStance && (
                    <Badge className="border-green-300 bg-green-100 text-green-800">
                      {formatStanceLabel(data.baseballProfile.battingStance)}{" "}
                      Hitter
                    </Badge>
                  )}
                  {data.baseballProfile?.throwingArm && (
                    <Badge className="border-blue-300 bg-blue-100 text-blue-800">
                      {formatStanceLabel(data.baseballProfile.throwingArm)}
                      -Handed
                    </Badge>
                  )}
                  {age && age >= 18 && (
                    <Badge className="border-purple-300 bg-purple-100 text-purple-800">
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
              {data.profile?.dateOfBirth && (
                <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                  <div className="mb-1 flex items-center gap-2 text-blue-700">
                    <Calendar className="h-4 w-4" />
                    <span className="text-sm font-semibold">Date of Birth</span>
                  </div>
                  <p className="font-medium text-slate-800">
                    {formatDate(data.profile.dateOfBirth)}
                  </p>
                </div>
              )}

              {data.profile?.school && (
                <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                  <div className="mb-1 flex items-center gap-2 text-blue-700">
                    <GraduationCap className="h-4 w-4" />
                    <span className="text-sm font-semibold">School</span>
                  </div>
                  <p className="font-medium text-slate-800">
                    {data.profile.school}
                  </p>
                </div>
              )}

              {data.profile?.phoneNumber && (
                <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                  <div className="mb-1 flex items-center gap-2 text-blue-700">
                    <Phone className="h-4 w-4" />
                    <span className="text-sm font-semibold">Phone</span>
                  </div>
                  <p className="font-medium text-slate-800">
                    {data.profile.phoneNumber}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Address */}
          {(data.profile?.address?.street ||
            data.profile?.address?.city ||
            data.profile?.address?.state) && (
            <Card className="border-l-4 border-l-red-400 shadow-md">
              <CardHeader className="bg-gradient-to-r from-red-50 to-pink-50">
                <CardTitle className="flex items-center gap-2 text-red-800">
                  <MapPin className="h-5 w-5 text-red-600" />
                  Location
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                  {data.profile.address?.street && (
                    <p className="mb-2 font-semibold text-slate-800">
                      {data.profile.address.street}
                    </p>
                  )}
                  <p className="font-medium text-slate-600">
                    {[
                      data.profile.address?.city,
                      data.profile.address?.state,
                      data.profile.address?.zipCode,
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

import { ProfileGetOne } from "@/modules/profile/types";

import { ProfileHeader } from "./profile-header";
import { ProfileBio } from "./profile-bio";
import { BaseballProfile } from "./baseball-profile";
import { PersonalDetails } from "./personal-details";
import { ProfileLocation } from "./profile-location";

import { Card, CardContent } from "@/components/ui/card";
import { Activity } from "react";

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
  if (!data?.user) {
    return (
      <Card className="w-full">
        <CardContent className="flex h-48 items-center justify-center">
          <p className="text-muted-foreground">Profile not found</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <ProfileHeader
        data={data}
        onEditClick={onEditClick}
        isOwnProfile={isOwnProfile}
      />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="space-y-6 xl:col-span-2">
          <Activity mode={data.profile?.bio ? "visible" : "hidden"}>
            <ProfileBio bio={data.profile.bio} />
          </Activity>
          
          <BaseballProfile baseballProfile={data.baseballProfile} />
        </div>

        <div className="space-y-6">
          <PersonalDetails profile={data.profile} />
          <ProfileLocation address={data.profile?.address} />
        </div>
      </div>
    </div>
  );
};

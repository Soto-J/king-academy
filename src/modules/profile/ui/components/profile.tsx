import { ProfileGetOne } from "../../types";
import { Card, CardContent } from "@/components/ui/card";

import { ProfileHeader } from "./profile/profile-header";
import { ProfileBio } from "./profile/profile-bio";
import { BaseballProfile } from "./profile/baseball-profile";
import { PersonalDetails } from "./profile/personal-details";
import { ProfileLocation } from "./profile/profile-location";

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
          {data.profile?.bio && <ProfileBio bio={data.profile.bio} />}
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

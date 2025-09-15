import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { EditProfileDialog } from "../components/edit-profile-dialog";

export const ProfilePageView = () => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.profile.getOne.queryOptions({}));
  return (
    <>
      <EditProfileDialog initialValues={data} />
      Profile Page
    </>
  );
};

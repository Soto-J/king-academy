import { redirect } from "next/navigation";

import { onGetAllPlayers } from "@/actions/all-users";
import { onGetCurrentUser } from "@/actions/current-user";
import { onHasProfile } from "@/actions/has-profile";

import HydrationCheck from "@/components/hydration-check";

import { DataTable } from "./_components/data-table/data-table";
import { columns } from "./_components/data-table/columns";
import EditProfileForm from "./_components/edit-profile-form";
import { Role } from "@prisma/client";

const PlayerPage = async () => {
  const currentUser = await onGetCurrentUser();
  const players = await onGetAllPlayers();

  if (!currentUser) {
    return redirect("/");
  }

  const hasProfile = await onHasProfile();
  const isMember = currentUser.role === Role.MEMBER;

  if (!hasProfile && isMember) {
    return (
      <HydrationCheck className="mx-auto max-w-xl rounded border p-6">
        <h2 className="text-center text-lg">Complete your profile</h2>

        <EditProfileForm user={currentUser} />
      </HydrationCheck>
    );
  }

  return (
    <div className="">
      <h1 className="mb-12 text-center text-3xl font-bold">Players</h1>

      <DataTable
        columns={columns}
        data={players || []}
        currentUser={currentUser}
      />
    </div>
  );
};

export default PlayerPage;

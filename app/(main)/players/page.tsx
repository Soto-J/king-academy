import { getAllUsers, getCurrentUser } from "@/data/user";

import { PlayersList } from "./_components/PlayersList";
import { EditButton } from "./_components/form/edit-button";

const PlayerPage = async () => {
  const user = await getCurrentUser();
  const players = await getAllUsers();

  return (
    <>
      <h1 className="mb-12 text-center text-3xl font-bold">Players</h1>

      <div className="mb-4 ml-auto mt-12 max-w-fit">
        <EditButton user={user} />
      </div>

      <PlayersList players={players || []} />
    </>
  );
};

export default PlayerPage;

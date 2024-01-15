import { auth } from "@clerk/nextjs";
import { getAllUsers, getUserById } from "@/data/user";

import { PlayersList } from "./_components/PlayersList";
import { EditButton } from "./_components/form/edit-button";

const PlayerPage = async () => {
  const session = auth();
  console.log(session.userId);
  const user = await getUserById(session.userId);
  const players = await getAllUsers();

  return (
    <div className="">
      <h1 className="mb-12 text-center text-3xl font-bold">Players</h1>

      <div className="mb-4 ml-auto mt-12 max-w-fit">
        <EditButton user={user} />
      </div>

      <PlayersList players={players || []} />
    </div>
  );
};

export default PlayerPage;

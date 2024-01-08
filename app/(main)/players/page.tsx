import { auth } from "@/auth";
import PlayersList from "./_components/PlayersList";
import { getAllUsers, getUserById } from "@/data/user";

const PlayerPage = async () => {
  const session = await auth();
  const user = await getUserById(session?.user?.id);
  const players = await getAllUsers();

  return (
    <div className="">
      <h1 className="mb-12 text-center text-3xl font-bold">Players</h1>

      <PlayersList players={players || []} user={user} />
    </div>
  );
};

export default PlayerPage;

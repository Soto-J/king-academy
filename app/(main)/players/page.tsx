import { auth } from "@/auth";
import PlayersList from "./_components/PlayersList";
import { getUserById } from "@/data/user";

const PlayerPage = async () => {
  const players: any = [];
  const session = await auth();
  const user = await getUserById(session?.user?.id);

  return (
    <div className="">
      <h1 className="mb-12 text-center text-3xl font-bold">Players</h1>

      <PlayersList players={players} user={user} />
    </div>
  );
};

export default PlayerPage;

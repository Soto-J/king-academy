import { getAllPlayers } from "@/app/actions/getAllPlayers";
import { Button } from "@/components/ui/button";
import PlayersList from "./_components/PlayersList";

const PlayerPage = async () => {
  const players = await getAllPlayers();

  return (
    <div>
      <h1 className="mb-12 text-center text-3xl font-bold">Players</h1>

      <PlayersList players={players} />
      {/* <Button>Edit Profile</Button> */}
    </div>
  );
};

export default PlayerPage;

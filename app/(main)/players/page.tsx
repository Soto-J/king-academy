import { redirect } from "next/navigation";

import { getAllPlayers } from "@/actions/getAllPlayers";
import { getCurrentUser } from "@/actions/getCurrentUser";

import PlayersList from "./_components/PlayersList";

const PlayerPage = async () => {
  const players = await getAllPlayers();
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    redirect("/");
  }

  return (
    <div className="">
      <h1 className="mb-12 text-center text-3xl font-bold">Players</h1>

      <PlayersList players={players} currentUser={currentUser} />
    </div>
  );
};

export default PlayerPage;

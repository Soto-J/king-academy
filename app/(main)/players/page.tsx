import { redirect } from "next/navigation";

import { getAllPlayers } from "@/actions/getAllPlayers";
import { getCurrentUser } from "@/actions/getCurrentUser";

import { DataTable } from "./_components/data-table/data-table";
import { columns } from "./_components/data-table/columns";

const PlayerPage = async () => {
  const players = await getAllPlayers();
  const currentUser = await getCurrentUser();
  
  if (!currentUser) {
    return redirect("/");
  }

  return (
    <div className="">
      <h1 className="mb-12 text-center text-3xl font-bold">Players</h1>

      <DataTable columns={columns} data={players} currentUser={currentUser}/>
    </div>
  );
};

export default PlayerPage;

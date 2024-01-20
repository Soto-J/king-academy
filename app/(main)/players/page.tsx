import { getAllUsers, getCurrentUser } from "@/data/user";

import { DataTable } from "./_components/data-table/data-table";
import { columns } from "./_components/data-table/columns";

const PlayerPage = async () => {
  const user = await getCurrentUser();
  const players = await getAllUsers();

  return (
    <>
      <h1 className="mb-12 text-center text-3xl font-bold">Players</h1>

      <DataTable columns={columns} currentUser={user} data={players || []} />
    </>
  );
};

export default PlayerPage;

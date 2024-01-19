import { getAllUsers, getCurrentUser } from "@/data/user";

import { EditButton } from "./_components/form/edit-button";
import { DataTable } from "./_components/player/data-table/data-table";
import { columns } from "./_components/player/data-table/columns";

const PlayerPage = async () => {
  const user = await getCurrentUser();
  const players = await getAllUsers();

  return (
    <>
      <h1 className="mb-12 text-center text-3xl font-bold">Players</h1>

      <div className="mb-4 ml-auto mt-12 max-w-fit">
        <EditButton user={user} />
      </div>

      <DataTable columns={columns} data={players || []} />
    </>
  );
};

export default PlayerPage;

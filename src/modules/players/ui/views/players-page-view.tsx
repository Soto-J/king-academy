"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";

import { usePlayersFilters } from "@/modules/players/hooks/use-players-filter";

import { PlayersTable } from "@/modules/players/ui/components/players-table";
import { PlayersPagination } from "@/modules/players/ui/components/players-pagination";

export const PlayersPageView = () => {
  const [filters, setFilters] = usePlayersFilters();

  const trpc = useTRPC();
  const { data } = useSuspenseQuery(
    trpc.players.getMany.queryOptions({ ...filters }),
  );

  console.log({ data });
  return (
    <>
      <PlayersTable data={data} />

      <PlayersPagination
        page={filters.page}
        totalPages={data.totalPages}
        onPageChange={(page) => setFilters({ page })}
      />
    </>
  );
};

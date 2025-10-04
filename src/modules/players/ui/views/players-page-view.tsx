"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";

import { usePlayersFilters } from "@/modules/players/hooks/use-players-filter";

import { PlayersTable } from "@/modules/players/ui/components/players-table";
import { PlayersPagination } from "@/modules/players/ui/components/players-pagination";

interface PlayersPageViewProps {
  isAdmin: boolean;
}
export const PlayersPageView = ({ isAdmin }: PlayersPageViewProps) => {
  const [filters, setFilters] = usePlayersFilters();

  const trpc = useTRPC();
  const { data } = useSuspenseQuery(
    trpc.players.getMany.queryOptions({ ...filters }),
  );

  return (
    <>
      <PlayersTable isAdmin={isAdmin} data={data} />

      <PlayersPagination
        page={filters.page}
        totalPages={data.totalPages}
        onPageChange={(page) => setFilters({ page })}
      />
    </>
  );
};

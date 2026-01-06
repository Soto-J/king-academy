"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";

import { useRosterFilters } from "@/modules/roster/hooks/use-roster-filter";

import { RosterTable } from "@/modules/roster/ui/components/roster-table";
import { RosterPagination } from "@/modules/roster/ui/components/roster-pagination";

interface RosterPageViewProps {
  isAdmin: boolean;
}

export const RosterPageView = ({ isAdmin }: RosterPageViewProps) => {
  const [filters, setFilters] = useRosterFilters();

  const trpc = useTRPC();
  const { data } = useSuspenseQuery(
    trpc.roster.getMany.queryOptions({ ...filters }),
  );

  return (
    <>
      <RosterTable isAdmin={isAdmin} data={data} />

      <RosterPagination
        page={filters.page}
        totalPages={data.totalPages}
        onPageChange={(page) => setFilters({ page })}
      />
    </>
  );
};

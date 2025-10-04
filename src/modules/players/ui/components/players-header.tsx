import { PlayersSearchFilter } from "./players-search-filter";

export const PlayersHeader = () => {
  return (
    <div className="space-y-8 pb-6">
      <div>
        <h1 className="text-foreground text-3xl font-bold">Players</h1>
        <p className="text-muted-foreground mt-2">
          Manage and track all players in the King Academy program
        </p>
      </div>

      <PlayersSearchFilter />
    </div>
  );
};

import { createTRPCRouter } from "../init";

// Note: Import routers as you create them for your baseball academy
// Example:
// import { playersRouter } from "@/modules/players/server/procedures";
// import { teamsRouter } from "@/modules/teams/server/procedures";

export const appRouter = createTRPCRouter({
  // Add your baseball academy routers here as you create them
  // players: playersRouter,
  // teams: teamsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

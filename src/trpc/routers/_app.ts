import { profileRouter } from "@/modules/profile/server/procedure";
import { createTRPCRouter } from "../init";

import { playersRouter } from "@/modules/players/server/procedure";

export const appRouter = createTRPCRouter({
  players: playersRouter,
  profile: profileRouter,
});

export type AppRouter = typeof appRouter;

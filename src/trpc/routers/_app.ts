import { profileRouter } from "@/modules/profile/server/procedure";
import { createTRPCRouter } from "../init";

import { playersRouter } from "@/modules/players/server/procedure";
import { galleryProcedure } from "@/modules/galery/server/procedures";

export const appRouter = createTRPCRouter({
  players: playersRouter,
  profile: profileRouter,
  gallery: galleryProcedure,
});

export type AppRouter = typeof appRouter;

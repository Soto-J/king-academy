import { createTRPCRouter } from "../init";

import { profileRouter } from "@/modules/profile/server/procedure";
import { playersRouter } from "@/modules/players/server/procedure";
import { galleryProcedure } from "@/modules/gallery/server/procedures";
import { scheduleRouter } from "@/modules/schedule/server/procedure";

export const appRouter = createTRPCRouter({
  players: playersRouter,
  profile: profileRouter,
  gallery: galleryProcedure,
  schedule: scheduleRouter,
});

export type AppRouter = typeof appRouter;

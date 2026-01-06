import { createTRPCRouter } from "../init";

import { profileRouter } from "@/modules/profile/server/procedure";
import { rosterRouter } from "@/modules/roster/server/procedure";
import { galleryProcedure } from "@/modules/gallery/server/procedures";
import { scheduleRouter } from "@/modules/schedule/server/procedure";

export const appRouter = createTRPCRouter({
  roster: rosterRouter,
  profile: profileRouter,
  gallery: galleryProcedure,
  schedule: scheduleRouter,
});

export type AppRouter = typeof appRouter;

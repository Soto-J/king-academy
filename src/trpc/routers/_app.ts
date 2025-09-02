import { createTRPCRouter } from "../init";

import { iracingRouter } from "@/modules/iracing/server/procedures";
import { manageRouter } from "@/modules/manage/server/procedure";
import { membersRouter } from "@/modules/members/server/procedures";
import { profileRouter } from "@/modules/profile/server/procedures";

export const appRouter = createTRPCRouter({
  manage: manageRouter,
  members: membersRouter,
  profile: profileRouter,
  iracing: iracingRouter,
  
});

// export type definition of API
export type AppRouter = typeof appRouter;

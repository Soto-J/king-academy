import { z } from "zod";
import { eq } from "drizzle-orm";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";

import { db } from "@/db";
import { scheduleTable } from "@/db/schema";

export const scheduleRouter = createTRPCRouter({
  getOne: protectedProcedure
    .input(z.object({ scheduleId: z.string() }))
    .query(async ({ input }) => {
      return await db
        .select()
        .from(scheduleTable)
        .where(eq(scheduleTable.id, input.scheduleId))
        .then((row) => row[0]);
    }),

  getMany: protectedProcedure.query(async ({ ctx, input }) => {
    return await db.select().from(scheduleTable);
  }),

  edit: protectedProcedure
    .input(z.object({ scheduleId: z.string() }))
    .mutation(async ({ ctx, input }) => {}),
});

import { z } from "zod";
import { and, eq, getTableColumns } from "drizzle-orm";

import { createTRPCRouter, protectedProcedure } from "@/trpc/init";

import { db } from "@/db";
import {
  addressTable,
  baseballProfileTable,
  positionTable,
  profileTable,
  scheduleTable,
  user,
} from "@/db/schema";

import { TRPCError } from "@trpc/server";

export const scheduleRouter = createTRPCRouter({
  getOne: protectedProcedure
    .input(z.object({ userId: z.string().nullish() }))
    .query(async ({ ctx, input }) => {}),

  getMany: protectedProcedure.query(async ({ ctx, input }) => {
    return await db.select().from(scheduleTable);
  }),

  edit: protectedProcedure
    .input(z.object({ scheduleId: z.string() }))
    .mutation(async ({ ctx, input }) => {}),
});

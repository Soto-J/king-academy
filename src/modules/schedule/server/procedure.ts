import { eq } from "drizzle-orm";

import { createTRPCRouter, protectedProcedure } from "@/trpc/init";

import { db } from "@/db";
import { scheduleTable } from "@/db/schema";

import {
  ScheduleEditSchema,
  ScheduleGetOneSchema,
} from "@/modules/schedule/schemas";

export const scheduleRouter = createTRPCRouter({
  getOne: protectedProcedure
    .input(ScheduleGetOneSchema)
    .query(async ({ input }) => {
      return await db
        .select()
        .from(scheduleTable)
        .where(eq(scheduleTable.id, input.scheduleId))
        .then((row) => row[0]);
    }),

  getMany: protectedProcedure.query(async () => {
    return await db.select().from(scheduleTable);
  }),

  insert: protectedProcedure
    .input(ScheduleEditSchema)
    .mutation(async ({ input }) => {
      const {
        scheduleId,
        gameNumber,
        date,
        startTime,
        endTime,
        ...restOfData
      } = input;

      const insertData = {
        ...(scheduleId && { id: scheduleId }),
        ...restOfData,
        gameNumber: Number(gameNumber),
        date: new Date(date),
        startTime: new Date(startTime),
        endTime: new Date(endTime),
      };

      await db
        .insert(scheduleTable)
        .values(insertData)
        .onDuplicateKeyUpdate({ set: insertData });
    }),

  delete: protectedProcedure
    .input(ScheduleGetOneSchema)
    .mutation(async ({ input }) => {
      return await db
        .delete(scheduleTable)
        .where(eq(scheduleTable.id, input.scheduleId));
    }),
});

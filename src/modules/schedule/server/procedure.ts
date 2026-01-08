import { eq } from "drizzle-orm";

import { createTRPCRouter, protectedProcedure } from "@/trpc/init";

import { db } from "@/db";
import { scheduleTable } from "@/db/schema";

import {
  ScheduleEditOneMutationSchema,
  ScheduleGetOneSchema,
} from "@/modules/schedule/schemas";

export const scheduleRouter = createTRPCRouter({
  getOne: protectedProcedure
    .input(ScheduleGetOneSchema)
    .query(async ({ input }) => {
      const [data] = await db
        .select()
        .from(scheduleTable)
        .where(eq(scheduleTable.id, input.scheduleId));

      return data;
    }),

  getMany: protectedProcedure.query(async () => {
    return await db.select().from(scheduleTable);
  }),

  insert: protectedProcedure
    .input(ScheduleEditOneMutationSchema)
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
        startTime: startTime,
        endTime: endTime,
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

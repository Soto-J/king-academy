import { z } from "zod";
import { eq, getTableColumns } from "drizzle-orm";

import { createTRPCRouter, protectedProcedure } from "@/trpc/init";

import { db } from "@/db";
import { addressTable, battingStanceTable, positionTable, profileTable, throwingArmTable, user } from "@/db/schema";

export const profileRouter = createTRPCRouter({
  getOne: protectedProcedure
    .input(z.object({}))
    .query(async ({ ctx, input }) => {
      return await db
        .select({
          user: getTableColumns(user),
          profile: {
            ...getTableColumns(profileTable),
            ...getTableColumns(addressTable),
            ...getTableColumns(positionTable),
            ...getTableColumns(battingStanceTable),
            ...getTableColumns(throwingArmTable),
          },
        })
        .from(user)
        .leftJoin(profileTable, eq(profileTable.userId, user.id))
        .leftJoin(addressTable, eq(addressTable.profileId, profileTable.id))
        .leftJoin(positionTable, eq(positionTable.profileId, profileTable.id))
        .leftJoin(battingStanceTable, eq(battingStanceTable.profileId, profileTable.id))
        .leftJoin(throwingArmTable, eq(throwingArmTable.profileId, profileTable.id))
        .where(eq(user.id, input.userId))
        .then((row) => row[0]);
    }),

  edit: protectedProcedure
    .input(z.object({}))
    .mutation(async ({ ctx, input }) => {}),
});

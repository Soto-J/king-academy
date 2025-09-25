import { z } from "zod";

import { eq, and, count } from "drizzle-orm";

import { TRPCError } from "@trpc/server";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";

import { db } from "@/db";
import {
  baseballProfileTable,
  positionTable,
  profileTable,
  user,
} from "@/db/schema";
import { DEFAULT_PAGE_SIZE, MAX_PAGE_SIZE, MIN_PAGE_SIZE } from "./params";

export const playersRouter = createTRPCRouter({
  getOne: protectedProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ input }) => {
      if (!input.userId) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "User ID not found.",
        });
      }
      await db.select().from(user).where(eq(user.id, input.userId));
    }),

  getMany: protectedProcedure
    .input(
      z.object({
        page: z.number().min(1).default(1),
        pageSize: z
          .number()
          .min(MIN_PAGE_SIZE)
          .max(MAX_PAGE_SIZE)
          .default(DEFAULT_PAGE_SIZE),
        search: z.string().nullish(),
      }),
    )
    .query(async ({ input }) => {
      const [playersData, [{ totalPlayers }], [{ totalActive }]] =
        await Promise.all([
          db
            .select({
              id: user.id,
              name: user.name,
              email: user.email,
              image: user.image,
              role: user.role,
              isActive: profileTable.isActive,
              school: profileTable.school,
              dob: profileTable.dateOfBirth,
              battingStance: baseballProfileTable.battingStance,
              throwingArm: baseballProfileTable.throwingArm,
              position: positionTable.position,
            })
            .from(user)
            .innerJoin(profileTable, eq(profileTable.userId, user.id))
            .innerJoin(
              baseballProfileTable,
              eq(baseballProfileTable.profileId, profileTable.id),
            )
            .leftJoin(
              positionTable,
              and(
                eq(positionTable.baseballProfileId, baseballProfileTable.id),
                eq(positionTable.isPrimary, true),
              ),
            )
            .limit(input.pageSize)
            .offset((input.page - 1) * input.pageSize),

          db
            .select({ totalPlayers: count() })
            .from(user)
            .limit(input.pageSize)
            .offset((input.page - 1) * input.pageSize),

          db
            .select({ totalActive: count() })
            .from(profileTable)
            .where(eq(profileTable.isActive, true))
            .limit(input.pageSize)
            .offset((input.page - 1) * input.pageSize),
        ]);

      const totalPages = Math.ceil(totalPlayers / input.pageSize);

      return {
        players: playersData,
        totalPlayers,
        totalActive,
        totalPages,
      };
    }),
});

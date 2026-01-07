import { eq, and, count } from "drizzle-orm";

import {
  adminProcedure,
  createTRPCRouter,
  protectedProcedure,
} from "@/trpc/init";

import { db } from "@/db";
import {
  baseballProfileTable,
  positionTable,
  profileTable,
  user,
} from "@/db/schema";

import {
  RosterDeleteOneInputSchema,
  RosterEditOneInputSchema,
  RosterEditOneMutationSchema,
  RosterGetManyInputSchema,
  RosterGetOneInputSchema,
} from "@/modules/roster/schema";

export const rosterRouter = createTRPCRouter({
  getOne: protectedProcedure
    .input(RosterGetOneInputSchema)
    .query(async ({ input }) => {
      const [data] = await db
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
        .where(eq(user.id, input.userId))
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
        );

      return data;
    }),

  getMany: protectedProcedure
    .input(RosterGetManyInputSchema)
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

  editOne: adminProcedure
    .input(RosterEditOneMutationSchema)
    .mutation(async ({ input }) => {
      const { userId, isActive, role } = input;

      await db.update(user).set({ role }).where(eq(user.id, userId));
      await db
        .update(profileTable)
        .set({ isActive })
        .where(eq(profileTable.userId, userId));

      return;
    }),

  deleteOne: protectedProcedure
    .input(RosterDeleteOneInputSchema)
    .mutation(async ({ input }) => {
      return await db.delete(user).where(eq(user.id, input.userId));
    }),
});

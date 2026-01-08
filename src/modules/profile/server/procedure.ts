import { z } from "zod";
import { and, eq, getTableColumns } from "drizzle-orm";

import { TRPCError } from "@trpc/server";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";

import { db } from "@/db";

import {
  addressTable,
  baseballProfileTable,
  positionTable,
  profileTable,
  user,
} from "@/db/schema";

import { ProfileEditOneMutationSchema } from "@/modules/profile/schemas";

export const profileRouter = createTRPCRouter({
  getOne: protectedProcedure
    .input(z.object({ userId: z.string().nullish() }))
    .query(async ({ ctx, input }) => {
      const [data] = await db
        .select({
          user: getTableColumns(user),
          profile: getTableColumns(profileTable),
          address: getTableColumns(addressTable),
          baseballProfile: getTableColumns(baseballProfileTable),
        })
        .from(user)
        .innerJoin(profileTable, eq(profileTable.userId, user.id))
        .innerJoin(addressTable, eq(addressTable.profileId, profileTable.id))
        .innerJoin(
          baseballProfileTable,
          eq(baseballProfileTable.profileId, profileTable.id),
        )
        .where(
          input?.userId
            ? eq(user.id, input.userId)
            : eq(user.id, ctx.auth.user.id),
        );

      if (!data) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "User data not found.",
        });
      }

      const positions = await db
        .select({
          position: positionTable.position,
          isPrimary: positionTable.isPrimary,
        })
        .from(positionTable)
        .where(eq(positionTable.baseballProfileId, data.baseballProfile.id));

      return {
        user: data.user,
        profile: {
          school: data.profile.school,
          bio: data.profile.bio,
          dateOfBirth: data.profile.dateOfBirth,
          isActive: data.profile.isActive,
          phoneNumber: data.profile.phoneNumber,
          emergencyNumber: data.profile.emergencyNumber,
          address: {
            street: data.address.street,
            state: data.address.state,
            city: data.address.city,
            zipCode: data.address.zipCode,
          },
        },
        baseballProfile: {
          battingStance: data.baseballProfile.battingStance,
          throwingArm: data.baseballProfile.throwingArm,
          positions,
        },
      };
    }),

  edit: protectedProcedure
    .input(ProfileEditOneMutationSchema)
    .mutation(async ({ ctx, input }) => {
      const { userId } = input;

      if (ctx.auth.user.id !== userId) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Cannot edit other users profile.",
        });
      }

      await db
        .update(user)
        .set({ name: `${input.firstName} ${input.lastName}` })
        .where(and(eq(user.id, userId), eq(user.id, ctx.auth.user.id)));

      const profileValues = {
        school: input.school,
        bio: input.bio,
        dateOfBirth: input.dateOfBirth,
        phoneNumber: input.phoneNumber,
        emergencyNumber: input.emergencyNumber,
      };

      await db
        .insert(profileTable)
        .values({ userId, ...profileValues })
        .onDuplicateKeyUpdate({ set: profileValues });

      const [userProfile] = await db
        .select({ id: profileTable.id })
        .from(profileTable)
        .where(eq(profileTable.userId, userId));

      const addressValues = {
        street: input.address?.street || "",
        city: input.address?.city || "",
        state: input.address?.state || "",
        zipCode: input.address?.zipcode || "",
      };
      await db
        .insert(addressTable)
        .values({ userId, profileId: userProfile.id, ...addressValues })
        .onDuplicateKeyUpdate({ set: addressValues });

      const baseballValues = {
        battingStance: input.battingStance,
        throwingArm: input.throwingArm,
      };
      await db
        .insert(baseballProfileTable)
        .values({
          profileId: userProfile.id,
          ...baseballValues,
        })
        .onDuplicateKeyUpdate({ set: baseballValues });

      const [baseballProfile] = await db
        .select({ id: baseballProfileTable.id })
        .from(baseballProfileTable)
        .where(eq(baseballProfileTable.profileId, userProfile.id));

      await db
        .delete(positionTable)
        .where(eq(positionTable.baseballProfileId, baseballProfile.id));

      const { positions, primaryPosition } = input;

      if (positions.length > 0) {
        await db.insert(positionTable).values(
          positions.map((position) => ({
            baseballProfileId: baseballProfile.id,
            position,
            isPrimary: position === primaryPosition,
          })),
        );
      }

      return { success: true };
    }),
});

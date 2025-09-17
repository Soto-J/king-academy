import { z } from "zod";
import { and, eq, getTableColumns, sql } from "drizzle-orm";

import { createTRPCRouter, protectedProcedure } from "@/trpc/init";

import { db } from "@/db";
import {
  addressTable,
  baseballProfileTable,
  positionTable,
  profileTable,
  user,
} from "@/db/schema";

import { ProfileEditSchema } from "../schemas";
import { TRPCError } from "@trpc/server";

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
    .input(ProfileEditSchema)
    .mutation(async ({ ctx, input }) => {
      if (ctx.auth.user.id !== input.userId) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Cannot edit other users profile.",
        });
      }

      const {
        userId,
        firstName,
        lastName,
        address,
        dateOfBirth,
        phoneNumber,
        school,
        bio,
        positions,
        primaryPosition,
        battingStance,
        throwingArm,
      } = input;

      await db.transaction(async (tx) => {
        await tx
          .update(user)
          .set({
            name: `${firstName} ${lastName}`,
          })
          .where(and(eq(user.id, userId), eq(user.id, ctx.auth.user.id)));

        const [insertId] = await tx
          .insert(profileTable)
          .values({
            userId,
            school,
            bio,
            dateOfBirth,
            phoneNumber,
          })
          .onDuplicateKeyUpdate({
            set: {
              school,
              bio,
              dateOfBirth,
              phoneNumber,
            },
          })
          .$returningId();

        await tx
          .insert(addressTable)
          .values({
            userId,
            profileId: insertId.id,
            street: address?.street || "",
            city: address?.city || "",
            state: address?.state || "",
            zipCode: address?.zipcode || "",
          })
          .onDuplicateKeyUpdate({
            set: {
              street: address?.street || "",
              city: address?.city || "",
              state: address?.state || "",
              zipCode: address?.zipcode || "",
            },
          });

        // First, get the baseball profile ID
        const [baseballProfile] = await tx
          .insert(baseballProfileTable)
          .values({
            profileId: insertId.id,
            battingStance,
            throwingArm,
          })
          .onDuplicateKeyUpdate({
            set: {
              battingStance,
              throwingArm,
            },
          })
          .$returningId();

        // Delete existing positions
        await tx
          .delete(positionTable)
          .where(eq(positionTable.baseballProfileId, baseballProfile.id));

        // Insert new positions with isPrimary flags
        if (positions.length > 0) {
          await tx
            .insert(positionTable)
            .values(
              positions.map((position) => ({
                baseballProfileId: baseballProfile.id,
                position: position,
                isPrimary: position === primaryPosition,
              })),
            );
        }
      });

      return { success: true };
    }),
});

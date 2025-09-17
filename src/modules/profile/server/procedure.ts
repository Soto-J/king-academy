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
      return await db
        .select({
          user: getTableColumns(user),
          baseballProfile: {
            ...getTableColumns(baseballProfileTable),
            ...getTableColumns(positionTable),
          },
          profile: {
            ...getTableColumns(profileTable),
            positions: getTableColumns(addressTable),
          },
        })
        .from(user)
        .leftJoin(profileTable, eq(profileTable.userId, user.id))
        .leftJoin(addressTable, eq(addressTable.profileId, profileTable.id))
        .leftJoin(
          baseballProfileTable,
          eq(baseballProfileTable.profileId, profileTable.id),
        )
        .leftJoin(
          positionTable,
          eq(positionTable.baseballProfileId, baseballProfileTable.id),
        )
        .where(
          input?.userId
            ? eq(user.id, input.userId)
            : eq(user.id, ctx.auth.user.id),
        );
      // .then((row) => row[0]);
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

        await tx
          .insert(positionTable)
          .values(
            positions.map((position) => ({
              profileId: insertId.id,
              position: position,
            })),
          )
          .onDuplicateKeyUpdate({
            set: {
              position: sql`VALUE(position)`,
            },
          });

        if (battingStance) {
          await tx
            .insert(battingStanceTable)
            .values({
              profileId: insertId.id,
              stance: battingStance.stance,
              isPrimary: battingStance.isPrimary,
            })
            .onDuplicateKeyUpdate({
              set: {
                stance: battingStance.stance,
                isPrimary: battingStance.isPrimary,
              },
            });
        }

        if (throwingArm) {
          await tx
            .insert(throwingArmTable)
            .values({
              profileId: insertId.id,
              arm: throwingArm.arm,
              isPrimary: throwingArm.isPrimary,
            })
            .onDuplicateKeyUpdate({
              set: {
                arm: throwingArm.arm,
                isPrimary: throwingArm.isPrimary,
                updatedAt: new Date(),
              },
            });
        }
      });

      return { success: true };
    }),
});

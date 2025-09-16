import { z } from "zod";
import { and, eq, getTableColumns } from "drizzle-orm";

import { createTRPCRouter, protectedProcedure } from "@/trpc/init";

import { db } from "@/db";
import {
  addressTable,
  battingStanceTable,
  positionTable,
  profileTable,
  throwingArmTable,
  user,
} from "@/db/schema";

import { ProfileEditSchema } from "../schemas";

export const profileRouter = createTRPCRouter({
  getOne: protectedProcedure
    .input(z.object({ userId: z.string().nullish() }))
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
        .leftJoin(
          battingStanceTable,
          eq(battingStanceTable.profileId, profileTable.id),
        )
        .leftJoin(
          throwingArmTable,
          eq(throwingArmTable.profileId, profileTable.id),
        )
        .where(
          input?.userId
            ? eq(user.id, input.userId)
            : eq(user.id, ctx.auth.user.id),
        )
        .then((row) => row[0]);
    }),

  edit: protectedProcedure
    .input(ProfileEditSchema)
    .mutation(async ({ ctx, input }) => {
      const {
        userId,
        firstName,
        lastName,
        address,
        dateOfBirth,
        phoneNumber,
        school,
        bio,
        position,
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

        // Handle positions (can be multiple)
        if (position.length > 0) {
          for (const pos of position) {
            await tx
              .insert(positionTable)
              .values({
                profileId: insertId.id,
                position: pos,
                isPrimary: true,
              })
              .onDuplicateKeyUpdate({
                set: {
                  position: pos,
                  isPrimary: true,
                  updatedAt: new Date(),
                },
              });
          }
        }

        // Handle batting stance
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
                updatedAt: new Date(),
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

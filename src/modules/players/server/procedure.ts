import { TRPCError } from "@trpc/server";
import { eq } from "drizzle-orm";
import { z } from "zod";

import { db } from "@/db";
import { user } from "@/db/schema";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";

export const playersRouter = createTRPCRouter({
  getOne: protectedProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ ctx, input }) => {
      if (!input.userId) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "User ID not found.",
        });
      }
      await db.select().from(user).where(eq(user.id, input.userId));
    }),
  getMany: protectedProcedure
    .input(z.object({}))
    .query(async () => {
      return await db.select().from(user);
    }),
});

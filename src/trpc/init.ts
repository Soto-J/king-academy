import { cache } from "react";
import { headers } from "next/headers";
import { initTRPC, TRPCError } from "@trpc/server";
import { eq } from "drizzle-orm";
import { DateTime } from "luxon";

import { db } from "@/db";
import { licenseTable, profileTable } from "@/db/schema";
import { auth } from "@/lib/auth";
import * as helper from "@/modules/iracing/server";
import {
  IRacingMemberData,
  IRacingLicense,
  TransformLicenseData,
} from "@/modules/iracing/types";

export const createTRPCContext = cache(async () => {
  /**
   * @see: https://trpc.io/docs/server/context
   */
  return { userId: "user_123" };
});

// Avoid exporting the entire t-object
// since it's not very descriptive.
// For instance, the use of a t variable
// is common in i18n libraries.
const t = initTRPC.create({
  /**
   * @see https://trpc.io/docs/server/data-transformers
   */
  // transformer: superjson,
});

// Base router and procedure helpers
export const createTRPCRouter = t.router;
export const createCallerFactory = t.createCallerFactory;
export const baseProcedure = t.procedure;

export const cronJobProcedure = baseProcedure.use(async ({ ctx, next }) => {
  const iracingAuthCode = await helper.getOrRefreshAuthCode();

  return next({
    ctx: {
      ...ctx,
      iracingAuthCode: iracingAuthCode,
    },
  });
});

export const protectedProcedure = baseProcedure.use(async ({ ctx, next }) => {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    throw new TRPCError({ code: "UNAUTHORIZED", message: "Unauthorized" });
  }

  return next({ ctx: { ...ctx, auth: session } });
});

export const manageProcedure = protectedProcedure.use(async ({ ctx, next }) => {
  if (ctx.auth.user?.role === "member") {
    throw new TRPCError({
      code: "FORBIDDEN",
      message: "Admin access required",
    });
  }

  return next({ ctx });
});

export const iracingProcedure = protectedProcedure.use(
  async ({ ctx, next }) => {
    const iracingAuthCode = await helper.getOrRefreshAuthCode();

    return next({
      ctx: {
        ...ctx,
        iracingAuthCode: iracingAuthCode,
      },
    });
  },
);

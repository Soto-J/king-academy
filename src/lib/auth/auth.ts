import {
  admin as adminPlugin,
  createAuthMiddleware,
} from "better-auth/plugins";
import { betterAuth } from "better-auth";

import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { sql, eq } from "drizzle-orm";

import { db } from "@/db";
import * as dbSchema from "@/db/schema";

import env from "@/env";

import { ac, admin, user } from "./permission";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "mysql",
    schema: {
      ...dbSchema,
    },
  }),

  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    },
  },

  plugins: [
    adminPlugin({
      defaultRole: "user",
      ac,
      roles: {
        admin,
        user,
      },
    }),
  ],

  hooks: {
    after: createAuthMiddleware(async (ctx) => {
      const user = ctx.context.session?.user;

      if (!user) return;

      await db.transaction(async (tx) => {
        await tx
          .insert(dbSchema.profileTable)
          .values({
            userId: user.id,
          })
          .onDuplicateKeyUpdate({ set: { id: sql`id` } });

        const [profile] = await tx
          .select()
          .from(dbSchema.profileTable)
          .where(eq(dbSchema.profileTable.userId, user.id));

        await tx
          .insert(dbSchema.addressTable)
          .values({ userId: user.id, profileId: profile.id })
          .onDuplicateKeyUpdate({ set: { id: sql`id` } });

        await tx
          .insert(dbSchema.baseballProfileTable)
          .values({ profileId: profile.id })
          .onDuplicateKeyUpdate({ set: { id: sql`id` } });
      });
    }),
  },
});

import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import {
  admin as adminPlugin,
  createAuthMiddleware,
} from "better-auth/plugins";
import { eq } from "drizzle-orm";

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

      const userProfile = await db
        .select()
        .from(dbSchema.profileTable)
        .where(eq(dbSchema.profileTable.userId, user.id))
        .then((row) => row[0]);

      if (!userProfile) {
        const [newProfile] = await db
          .insert(dbSchema.profileTable)
          .values({
            userId: user.id,
          })
          .$returningId();

        await db.insert(dbSchema.userAddressTable).values({
          userId: user.id,
          profileId: newProfile.id,
        });
      }
    }),
  },
});

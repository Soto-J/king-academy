import NextAuth, { DefaultSession } from "next-auth";
import authConfig from "@/auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";

import db from "@/lib/prismadb";

import { type Profile, type UserRole } from "@prisma/client";

import { getUserById } from "./data/user";

export type ExtendUser = DefaultSession["user"] & {
  role: "ADMIN" | "USER";
  profile: Profile;
};

declare module "next-auth" {
  interface Session {
    user: ExtendUser;
  }
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages: {
    // redirect to this route if something goes wrong with the auth flow
    signIn: "/auth/login",
    error: "/auth/error",
  },
  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      });
    },
  },
  callbacks: {
    async session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub;
      }

      if (session.user && token.role && token.profile) {
        session.user.role = token.role as UserRole;
        session.user.profile = token.profile as Profile;
      }

      return session;
    },
    async jwt({ token }) {
      if (!token.sub) {
        return token;
      }

      const exsistingUser = await getUserById(token.sub);

      if (!exsistingUser) {
        return token;
      }

      return {
        ...token,
        role: exsistingUser.role,
        profile: exsistingUser.profile,
      };
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});

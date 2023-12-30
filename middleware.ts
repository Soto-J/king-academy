import { NextResponse } from "next/server";
import { authMiddleware } from "@clerk/nextjs";

import { getUser } from "./app/actions/getUser";
import { createUser } from "./app/actions/createUser";

// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your Middleware
export default authMiddleware({
  publicRoutes: ["/", "/about-us", "/contact", "/api/clerk/webhook(.*)"],
  afterAuth: async (auth, req) => {
    console.log({ auth });
    // const user = await getUser(auth.userId);
    // // console.log({ user });
    // if (!user) {
    //   await createUser(auth);
    // }
    // if (user && user.role !== "ADMIN") {
    //   if (!user.school || !user.phoneNumber) {
    //     const url = new URL("/profile", req.nextUrl.origin);
    //     return NextResponse.redirect(url.toString());
    //   }
    // }
  },
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};

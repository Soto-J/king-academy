import type { AppRouter } from "@/trpc/routers/_app";
import type { inferRouterOutputs } from "@trpc/server";

export type GetRoster = inferRouterOutputs<AppRouter>["roster"]["getMany"];
export type GetPlayer = inferRouterOutputs<AppRouter>["roster"]["getOne"];

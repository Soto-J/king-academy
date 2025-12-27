import type { AppRouter } from "@/trpc/routers/_app";
import type { inferRouterOutputs } from "@trpc/server";

export type GetPlayers = inferRouterOutputs<AppRouter>["players"]["getMany"];
export type GetPlayer = inferRouterOutputs<AppRouter>["players"]["getOne"];

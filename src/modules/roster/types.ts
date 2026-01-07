import type { AppRouter } from "@/trpc/routers/_app";
import type { inferRouterOutputs } from "@trpc/server";

export type RosterGetMany = inferRouterOutputs<AppRouter>["roster"]["getMany"];
export type RosterGetOne = inferRouterOutputs<AppRouter>["roster"]["getOne"];

export type RosterDeleteOne =
  inferRouterOutputs<AppRouter>["roster"]["deleteOne"];

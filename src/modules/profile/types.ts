import { inferRouterOutputs } from "@trpc/server";
import { AppRouter } from "@/trpc/routers/_app";

export type ProfileGetOne = inferRouterOutputs<AppRouter>["profile"]["getOne"];

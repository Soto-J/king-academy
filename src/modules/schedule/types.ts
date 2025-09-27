import type { AppRouter } from "@/trpc/routers/_app";
import type { inferRouterOutputs } from "@trpc/server";

export interface ScheduleEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  type: "training" | "match" | "camp" | "special";
  duration: string;
  ageGroup?: string;
  coach?: string;
}

export interface ScheduleDay {
  date: string;
  events: ScheduleEvent[];
}

export type ScheduleGetOne =
  inferRouterOutputs<AppRouter>["schedule"]["getOne"];
export type ScheduleGetMany =
  inferRouterOutputs<AppRouter>["schedule"]["getMany"];

import { z } from "zod";

export const ScheduleIdentitySchema = z.object({
  scheduleId: z.string().min(1, "Schedule ID required"),
});

export const ScheduleGetOneSchema = ScheduleIdentitySchema;

export const ScheduleFormSchema = z.object({
  gameNumber: z.string().min(1, "Game # required."),
  division: z.string().min(1, "Division is required."),
  homeTeam: z.string().min(1, "Home team is required."),
  visitingTeam: z.string().min(1, "Visiting team is required."),
  location: z.string().min(1, "Location is required."),
  date: z.string().min(1, "Date is required."),
  startTime: z.string().min(1, "Start time is required."),
  endTime: z.string().min(1, "End time is required."),
});

export const ScheduleEditOneMutationSchema = ScheduleFormSchema.extend({
  scheduleId: z.string().nullish(),
});

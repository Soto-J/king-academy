import { z } from "zod";

export const ScheduleFormSchema = z.object({
  gameNumber: z.number(),
  division: z.string().min(1, "Division is required"),
  homeTeam: z.string().min(1, "Home team is required"),
  visitingTeam: z.string().min(1, "Visiting team is required"),
  location: z.string().min(1, "Location is required"),
  date: z.string().min(1, "Date is required"),
  startTime: z.string().min(1, "Start date is required"),
  endTime: z.string().min(1, "End date is required"),
});

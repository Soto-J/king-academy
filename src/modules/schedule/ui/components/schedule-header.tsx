import { Calendar } from "lucide-react";

import { Button } from "@/components/ui/button";

export const ScheduleHeader = () => {
  return (
    <div className="relative">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-foreground text-3xl font-bold">
            Game Schedule
          </h1>

          <p className="text-muted-foreground mt-2">
            Complete schedule for King Academy 7U Hybrid Division
          </p>
        </div>

        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
          <Calendar className="mr-2 h-4 w-4" />
          Add to Calendar
        </Button>
      </div>
    </div>
  );
};
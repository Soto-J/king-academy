import { z } from "zod";
import { Control } from "react-hook-form";
import { Calendar, Clock } from "lucide-react";

import { ScheduleFormSchema } from "@/modules/schedule/schemas";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface DateSectionProps {
  control: Control<z.infer<typeof ScheduleFormSchema>>;
}

export const DateSection = ({ control }: DateSectionProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Calendar className="text-primary h-5 w-5" />
          Schedule
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        <FormField
          name="date"
          control={control}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Game Date
              </FormLabel>

              <FormControl>
                <Input
                  {...field}
                  type="date"
                  className="w-fit text-center font-medium"
                />
              </FormControl>

              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2">
          <FormField
            name="startTime"
            control={control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-green-600" />
                  Start Time
                </FormLabel>

                <FormControl>
                  <Input
                    {...field}
                    type="time"
                    className="w-fit text-center font-medium"
                  />
                </FormControl>

                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />

          <FormField
            name="endTime"
            control={control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-red-600" />
                  End Time
                </FormLabel>

                <FormControl>
                  <Input
                    {...field}
                    type="time"
                    className="w-fit text-center font-medium"
                  />
                </FormControl>

                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
        </div>
      </CardContent>
    </Card>
  );
};

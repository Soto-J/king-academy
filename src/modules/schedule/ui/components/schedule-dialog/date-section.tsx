import { z } from "zod";

import { Trophy } from "lucide-react";
import { Control } from "react-hook-form";

import { ScheduleFormSchema } from "@/modules/schedule/schemas";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface DateSectionProps {
  control: Control<z.infer<typeof ScheduleFormSchema>>;
}

export const DateSection = ({ control }: DateSectionProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Trophy className="text-primary h-5 w-5" />

          <span>Date</span>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <FormField
          name="date"
          control={control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date</FormLabel>

              <Input {...field} type="date" />
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 justify-items-start gap-x-2">
          <FormField
            name="startTime"
            control={control}
            render={({ field }) => (
              <FormItem className="">
                <FormLabel>Start time</FormLabel>

                <Input {...field} type="time" />

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="endTime"
            control={control}
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="endTime">End time</FormLabel>

                <Input {...field} type="time" />

                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </CardContent>
    </Card>
  );
};

import { z } from "zod";

import { Control } from "react-hook-form";

import { FileText } from "lucide-react";

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

interface TeamsSectionProps {
  control: Control<z.infer<typeof ScheduleFormSchema>>;
}

export const TeamsSection = ({ control }: TeamsSectionProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <FileText className="text-primary h-5 w-5" />
          Teams
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        <FormField
          name="homeTeam"
          control={control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Player Bio</FormLabel>

              <FormControl>
                <Input {...field} placeholder="Home Team" />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="visitingTeam"
          control={control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Visiting Team</FormLabel>

              <FormControl>
                <Input {...field} placeholder="Visiting Team" />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
};

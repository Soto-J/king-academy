import { z } from "zod";

import { Control } from "react-hook-form";

import { User, GraduationCap } from "lucide-react";

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

interface LocationSectionProps {
  control: Control<z.infer<typeof ScheduleFormSchema>>;
}

export const LocationSection = ({ control }: LocationSectionProps) => {
  return (
    <Card>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormField
            name="location"
            control={control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input placeholder="John" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </CardContent>
    </Card>
  );
};

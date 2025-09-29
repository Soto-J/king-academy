import { z } from "zod";
import { Control } from "react-hook-form";
import { MapPin } from "lucide-react";

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
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <MapPin className="text-primary h-5 w-5" />
          Location
        </CardTitle>
      </CardHeader>

      <CardContent>
        <FormField
          name="location"
          control={control}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Game Location
              </FormLabel>

              <FormControl>
                <Input
                  placeholder="Enter field or venue name"
                  {...field}
                  className="pl-10"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%236b7280' viewBox='0 0 24 24'%3E%3Cpath d='M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z'/%3E%3C/svg%3E")`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "8px center",
                    backgroundSize: "16px",
                  }}
                />
              </FormControl>

              <FormMessage className="h-4 text-xs" />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
};

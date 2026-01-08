import { z } from "zod";
import { Control, Controller } from "react-hook-form";
import { Users, Home, Plane } from "lucide-react";

import { ScheduleFormSchema } from "@/modules/schedule/schemas";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Field, FieldLabel } from "@/components/ui/field";
import { FormErrorMessage } from "@/components/form-error-message";

interface TeamsSectionProps {
  control: Control<z.infer<typeof ScheduleFormSchema>>;
}

export const TeamsSection = ({ control }: TeamsSectionProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Users className="text-primary h-5 w-5" />
          Teams
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <Controller
          name="homeTeam"
          control={control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel
                htmlFor={field.name}
                className="flex items-center gap-2"
              >
                <Home className="h-4 w-4 text-green-600" />
                Home Team
              </FieldLabel>

              <Input
                {...field}
                id={field.name}
                placeholder="Enter home team name"
                className="pl-10"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%2316a34a' viewBox='0 0 24 24'%3E%3Cpath d='M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z'/%3E%3C/svg%3E")`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "8px center",
                  backgroundSize: "16px",
                }}
              />

              <FormErrorMessage error={fieldState.error} />
            </Field>
          )}
        />

        <Controller
          name="visitingTeam"
          control={control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel
                htmlFor={field.name}
                className="flex items-center gap-2"
              >
                <Plane className="h-4 w-4 text-blue-600" />
                Visiting Team
              </FieldLabel>

              <Input
                {...field}
                id={field.name}
                placeholder="Enter visiting team name"
                className="pl-10"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%232563eb' viewBox='0 0 24 24'%3E%3Cpath d='M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z'/%3E%3C/svg%3E")`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "8px center",
                  backgroundSize: "16px",
                }}
              />

              <FormErrorMessage error={fieldState.error} />
            </Field>
          )}
        />
      </CardContent>
    </Card>
  );
};

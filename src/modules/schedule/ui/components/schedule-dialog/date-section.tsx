import { z } from "zod";
import { Control, Controller } from "react-hook-form";
import { Calendar, Clock } from "lucide-react";

import { ScheduleFormSchema } from "@/modules/schedule/schemas";

import { FormErrorMessage } from "@/components/form-error-message";
import { Input } from "@/components/ui/input";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";

interface DateSectionProps {
  control: Control<z.infer<typeof ScheduleFormSchema>>;
}

export const DateSection = ({ control }: DateSectionProps) => {
  return (
    <FieldSet>
      <FieldLegend className="flex items-center gap-2 text-lg">
        <Calendar className="text-primary h-5 w-5" />
        <h2>Schedule</h2>
      </FieldLegend>

      <FieldGroup className="rounded-lg border p-4">
        <Controller
          name="date"
          control={control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel
                htmlFor={field.name}
                className="flex items-center gap-2"
              >
                <Calendar className="h-4 w-4" />
                Game Date
              </FieldLabel>

              <Input
                {...field}
                type="date"
                className="w-fit text-center font-medium"
              />

              <FormErrorMessage error={fieldState.error} />
            </Field>
          )}
        />

        <div className="grid grid-cols-2">
          <Controller
            name="startTime"
            control={control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel
                  htmlFor={field.name}
                  className="flex items-center gap-2"
                >
                  <Clock className="h-4 w-4 text-green-600" />
                  Start Time
                </FieldLabel>

                <Input
                  {...field}
                  id={field.name}
                  type="time"
                  className="w-fit text-center font-medium"
                />

                <FormErrorMessage error={fieldState.error} />
              </Field>
            )}
          />

          <Controller
            name="endTime"
            control={control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel
                  htmlFor={field.name}
                  className="flex items-center gap-2"
                >
                  <Clock className="h-4 w-4 text-red-600" />
                  End Time
                </FieldLabel>

                <Input
                  {...field}
                  id={field.name}
                  type="time"
                  className="w-fit text-center font-medium"
                />

                <FormErrorMessage error={fieldState.error} />
              </Field>
            )}
          />
        </div>
      </FieldGroup>
    </FieldSet>
  );
};

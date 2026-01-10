import { z } from "zod";
import { Control, Controller } from "react-hook-form";
import { Calendar, Clock } from "lucide-react";

import { ScheduleFormSchema } from "@/modules/schedule/schemas";

import FormErrorMessage from "@/components/form-error-message";

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

export default function DateSection({ control }: DateSectionProps) {
  return (
    <FieldSet>
      <FieldLegend className="flex items-center gap-2 text-lg">
        <Calendar className="text-primary h-5 w-5" />
        <h2>Schedule</h2>
      </FieldLegend>

      <FieldGroup className="flex items-center rounded-lg border p-4">
        <div className="flex flex-col items-center justify-center gap-6">
          <Controller
            name="date"
            control={control}
            render={({ field, fieldState }) => (
              <Field className="gap-1.5">
                <FieldLabel htmlFor={field.name} className="gap-1.5">
                  <Calendar className="h-4 w-4" />
                  <span>Game Date</span>
                </FieldLabel>

                <Input
                  {...field}
                  type="date"
                  className="h-8 max-w-40 px-2 py-1 text-sm"
                />

                <FormErrorMessage error={fieldState.error} />
              </Field>
            )}
          />

          <div className="grid grid-cols-2 gap-4">
            <Controller
              name="startTime"
              control={control}
              render={({ field, fieldState }) => (
                <Field className="gap-1.5">
                  <FieldLabel htmlFor={field.name} className="gap-1.5">
                    <Clock className="h-4 w-4 text-green-600" />
                    <span>Start Time</span>
                  </FieldLabel>

                  <Input
                    {...field}
                    id={field.name}
                    type="time"
                    className="h-8 max-w-32 px-2 py-1 text-sm"
                  />

                  <FormErrorMessage error={fieldState.error} />
                </Field>
              )}
            />

            <Controller
              name="endTime"
              control={control}
              render={({ field, fieldState }) => (
                <Field className="gap-1.5">
                  <FieldLabel htmlFor={field.name} className="gap-1.5">
                    <Clock className="h-4 w-4 text-red-600" />
                    <span>End Time</span>
                  </FieldLabel>

                  <Input
                    {...field}
                    id={field.name}
                    type="time"
                    className="h-8 max-w-32 px-2 py-1 text-sm"
                  />

                  <FormErrorMessage error={fieldState.error} />
                </Field>
              )}
            />
          </div>
        </div>
      </FieldGroup>
    </FieldSet>
  );
}

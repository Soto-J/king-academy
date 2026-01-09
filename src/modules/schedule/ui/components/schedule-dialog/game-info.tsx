import { z } from "zod";
import { Control, Controller } from "react-hook-form";
import { Trophy } from "lucide-react";

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

interface GameInfoProps {
  control: Control<z.infer<typeof ScheduleFormSchema>>;
}

export const GameInfo = ({ control }: GameInfoProps) => {
  return (
    <FieldSet>
      <FieldLegend className="flex items-center gap-2 text-lg">
        <Trophy className="text-primary h-5 w-5" />
        <h2>Game Information</h2>
      </FieldLegend>

      <FieldGroup className="grid grid-cols-2 gap-4 rounded-lg border p-4">
        <Controller
          name="gameNumber"
          control={control}
          render={({ field, fieldState }) => (
            <Field className="items-center gap-1.5">
              <FieldLabel htmlFor={field.name} className="justify-center gap-1.5">
                Game #
              </FieldLabel>

              <Input
                {...field}
                id={field.name}
                placeholder="1"
                type="number"
                className="h-8 max-w-24 px-2 py-1 text-center text-sm"
              />

              <FormErrorMessage error={fieldState.error} />
            </Field>
          )}
        />

        <Controller
          name="division"
          control={control}
          render={({ field, fieldState }) => (
            <Field className="items-center gap-1.5">
              <FieldLabel htmlFor={field.name} className="justify-center gap-1.5">
                Division
              </FieldLabel>

              <Input
                {...field}
                id={field.name}
                placeholder="A"
                className="h-8 max-w-24 px-2 py-1 text-center text-sm"
              />

              <FormErrorMessage error={fieldState.error} />
            </Field>
          )}
        />
      </FieldGroup>
    </FieldSet>
  );
};

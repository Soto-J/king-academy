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

      <FieldGroup className="grid grid-cols-2 gap-4 space-y-4">
        <Controller
          name="gameNumber"
          control={control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel htmlFor={field.name}>Game #</FieldLabel>

              <Input
                {...field}
                id={field.name}
                placeholder="1"
                type="number"
                className="text-center font-medium"
              />

              <FormErrorMessage error={fieldState.error} />
            </Field>
          )}
        />

        <Controller
          name="division"
          control={control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel htmlFor={field.name}>Division</FieldLabel>

              <Input
                {...field}
                id={field.name}
                placeholder="A"
                className="text-center font-medium"
              />

              <FormErrorMessage error={fieldState.error} />
            </Field>
          )}
        />
      </FieldGroup>
    </FieldSet>
  );
};

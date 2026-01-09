import { z } from "zod";

import { Trophy } from "lucide-react";
import { Control, Controller } from "react-hook-form";

import { POSITIONS, BATTING_STANCE, THROWING_ARM } from "@/db/schema";

import { formatPositionLabel, formatStanceLabel } from "@/lib/utils";

import { ProfileFormSchema } from "@/modules/profile/schemas";

import { FormErrorMessage } from "@/components/form-error-message";
import { Input } from "@/components/ui/input";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface BaseballInformationSectionProps {
  control: Control<z.infer<typeof ProfileFormSchema>>;
}

export const BaseballInformationSection = ({
  control,
}: BaseballInformationSectionProps) => {
  return (
    <FieldSet>
      <FieldLegend className="flex items-center gap-2 text-lg">
        <Trophy className="text-primary h-5 w-5" />
        <h2>Baseball Information</h2>
      </FieldLegend>

      <FieldGroup className="rounded-lg border p-4">
        <Controller
          name="primaryPosition"
          control={control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel htmlFor={field.name}>Primary Position</FieldLabel>

              <Select
                onValueChange={field.onChange}
                value={field.value || undefined}
              >
                <SelectTrigger>
                  <SelectValue
                    id={field.name}
                    placeholder="Select primary position"
                  />
                </SelectTrigger>

                <SelectContent>
                  {POSITIONS.map((position) => (
                    <SelectItem key={position} value={position}>
                      {formatPositionLabel(position)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <FormErrorMessage error={fieldState.error} />
            </Field>
          )}
        />

        <Controller
          name="positions"
          control={control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel>Positions (check all that apply)</FieldLabel>

              <FieldGroup className="mt-2 grid grid-cols-2 gap-3">
                {POSITIONS.map((position) => (
                  <div key={position} className="flex items-center space-x-2">
                    <Input
                      {...field}
                      type="checkbox"
                      id={position}
                      checked={
                        field.value
                          ? field.value.includes(position)
                          : field.value === position
                      }
                      onChange={(e) =>
                        e.target.checked
                          ? field.onChange([...field.value, position])
                          : field.onChange(
                              field.value.filter((p) => p !== position),
                            )
                      }
                      className="border-border size-3"
                    />

                    <label
                      htmlFor={position}
                      className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {formatPositionLabel(position)}
                    </label>
                  </div>
                ))}
              </FieldGroup>

              <FormErrorMessage error={fieldState.error} />
            </Field>
          )}
        />

        <FieldGroup className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Controller
            name="battingStance"
            control={control}
            render={({ field, fieldState }) => (
              <Field className="space-y-3">
                <FieldLabel htmlFor={field.name}>Batting Stance</FieldLabel>

                <Select
                  {...field}
                  onValueChange={field.onChange}
                  value={field.value || undefined}
                >
                  <SelectTrigger id={field.name}>
                    <SelectValue
                      id={field.name}
                      placeholder="Select batting stance"
                    />
                  </SelectTrigger>

                  <SelectContent>
                    {BATTING_STANCE.map((stance) => (
                      <SelectItem key={stance} value={stance}>
                        {formatStanceLabel(stance)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <FormErrorMessage error={fieldState.error} />
              </Field>
            )}
          />

          <Controller
            name="throwingArm"
            control={control}
            render={({ field, fieldState }) => (
              <Field className="space-y-3">
                <FieldLabel htmlFor={field.name}>Throwing Arm</FieldLabel>

                <Select
                  {...field}
                  onValueChange={field.onChange}
                  value={field.value || undefined}
                >
                  <SelectTrigger id={field.name}>
                    <SelectValue placeholder="Select throwing arm" />
                  </SelectTrigger>

                  <SelectContent>
                    {THROWING_ARM.map((arm) => (
                      <SelectItem key={arm} value={arm}>
                        {formatStanceLabel(arm)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <FormErrorMessage error={fieldState.error} />
              </Field>
            )}
          />
        </FieldGroup>
      </FieldGroup>
    </FieldSet>
  );
};

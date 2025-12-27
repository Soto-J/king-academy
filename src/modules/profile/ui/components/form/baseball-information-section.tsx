import { z } from "zod";

import { Trophy } from "lucide-react";
import { Control, Controller, UseFormWatch } from "react-hook-form";

import { POSITIONS, BATTING_STANCE, THROWING_ARM } from "@/db/schema";

import { ProfileFormSchema } from "@/modules/profile/schemas";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
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
  watch: UseFormWatch<z.infer<typeof ProfileFormSchema>>;
}

export const BaseballInformationSection = ({
  control,
  watch,
}: BaseballInformationSectionProps) => {
  const formatPositionLabel = (position: string) => {
    return position
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const formatStanceLabel = (stance: string) => {
    return stance.charAt(0).toUpperCase() + stance.slice(1);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Trophy className="text-primary h-5 w-5" />

          <span>Baseball Information</span>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <Controller
          name="primaryPosition"
          control={control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel>Primary Position</FieldLabel>

              <Select
                onValueChange={field.onChange}
                value={field.value || undefined}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select primary position" />
                </SelectTrigger>

                <SelectContent>
                  {POSITIONS.map((position) => (
                    <SelectItem key={position} value={position}>
                      {formatPositionLabel(position)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {fieldState.invalid && (
                <FieldError errors={[fieldState.error]} className="text-xs" />
              )}
            </Field>
          )}
        />

        <Controller
          name="positions"
          control={control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel>Positions (check all that apply)</FieldLabel>

              <div className="mt-2 grid grid-cols-2 gap-3">
                {POSITIONS.map((position) => (
                  <div key={position} className="flex items-center space-x-2">
                    <input
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
                      className="border-border rounded"
                    />

                    <label
                      htmlFor={position}
                      className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {formatPositionLabel(position)}
                    </label>
                  </div>
                ))}
              </div>

              {fieldState.invalid && (
                <div className="min-h-5">
                  <FieldError errors={[fieldState.error]} className="text-xs" />
                </div>
              )}
            </Field>
          )}
        />

        <FieldGroup className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Controller
            name="battingStance"
            control={control}
            render={({ field, fieldState }) => (
              <Field className="space-y-3">
                <FieldLabel>Batting Stance</FieldLabel>

                <Select
                  onValueChange={field.onChange}
                  value={field.value || undefined}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select batting stance" />
                  </SelectTrigger>

                  <SelectContent>
                    {BATTING_STANCE.map((stance) => (
                      <SelectItem key={stance} value={stance}>
                        {formatStanceLabel(stance)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {fieldState.invalid && (
                  <div className="min-h-5">
                    <FieldError
                      errors={[fieldState.error]}
                      className="text-xs"
                    />
                  </div>
                )}
              </Field>
            )}
          />

          <Controller
            name="throwingArm"
            control={control}
            render={({ field, fieldState }) => (
              <Field className="space-y-3">
                <FieldLabel>Throwing Arm</FieldLabel>

                <Select
                  onValueChange={field.onChange}
                  value={field.value || undefined}
                >
                  <SelectTrigger>
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

                {fieldState.invalid && (
                  <div className="min-h-5">
                    <FieldError
                      errors={[fieldState.error]}
                      className="text-xs"
                    />
                  </div>
                )}
              </Field>
            )}
          />
        </FieldGroup>
      </CardContent>
    </Card>
  );
};

import { z } from "zod";

import { Trophy } from "lucide-react";
import { Control, UseFormWatch } from "react-hook-form";

import { POSITIONS, BATTING_STANCE, THROWING_ARM } from "@/db/schema";

import { ProfileFormSchema } from "../../../schemas";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

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
        <FormField
          name="primaryPosition"
          control={control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Primary Position</FormLabel>

              <Select
                onValueChange={field.onChange}
                value={field.value || undefined}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select primary position" />
                  </SelectTrigger>
                </FormControl>

                <SelectContent>
                  {POSITIONS.map((position) => (
                    <SelectItem key={position} value={position}>
                      {formatPositionLabel(position)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <FormMessage className="h-4 text-xs" />
            </FormItem>
          )}
        />

        <FormField
          name="positions"
          control={control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Positions (check all that apply)</FormLabel>

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

              <FormMessage className="h-4 text-xs" />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="space-y-3">
            <FormField
              name="battingStance"
              control={control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Batting Stance</FormLabel>

                  <Select
                    onValueChange={field.onChange}
                    value={field.value || undefined}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select batting stance" />
                      </SelectTrigger>
                    </FormControl>

                    <SelectContent>
                      {BATTING_STANCE.map((stance) => (
                        <SelectItem key={stance} value={stance}>
                          {formatStanceLabel(stance)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <FormMessage className="h-4 text-xs" />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-3">
            <FormField
              name="throwingArm"
              control={control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Throwing Arm</FormLabel>

                  <Select
                    onValueChange={field.onChange}
                    value={field.value || undefined}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select throwing arm" />
                      </SelectTrigger>
                    </FormControl>

                    <SelectContent>
                      {THROWING_ARM.map((arm) => (
                        <SelectItem key={arm} value={arm}>
                          {formatStanceLabel(arm)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <FormMessage className="h-4 text-xs" />
                </FormItem>
              )}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

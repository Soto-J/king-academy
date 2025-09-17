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
                      onChange={(e) => {
                        e.target.checked
                          ? field.onChange([...field.value, position])
                          : field.onChange(
                              field.value.filter((p) => p !== position),
                            );
                      }}
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

              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="space-y-3">
            <FormField
              name="battingStance.stance"
              control={control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Batting Stance</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
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
                  <FormMessage />
                </FormItem>
              )}
            />

            {watch("battingStance.stance") === "switch" && (
              <FormField
                name="battingStance.primarySide"
                control={control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Primary Side (for switch hitter)</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select primary side" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="left">Left</SelectItem>
                        <SelectItem value="right">Right</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <FormField
              name="battingStance.isPrimary"
              control={control}
              render={({ field }) => (
                <FormItem className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="battingStancePrimary"
                    checked={field.value}
                    onChange={field.onChange}
                    className="border-border rounded"
                  />
                  <FormLabel htmlFor="battingStancePrimary" className="text-sm">
                    Primary stance
                  </FormLabel>
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-3">
            <FormField
              name="throwingArm.arm"
              control={control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Throwing Arm</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
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
                  <FormMessage />
                </FormItem>
              )}
            />

            {watch("throwingArm.arm") === "switch" && (
              <FormField
                name="throwingArm.primarySide"
                control={control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Primary Side (for switch thrower)</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select primary side" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="left">Left</SelectItem>
                        <SelectItem value="right">Right</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <FormField
              name="throwingArm.isPrimary"
              control={control}
              render={({ field }) => (
                <FormItem className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="throwingArmPrimary"
                    checked={field.value}
                    onChange={field.onChange}
                    className="border-border rounded"
                  />
                  <FormLabel htmlFor="throwingArmPrimary" className="text-sm">
                    Primary arm
                  </FormLabel>
                </FormItem>
              )}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

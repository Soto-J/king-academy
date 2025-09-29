import { z } from "zod";
import { Control } from "react-hook-form";
import { Trophy } from "lucide-react";

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

interface GameInfoProps {
  control: Control<z.infer<typeof ScheduleFormSchema>>;
}

export const GameInfo = ({ control }: GameInfoProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Trophy className="text-primary h-5 w-5" />
          Game Information
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <FormField
            name="gameNumber"
            control={control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Game #</FormLabel>

                <FormControl>
                  <Input
                    placeholder="1"
                    {...field}
                    className="text-center font-medium"
                  />
                </FormControl>

                <FormMessage className="h-4 text-xs" />
              </FormItem>
            )}
          />

          <FormField
            name="division"
            control={control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Division</FormLabel>

                <FormControl>
                  <Input
                    placeholder="A"
                    {...field}
                    className="text-center font-medium"
                  />
                </FormControl>

                <FormMessage className="h-4 text-xs" />
              </FormItem>
            )}
          />
        </div>
      </CardContent>
    </Card>
  );
};

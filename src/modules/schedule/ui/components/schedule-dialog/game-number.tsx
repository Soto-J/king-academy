import { z } from "zod";

import { MapPin } from "lucide-react";
import { Control } from "react-hook-form";

import { ScheduleFormSchema } from "@/modules/schedule/schemas";

import { Input } from "@/components/ui/input";
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

interface GameNumberProps {
  control: Control<z.infer<typeof ScheduleFormSchema>>;
}

export const GameNumber = ({ control }: GameNumberProps) => {
  return (
    <Card>
      <CardContent>
        <FormField
          name="gameNumber"
          control={control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Game #</FormLabel>

              <FormControl>
                <Input placeholder="Ex. 1" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
};

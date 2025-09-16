import { FileText } from "lucide-react";
import { Control } from "react-hook-form";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { ProfileFormSchema } from "../../../schemas";
import { z } from "zod";

interface BioSectionProps {
  control: Control<z.infer<typeof ProfileFormSchema>>;
}

export const BioSection = ({ control }: BioSectionProps) => {
  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <FileText className="h-5 w-5 text-primary" />
          About You
        </CardTitle>
      </CardHeader>
      <CardContent>
        <FormField
          name="bio"
          control={control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Player Bio</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Tell us about your baseball journey, achievements, goals..."
                  className="min-h-[100px] resize-none"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
};
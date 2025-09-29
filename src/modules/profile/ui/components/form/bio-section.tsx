import { z } from "zod";

import { Control } from "react-hook-form";

import { FileText } from "lucide-react";

import { ProfileFormSchema } from "../../../schemas";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface BioSectionProps {
  control: Control<z.infer<typeof ProfileFormSchema>>;
}

export const BioSection = ({ control }: BioSectionProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <FileText className="text-primary h-5 w-5" />
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

              <div className="min-h-[1.25rem]">
                <FormMessage className="text-xs" />
              </div>
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
};

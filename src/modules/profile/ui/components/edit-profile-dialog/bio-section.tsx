import { z } from "zod";
import { Control, Controller } from "react-hook-form";

import { FileText } from "lucide-react";

import { ProfileFormSchema } from "@/modules/profile/schemas";

import { FormErrorMessage } from "@/components/form-error-message";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Field, FieldLabel } from "@/components/ui/field";

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
        <Controller
          name="bio"
          control={control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel>Player Bio</FieldLabel>

              <Textarea
                {...field}
                placeholder="Tell us about your baseball journey, achievements, goals..."
                className="min-h-25 resize-none"
              />

              <FormErrorMessage error={fieldState.error} />
            </Field>
          )}
        />
      </CardContent>
    </Card>
  );
};

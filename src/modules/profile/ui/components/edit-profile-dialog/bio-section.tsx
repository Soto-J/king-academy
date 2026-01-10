import { z } from "zod";
import { Control, Controller } from "react-hook-form";

import { FileText } from "lucide-react";

import { ProfileFormSchema } from "@/modules/profile/schemas";

import  FormErrorMessage  from "@/components/form-error-message";
import { Textarea } from "@/components/ui/textarea";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";

interface BioSectionProps {
  control: Control<z.infer<typeof ProfileFormSchema>>;
}

export default function BioSection({ control }: BioSectionProps) {
  return (
    <FieldSet>
      <FieldLegend className="flex items-center gap-2 text-lg">
        <FileText className="text-primary h-5 w-5" />
        <h2>About You</h2>
      </FieldLegend>

      <FieldGroup className="rounded-lg border p-4">
        <Controller
          name="bio"
          control={control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel htmlFor={field.name}>Player Bio</FieldLabel>

              <Textarea
                {...field}
                id={field.name}
                placeholder="Tell us about your baseball journey, achievements, goals..."
                className="min-h-25 resize-none"
              />

              <FormErrorMessage error={fieldState.error} />
            </Field>
          )}
        />
      </FieldGroup>
    </FieldSet>
  );
}

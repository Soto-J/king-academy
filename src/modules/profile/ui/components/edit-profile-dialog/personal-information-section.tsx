import { z } from "zod";
import { Control, Controller } from "react-hook-form";

import { User, GraduationCap } from "lucide-react";

import { formatPhoneNumber } from "@/lib/utils";

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

interface PersonalInformationSectionProps {
  control: Control<z.infer<typeof ProfileFormSchema>>;
}

export const PersonalInformationSection = ({
  control,
}: PersonalInformationSectionProps) => {
  return (
    <FieldSet>
      <FieldLegend className="flex items-center gap-2 text-lg">
        <User className="text-primary h-5 w-5" />
        <h2>Personal Information</h2>
      </FieldLegend>

      <FieldGroup className="rounded-lg border p-4">
        <FieldGroup className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Controller
            name="firstName"
            control={control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel htmlFor={field.name}>First Name</FieldLabel>

                <Input
                  {...field}
                  id={field.name}
                  placeholder="John"
                  autoComplete="given-name"
                />

                <FormErrorMessage error={fieldState.error} />
              </Field>
            )}
          />

          <Controller
            name="lastName"
            control={control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel htmlFor={field.name}>Last Name</FieldLabel>

                <Input
                  id={field.name}
                  placeholder="Smith"
                  autoComplete="family-name"
                  {...field}
                />

                <FormErrorMessage error={fieldState.error} />
              </Field>
            )}
          />

          <Controller
            name="dateOfBirth"
            control={control}
            render={({ field, fieldState }) => {
              const displayValue =
                field.value instanceof Date
                  ? field.value.toISOString().split("T")[0]
                  : field.value || "";

              return (
                <Field>
                  <FieldLabel htmlFor={field.name}>Date of Birth</FieldLabel>

                  <Input
                    {...field}
                    id={field.name}
                    type="date"
                    value={displayValue}
                    max={new Date().toISOString().slice(0, 10)}
                    onChange={(e) => {
                      const v = e.target.value;
                      if (!v) return field.onChange(null);

                      field.onChange(new Date(v + "T00:00:00.000Z"));
                    }}
                  />

                  <FormErrorMessage error={fieldState.error} />
                </Field>
              );
            }}
          />
        </FieldGroup>
        
        <div className="flex gap-x-4">
          <Controller
            name="phoneNumber"
            control={control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel htmlFor={field.name}>Phone Number</FieldLabel>

                <Input
                  {...field}
                  id={field.name}
                  placeholder="(555) 123-4567"
                  inputMode="tel"
                  autoComplete="tel-national"
                  value={formatPhoneNumber(field.value ?? "")}
                  onChange={(e) => {
                    const digits = e.target.value.replace(/\D/g, "");
                    field.onChange(digits);
                  }}
                />

                <FormErrorMessage error={fieldState.error} />
              </Field>
            )}
          />
          
          <Controller
            name="emergencyNumber"
            control={control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel htmlFor={field.name}>Emergency Number</FieldLabel>

                <Input
                  {...field}
                  id={field.name}
                  placeholder="(555) 123-4567"
                  inputMode="tel"
                  autoComplete="tel"
                  value={formatPhoneNumber(field.value ?? "")}
                  onChange={(e) => {
                    const digits = e.target.value.replace(/\D/g, "");
                    field.onChange(digits);
                  }}
                />

                <FormErrorMessage error={fieldState.error} />
              </Field>
            )}
          />
        </div>

        <Controller
          name="school"
          control={control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel
                htmlFor={field.name}
                className="flex items-center gap-2"
              >
                <GraduationCap className="h-4 w-4" />
                School
              </FieldLabel>

              <Input
                {...field}
                id={field.name}
                placeholder="Your school or university"
              />

              <FormErrorMessage error={fieldState.error} />
            </Field>
          )}
        />
      </FieldGroup>
    </FieldSet>
  );
};

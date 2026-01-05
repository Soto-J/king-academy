import { z } from "zod";

import { Control, Controller } from "react-hook-form";

import { format } from "date-fns";

import { User, GraduationCap } from "lucide-react";

import { ProfileFormSchema } from "@/modules/profile/schemas";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { FormErrorMessage } from "@/components/form-error-message";
import { formatPhoneNumber } from "@/lib/utils";

interface PersonalInformationSectionProps {
  control: Control<z.infer<typeof ProfileFormSchema>>;
}

export const PersonalInformationSection = ({
  control,
}: PersonalInformationSectionProps) => {
  return (
    <Card>
      <FieldSet>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <User className="text-primary h-5 w-5" />
            Personal Information
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <FieldGroup className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Controller
              name="firstName"
              control={control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>First Name</FieldLabel>

                  <Input
                    placeholder="John"
                    autoComplete="given-name"
                    {...field}
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
                  <FieldLabel>Last Name</FieldLabel>

                  <Input
                    placeholder="Smith"
                    autoComplete="family-name"
                    {...field}
                  />

                  <FormErrorMessage error={fieldState.error} />
                </Field>
              )}
            />
          </FieldGroup>
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
                  <FieldLabel htmlFor="dob">Date of Birth</FieldLabel>

                  <Input
                    id="dob"
                    type="date"
                    value={displayValue}
                    onChange={(e) => {
                      const v = e.target.value;
                      if (!v) return field.onChange(null);

                      field.onChange(new Date(v + "T00:00:00.000Z"));
                    }}
                    onBlur={field.onBlur}
                    name={field.name}
                    ref={field.ref}
                    max={new Date().toISOString().slice(0, 10)}
          
                  />

                  <FormErrorMessage error={fieldState.error} />
                </Field>
              );
            }}
          />

          <FieldGroup className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Controller
              name="phoneNumber"
              control={control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>Phone Number</FieldLabel>

                  <Input
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

            <Controller
              name="emergencyNumber"
              control={control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>Emergency Number</FieldLabel>

                  <Input
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
          </FieldGroup>

          <Controller
            name="school"
            control={control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel className="flex items-center gap-2">
                  <GraduationCap className="h-4 w-4" />
                  School
                </FieldLabel>

                <Input placeholder="Your school or university" {...field} />

                <FormErrorMessage error={fieldState.error} />
              </Field>
            )}
          />
        </CardContent>
      </FieldSet>
    </Card>
  );
};

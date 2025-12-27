import { z } from "zod";

import { Control, Controller } from "react-hook-form";

import { format } from "date-fns";

import { User, GraduationCap } from "lucide-react";

import { ProfileFormSchema } from "../../../schemas";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";

interface PersonalInformationSectionProps {
  control: Control<z.infer<typeof ProfileFormSchema>>;
}

export const PersonalInformationSection = ({
  control,
}: PersonalInformationSectionProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <User className="text-primary h-5 w-5" />
          Personal Information
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Controller
            name="firstName"
            control={control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>First Name</FieldLabel>

                <Input placeholder="John" {...field} />

                {fieldState.invalid && (
                  <div className="min-h-5">
                    <FieldError
                      errors={[fieldState.error]}
                      className="text-xs"
                    />
                  </div>
                )}
              </Field>
            )}
          />

          <Controller
            name="lastName"
            control={control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>Last Name</FieldLabel>

                <Input placeholder="Smith" {...field} />

                {fieldState.invalid && (
                  <div className="min-h-5">
                    <FieldError
                      errors={[fieldState.error]}
                      className="text-xs"
                    />
                  </div>
                )}
              </Field>
            )}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
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
                  />

                  {fieldState.invalid && (
                    <div className="min-h-5">
                      <FieldError
                        errors={[fieldState.error]}
                        className="text-xs"
                      />
                    </div>
                  )}
                </Field>
              );
            }}
          />

          <Controller
            name="phoneNumber"
            control={control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>Phone Number</FieldLabel>

                <Input placeholder="(555) 123-4567" {...field} />

                {fieldState.invalid && (
                  <div className="min-h-5">
                    <FieldError
                      errors={[fieldState.error]}
                      className="text-xs"
                    />
                  </div>
                )}
              </Field>
            )}
          />
        </div>

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

              {fieldState.invalid && (
                <div className="min-h-5">
                  <FieldError errors={[fieldState.error]} className="text-xs" />
                </div>
              )}
            </Field>
          )}
        />
      </CardContent>
    </Card>
  );
};

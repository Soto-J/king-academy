import { z } from "zod";

import { MapPin } from "lucide-react";
import { Control, Controller } from "react-hook-form";

import { ProfileFormSchema } from "@/modules/profile/schemas";

import { US_STATES } from "@/modules/profile/constants";

import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { FormErrorMessage } from "@/components/form-error-message";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface AddressSectionProps {
  control: Control<z.infer<typeof ProfileFormSchema>>;
}

export const AddressSection = ({ control }: AddressSectionProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <MapPin className="text-primary h-5 w-5" />
          <span>Address</span>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <FieldSet>
          <FieldGroup>
            <Controller
              name="address.street"
              control={control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel htmlFor={field.name}>Street Address</FieldLabel>

                  <Input
                    {...field}
                    id={field.name}
                    placeholder="123 Main Street"
                  />

                  <FormErrorMessage error={fieldState.error} />
                </Field>
              )}
            />

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <Controller
                name="address.city"
                control={control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel htmlFor={field.name}>City</FieldLabel>

                    <Input {...field} id={field.name} placeholder="City" />

                    <FormErrorMessage error={fieldState.error} />
                  </Field>
                )}
              />

              <Controller
                name="address.state"
                control={control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel htmlFor={field.name}>State</FieldLabel>

                    <Select
                      onValueChange={field.onChange}
                      value={field.value || ""}
                    >
                      <SelectTrigger id={field.name}>
                        <SelectValue {...field} placeholder="Select state" />
                      </SelectTrigger>

                      <SelectContent>
                        {US_STATES.map((state) => (
                          <SelectItem key={state.value} value={state.value}>
                            {state.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <FormErrorMessage error={fieldState.error} />
                  </Field>
                )}
              />

              <Controller
                name="address.zipcode"
                control={control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel htmlFor={field.name}>ZIP Code</FieldLabel>

                    <Input
                      {...field}
                      id={field.name}
                      placeholder="12345"
                      value={field.value || ""}
                    />

                    <FormErrorMessage error={fieldState.error} />
                  </Field>
                )}
              />
            </div>
          </FieldGroup>
        </FieldSet>
      </CardContent>
    </Card>
  );
};

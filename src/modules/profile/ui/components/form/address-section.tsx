import { z } from "zod";

import { MapPin } from "lucide-react";
import { Control } from "react-hook-form";

import { ProfileFormSchema } from "@/modules/profile/schemas";

import { US_STATES } from "@/modules/profile/constants";

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
        <FormField
          name="address.street"
          control={control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Street Address</FormLabel>

              <FormControl>
                <Input
                  placeholder="123 Main Street"
                  {...field}
                />
              </FormControl>

              <FormMessage className="h-4 text-xs"/>
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <FormField
            name="address.city"
            control={control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>City</FormLabel>

                <FormControl>
                  <Input
                    placeholder="City"
                    {...field}
                    // value={field.value || ""}
                  />
                </FormControl>

                <div className="min-h-[1.25rem]">
                  <FormMessage className="h-4 text-xs"/>
                </div>
              </FormItem>
            )}
          />

          <FormField
            name="address.state"
            control={control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>State</FormLabel>

                <Select
                  onValueChange={field.onChange}
                  value={field.value || ""}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select state" />
                    </SelectTrigger>
                  </FormControl>
                  
                  <SelectContent>
                    {US_STATES.map((state) => (
                      <SelectItem key={state.value} value={state.value}>
                        {state.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <div className="min-h-[1.25rem]">
                  <FormMessage className="h-4 text-xs"/>
                </div>
              </FormItem>
            )}
          />

          <FormField
            name="address.zipcode"
            control={control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>ZIP Code</FormLabel>

                <FormControl>
                  <Input
                    placeholder="12345"
                    {...field}
                    value={field.value || ""}
                  />
                </FormControl>

                <div className="min-h-[1.25rem]">
                  <FormMessage className="h-4 text-xs"/>
                </div>
              </FormItem>
            )}
          />
        </div>
      </CardContent>
    </Card>
  );
};

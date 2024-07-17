"use client";

import { useTransition } from "react";

import { Batting } from "@prisma/client";

import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { formSchema, POSITION_OPTIONS } from "@/schemas";
import { User } from "@/lib/action-helpers/user-service";

import { onEditProfile } from "@/actions/edit-profile";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DialogClose } from "@/components/ui/dialog";

export type EditFormSchema = z.infer<typeof formSchema>;

type EditProfileFormProps = {
  user: User;
  closeDropdown: () => void;
};

const EditProfileForm = ({ user, closeDropdown }: EditProfileFormProps) => {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      // Default Values for form
      school: user?.school ?? "",
      dateOfBirth: user?.dateOfBirth ?? "",
      phoneNumber: user?.phoneNumber ?? "",
      address: {
        street: user.address?.street ?? "",
        city: user.address?.city ?? "",
        state: user.address?.state ?? "",
        zip: user.address?.zip ?? "",
      },
      positions: user.positions?.map((position) => position.position) ?? [],
      batting: user?.batting ?? undefined,
      throwing: user?.throwing ?? undefined,
      bio: user?.bio ?? "",
    },
  });

  const onSubmit = (data: EditFormSchema) => {
    startTransition(() => {
      onEditProfile(data, user.id)
        .then(() => {
          console.log("Edit successful");

          closeDropdown();
        })
        .catch((error) => console.log(error));
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mx-auto py-6">
        {/* School */}
        <FormField
          control={form.control}
          name="school"
          render={({ field }) => (
            <FormItem className="p-3">
              <FormLabel>School</FormLabel>
              <FormControl>
                <Input required type="text" placeholder="School" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        {/* Date of birth */}
        <FormField
          control={form.control}
          name="dateOfBirth"
          render={({ field }) => (
            <FormItem className="p-3">
              <FormLabel>Date of Birth:</FormLabel>
              <FormControl>
                <Input
                  required
                  type="date"
                  placeholder="Month/Day/Year"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        {/* Phone Number */}
        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem className="p-3">
              <FormLabel>Phone:</FormLabel>

              <FormControl>
                <Input
                  required
                  type="tel"
                  placeholder="000 - 000 - 0000"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        {/* Address */}
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <div className="md:grid md:grid-cols-2">
              {["street", "city", "state", "zip"].map((label) => (
                <FormItem key={label} className="h-24 p-3">
                  <FormLabel className="capitalize">{label}</FormLabel>

                  <FormControl>
                    <Input
                      required
                      type={label === "zip" ? "number" : "text"}
                      placeholder={label}
                      {...field}
                      onChange={(e) =>
                        field.onChange({
                          ...field.value,
                          [label]: e.target.value,
                        })
                      }
                      value={field.value[label as keyof typeof field.value]}
                      className="capitalize"
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              ))}
            </div>
          )}
        />

        {/* Positions */}
        <FormField
          name="positions"
          control={form.control}
          render={({ field }) => (
            <FormItem className="p-3">
              <FormLabel>Position</FormLabel>

              <div className="grid grid-cols-2 md:grid-cols-3">
                {POSITION_OPTIONS.map(({ position, label }) => (
                  <FormItem key={position} className="flex items-center">
                    <FormControl>
                      <Checkbox
                        checked={field.value?.includes(position)}
                        onCheckedChange={(isChecked) => {
                          const newValue = isChecked
                            ? [...(field.value || []), position]
                            : (field.value || []).filter(
                                (item) => item !== position,
                              );

                          field.onChange(newValue);
                        }}
                      />
                    </FormControl>
                    <FormLabel className="pb-2 pl-2">{label}</FormLabel>
                  </FormItem>
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Batting */}
        <FormField
          control={form.control}
          name="batting"
          render={({ field }) => (
            <FormItem className="p-3">
              <FormLabel>Batting</FormLabel>

              <Select onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                </FormControl>

                <SelectContent>
                  <SelectItem value={Batting.LEFT}>Left</SelectItem>
                  <SelectItem value={Batting.RIGHT}>Right</SelectItem>
                  <SelectItem value={Batting.SWITCH}>Switch</SelectItem>
                </SelectContent>
              </Select>

              <FormMessage />
            </FormItem>
          )}
        />

        {/* Throwing */}
        <FormField
          control={form.control}
          name="throwing"
          render={({ field }) => (
            <FormItem className="p-3">
              <FormLabel>Throwing</FormLabel>

              <Select onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                </FormControl>

                <SelectContent>
                  <SelectItem value={Batting.LEFT}>Left</SelectItem>
                  <SelectItem value={Batting.RIGHT}>Right</SelectItem>
                  <SelectItem value={Batting.SWITCH}>Switch</SelectItem>
                </SelectContent>
              </Select>

              <FormMessage />
            </FormItem>
          )}
        />

        {/* Bio */}
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem className="p-3">
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea placeholder="Bio" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <DialogClose asChild>
          <Button type="submit" className="ml-auto mt-8 max-w-fit">
            Submit
          </Button>
        </DialogClose>
      </form>
    </Form>
  );
};

export default EditProfileForm;

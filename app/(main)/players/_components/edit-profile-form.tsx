"use client";

import { ElementRef, useEffect, useRef, useState, useTransition } from "react";

import { Batting, Position } from "@prisma/client";

import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { formSchema } from "@/schemas";
import { editUser } from "@/actions/editUser";

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

const POSITION_OPTIONS = [
  { position: Position.PITCHER, label: "Pitcher" },
  { position: Position.CATCHER, label: "Catcher" },
  { position: Position.FIRSTBASE, label: "First Base" },
  { position: Position.SECONDBASE, label: "Second Base" },
  { position: Position.THIRDBASE, label: "Third Base" },
  { position: Position.SHORTSTOP, label: "Shortstop" },
  { position: Position.LEFTFIELD, label: "Left Field" },
  { position: Position.CENTERFIELD, label: "Center Field" },
  { position: Position.RIGHTFIELD, label: "Right Field" },
  { position: Position.DESIGNATEDHITTER, label: "Designated Hitter" },
  { position: Position.BENCH, label: "Bench" },
] as const;

export type EditFormSchema = z.infer<typeof formSchema>;

type EditProfileFormProps = {
  userId: string;
};

const EditProfileForm = ({ userId }: EditProfileFormProps) => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [isPending, startTransition] = useTransition();
  const closeRef = useRef<ElementRef<"button">>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      // school: "",
      address: {
        street: "",
        city: "",
        state: "",
        zip: "",
      },
      // bio: "",
    },
  });

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    return null;
  }

  const onSubmit = (data: EditFormSchema) => {
    startTransition(() => {
      editUser(data, userId)
        .then(() => {
          console.log("Edit successful");
          closeRef.current?.click();
        })
        .catch((error) => console.log(error));
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mx-auto p-4">
        {/* School */}
        <FormField
          control={form.control}
          name="school"
          render={({ field }) => (
            <FormItem className="p-3">
              <FormLabel>School</FormLabel>
              <FormControl>
                <Input type="text" placeholder="School" {...field} />
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
                  <FormField
                    name="positions"
                    key={position}
                    control={form.control}
                    render={({ field }) => (
                      <FormItem key={position} className="flex items-center">
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(position)}
                            onCheckedChange={(isChecked) => {
                              if (isChecked) {
                                return field.onChange([
                                  ...(field?.value || []),
                                  position,
                                ]);
                              }

                              field.onChange(
                                (field?.value || []).filter(
                                  (item) => item !== position,
                                ),
                              );
                            }}
                          />
                        </FormControl>

                        <FormLabel className="pb-2 pl-2">{label}</FormLabel>
                      </FormItem>
                    )}
                  />
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

        {/* <DialogClose asChild ref={closeRef}> */}
          <Button type="submit" className="ml-auto mt-8 max-w-fit">
            Submit
          </Button>
        {/* </DialogClose> */}
      </form>
    </Form>
  );
};

export default EditProfileForm;

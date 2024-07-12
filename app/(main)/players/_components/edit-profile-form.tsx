"use client";

import { useEffect, useState, useTransition } from "react";

import { Batting, Position, Throwing } from "@prisma/client";

import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

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

const formSchema = z.object({
  school: z.string({ required_error: "School is required" }).min(2),
  address: z.object({
    street: z.string({ required_error: "Street is required" }).min(1),
    city: z.string({ required_error: "City is required" }).min(1),
    state: z.string({ required_error: "State is required" }).min(1),
    zip: z.string({ required_error: "Zip is required" }).min(5).max(5),
  }),
  positions: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "At least one position is required",
  }),
  batting: z.enum([Batting.RIGHT, Batting.LEFT, Batting.SWITCH]),
  throwing: z.enum([Throwing.RIGHT, Throwing.LEFT, Throwing.SWITCH]),
  bio: z.string(),
});

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

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      // school: "",
      // address: {
      //   street: "",
      //   city: "",
      //   state: "",
      //   zip: "",
      // },
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
        })
        .catch((error) => console.log(error));
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mx-auto w-[95%] max-w-xl"
      >
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

        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <div className="md:grid md:grid-cols-2">
              {["street", "city", "state", "zip"].map((inputName) => (
                <FormItem key={inputName} className="p-3">
                  <FormLabel className="capitalize">{inputName}</FormLabel>
                  <FormControl>
                    <Input
                      type={inputName === "zip" ? "number" : "text"}
                      placeholder={inputName}
                      {...field}
                      onChange={(e) =>
                        field.onChange({
                          ...field.value,
                          [inputName]: e.target.value,
                        })
                      }
                      value={field.value[inputName as keyof typeof field.value]}
                      className="capitalize"
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              ))}
            </div>
          )}
        />

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
                            onCheckedChange={(checked) =>
                              checked
                                ? field.onChange([...field.value, position])
                                : field.onChange(
                                    field.value.filter(
                                      (item) => item !== position,
                                    ),
                                  )
                            }
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

        <div className="ml-auto mt-8 max-w-fit">
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </Form>
  );
};

export default EditProfileForm;

"use client";

import { useEffect, useState } from "react";

import { Batting, Position, Throwing } from "@prisma/client";

import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
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
import { Checkbox } from "@/components/ui/checkbox";

const formSchema = z.object({
  school: z.string().min(1),
  address: z.object({
    street: z.string().min(1),
    city: z.string().min(1),
    state: z.string().min(1),
    zip: z.string().min(4),
  }),
  batting: z.enum([Batting.RIGHT, Batting.LEFT, Batting.SWITCH]),
  bio: z.string(),
  throwing: z.enum([Throwing.RIGHT, Throwing.LEFT, Throwing.SWITCH]),
  position: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "At least one position is required",
  }),
  // position: z.array(
  //   z.enum([
  //     Position.PITCHER,
  //     Position.CATCHER,
  //     Position.FIRSTBASE,
  //     Position.SECONDBASE,
  //     Position.THIRDBASE,
  //     Position.SHORTSTOP,
  //     Position.LEFTFIELD,
  //     Position.CENTERFIELD,
  //     Position.RIGHTFIELD,
  //     Position.DESIGNATEDHITTER,
  //     Position.BENCH,
  //   ]),
  // ),
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

const ProfileForm = () => {
  const [isHydrated, setIsHydrated] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      address: {
        street: "",
        city: "",
        state: "",
        zip: "",
      },
      position: [],
    },
  });

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    return null;
  }

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log("Submitted");
    console.log(data);
  };

  return (
    <div className="mx-auto mt-24 w-[95%] max-w-xl border p-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="school"
            render={({ field }) => (
              <FormItem className="p-3">
                <FormLabel>School</FormLabel>
                <FormControl>
                  <Input type="textarea" placeholder="School" {...field} />
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
                        placeholder={inputName}
                        {...field}
                        onChange={(e) =>
                          field.onChange({
                            ...field.value,
                            [inputName]: e.target.value,
                          })
                        }
                        value={
                          field.value[inputName as keyof typeof field.value]
                        }
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
            name="position"
            control={form.control}
            render={({ field }) => (
              <FormItem className="p-3">
                <FormLabel>Position</FormLabel>

                <div className="grid grid-cols-2 md:grid-cols-3">
                  {POSITION_OPTIONS.map(({ position, label }) => (
                    <FormField
                      name="position"
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
                  <Input type="textarea" placeholder="Bio" {...field} />
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
    </div>
  );
};

export default ProfileForm;

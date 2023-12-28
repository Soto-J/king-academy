"use client";

import { Batting, Position, Throwing } from "@prisma/client";

import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
// import { Input } from "@/components/ui/input";

const formSchema = z.object({
  age: z.number().int().positive(),
  school: z.string().min(1),
  address: z.object({
    street: z.string().min(1),
    city: z.string().min(1),
    state: z.string().min(1),
    zip: z.string().min(1),
  }),
  bio: z.string(),
  batting: z.enum([Batting.RIGHT, Batting.LEFT, Batting.SWITCH]),
  throwing: z.enum([Throwing.RIGHT, Throwing.LEFT, Throwing.SWITCH]),
  position: z.array(
    z.enum([
      Position.PITCHER,
      Position.CATCHER,
      Position.FIRSTBASE,
      Position.SECONDBASE,
      Position.THIRDBASE,
      Position.SHORTSTOP,
      Position.LEFTFIELD,
      Position.CENTERFIELD,
      Position.RIGHTFIELD,
      Position.DESIGNATEDHITTER,
      Position.BENCH,
    ]),
  ),
});

const ProfileForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="age"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Age</FormLabel>
              <FormControl>
                
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

export default ProfileForm;

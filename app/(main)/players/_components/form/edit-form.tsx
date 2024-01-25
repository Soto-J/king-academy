"use client";

import { useState, useTransition } from "react";
import { Batting } from "@prisma/client";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  type EditFormSchema,
  editFormSchema,
  POSITION_OPTIONS,
} from "@/schemas";

import { type UserWithProfileAndAddress } from "@/data/user";
import { createOrUpdateProfile } from "@/data/profile";

import { Button } from "@/components/ui/button";
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
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { DialogClose } from "@/components/ui/dialog";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { ActionButtons } from "./action-buttons";
import { onCreateOrUpdateProfile } from "@/actions/edit-profile";

type EditProfileFormProps = {
  user: UserWithProfileAndAddress;
  setIsOpen: (isOpen: boolean) => void;
};

export const EditForm = ({ user, setIsOpen }: EditProfileFormProps) => {
  const router = useRouter();

  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const [isPending, startTransition] = useTransition();

  const form = useForm<EditFormSchema>({
    resolver: zodResolver(editFormSchema),
    defaultValues: {
      firstName: user.profile?.firstName || "",
      lastName: user.profile?.lastName || "",
      phoneNumber: user.profile?.phoneNumber || "",
      dateOfBirth: user.profile?.dateOfBirth || "",
      school: user.profile?.school || "",
      address: {
        street: user.profile?.address?.street || "",
        city: user.profile?.address?.city || "",
        state: user.profile?.address?.state || "",
        zip: user.profile?.address?.zip || "",
      },
      positions: user.profile?.positions || [],
      batting: user.profile?.batting || Batting.RIGHT,
      throwing: user.profile?.throwing || Batting.RIGHT,
      bio: user.profile?.bio || "",
    },
  });

  const onSubmit = (data: EditFormSchema) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      onCreateOrUpdateProfile(user?.id, data)
        .then((data) => {
          setSuccess(data?.success);
          toast.success(data?.success);
        })
        .catch((error) => {
          setError(error);
          toast.error(error);
        });

      // createOrUpdateProfile(user?.id, data)
      //   .then((value) => {
      // if (value?.error) {
      // setSuccess(value?.success);
      // toast.error(value?.success);
      //   return;
      // }

      // if (value?.success) {
      //   router.refresh();
      //   setSuccess(value.success);
      //   toast.success(value.success);
      //   setIsOpen(false);
      //   return;
      // }
    });
    // .catch((error) => {
    //   setError(error);
    //   toast.error(error);
    // });
    // });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mx-auto w-[95%] max-w-xl py-4"
      >
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem className="p-3">
              <FormLabel>Frist Name:</FormLabel>
              <FormControl>
                <Input type="text" placeholder="First Name" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem className="p-3">
              <FormLabel>Last Name:</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Last Name" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem className="p-3">
              <FormLabel>Phone:</FormLabel>
              <FormControl>
                <Input type="tel" placeholder="000 - 000 - 0000" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="dateOfBirth"
          render={({ field }) => (
            <FormItem className="p-3">
              <FormLabel>Date of Birth:</FormLabel>
              <FormControl>
                <Input type="date" placeholder="Month/Day/Year" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="school"
          render={({ field }) => (
            <FormItem className="p-3">
              <FormLabel>School:</FormLabel>
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
                <FormItem key={inputName} className="h-24 p-3">
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

              <div className="grid grid-cols-2 gap-y-2 md:grid-cols-3">
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

        <div className="mt-8 flex w-full justify-end gap-x-4">
          <DialogClose asChild>
            <Button size="lg" disabled={isPending} variant="secondary">
              Cancel
            </Button>
          </DialogClose>

          <Button
            type="submit"
            size="lg"
            disabled={isPending}
            className="font-semibold"
          >
            Submit
          </Button>
        </div>

        <ActionButtons disabled={isPending} />
      </form>
    </Form>
  );
};

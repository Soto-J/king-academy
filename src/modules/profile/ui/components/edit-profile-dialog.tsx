"use client";

import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { toast } from "sonner";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";

import { ProfileGetOne } from "../../types";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { ResponsiveDialog } from "@/components/responsive-dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ProfileEditSchema, ProfileFormSchema } from "../../schemas";

interface EditProfileDialogProps {
  onOpenDialog: boolean;
  onCloseDialog: () => void;
  initialValues: ProfileGetOne;
}

export const EditProfileDialog = ({
  onOpenDialog,
  onCloseDialog,
  initialValues,
}: EditProfileDialogProps) => {
  const [firstName, lastName] = initialValues?.user?.name?.split(" ") || [
    "",
    "",
  ];

  const form = useForm<z.infer<typeof ProfileFormSchema>>({
    resolver: zodResolver(ProfileFormSchema),
    defaultValues: {
      firstName: firstName,
      lastName: lastName,
      bio: initialValues?.profile?.bio ?? "",
      dateOfBirth: initialValues.profile?.dateOfBirth
        ? new Date(initialValues.profile.dateOfBirth)
        : null,
      phoneNumber: initialValues.profile?.phoneNumber ?? "",
      address: {
        street: initialValues.profile?.street ?? "",
        city: initialValues.profile?.city ?? "",
        state: initialValues.profile?.state ?? "",
        zipcode: initialValues.profile?.zipCode ?? "",
      },

      position: initialValues.profile?.position || undefined,
      battingStance: initialValues.profile?.stance || undefined,
      throwingArm: initialValues.profile?.stance || undefined,
    },
  });

  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const editProfile = useMutation(
    trpc.profile.edit.mutationOptions({
      onSuccess: async () => {
        if (initialValues?.user?.id) {
          await queryClient.invalidateQueries(
            trpc.profile.getOne.queryOptions({
              userId: initialValues.user.id,
            }),
          );
        }

        toast.success("Profile Updated!");
        onCloseDialog();
      },

      onError: (error) => {
        console.error(error);
        toast.error(error.message);
      },
    }),
  );

  const onSubmit = (values: z.infer<typeof ProfileFormSchema>) => {
    if (!initialValues?.user?.id) {
      console.warn("EditProfileDialog: Cannot submit without user ID");
      return;
    }

    editProfile.mutate({
      userId: initialValues.user.id,
      ...values,
    });
  };

  // Defensive guard: Don't render if user data is missing
  if (!initialValues?.user?.id) {
    console.warn("EditProfileDialog: Missing user data");
    return null;
  }

  return (
    <ResponsiveDialog
      title="Edit Profile"
      description="Update your racing profile information"
      isOpen={onOpenDialog}
      onOpenChange={onCloseDialog}
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="max-h-[80vh] overflow-hidden"
        >
          <ScrollArea className="h-[450px]">
            <div className="space-y-6 p-4">
              {/* Personal Information Section */}
              <div className="rounded-xl border border-blue-100 bg-gradient-to-br from-blue-50 to-white p-4">
                <div className="mb-4 flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500">
                    <span className="text-sm font-bold text-white">👤</span>
                  </div>
                  <h3 className="font-semibold text-gray-900">
                    Personal Information
                  </h3>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <FormField
                    name="firstName"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-gray-700">
                          First Name
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="John"
                            {...field}
                            className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    name="lastName"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-gray-700">
                          Last Name
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Smith"
                            {...field}
                            className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="rounded-xl border border-green-100 bg-gradient-to-br from-green-50 to-white p-4">
                <div className="mb-4 flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-500">
                    <span className="text-sm font-bold text-white">📝</span>
                  </div>
                  <h3 className="font-semibold text-gray-900">About You</h3>
                </div>

                <FormField
                  name="bio"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700">
                        Driver Bio
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          placeholder="Tell us about your racing journey, favorite series, achievements..."
                          className="min-h-[100px] resize-none border-gray-300 focus:border-green-500 focus:ring-green-500"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </ScrollArea>

          <div className="flex items-center justify-between border-t border-gray-200 bg-white pt-4">
            <Button
              type="button"
              variant="outline"
              disabled={editProfile.isPending}
              onClick={onCloseDialog}
              className="border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              size="lg"
              disabled={editProfile.isPending}
              className="bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg hover:from-blue-700 hover:to-blue-800"
            >
              {editProfile.isPending ? "Updating..." : "Update Profile"}
            </Button>
          </div>
        </form>
      </Form>
    </ResponsiveDialog>
  );
};

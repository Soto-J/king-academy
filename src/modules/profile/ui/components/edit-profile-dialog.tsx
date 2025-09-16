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
import { ResponsiveDialog } from "@/components/responsive-dialog";
import { Form } from "@/components/ui/form";
import { ProfileFormSchema } from "../../schemas";

import { PersonalInformationSection } from "./sections/personal-information-section";
import { AddressSection } from "./sections/address-section";
import { BaseballInformationSection } from "./sections/baseball-information-section";
import { BioSection } from "./sections/bio-section";

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
      dateOfBirth: initialValues.profile?.dateOfBirth
        ? new Date(initialValues.profile.dateOfBirth)
        : null,
      phoneNumber: initialValues.profile?.phoneNumber ?? "",
      school: initialValues.profile?.school ?? "",
      address: {
        street: initialValues.profile?.street ?? "",
        city: initialValues.profile?.city ?? "",
        state: initialValues.profile?.state ?? "",
        zipcode: initialValues.profile?.zipCode ?? "",
      },
      bio: initialValues?.profile?.bio ?? "",
      position: initialValues.profile?.position
        ? [initialValues.profile.position]
        : [],
      battingStance: initialValues.profile?.stance
        ? {
            stance: initialValues.profile.stance,
            isPrimary: true,
            primarySide: undefined,
          }
        : undefined,
      throwingArm: initialValues.profile?.arm
        ? {
            arm: initialValues.profile.arm,
            isPrimary: true,
            primarySide: undefined,
          }
        : undefined,
      isPrimary: true,
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

  if (!initialValues?.user?.id) {
    console.warn("EditProfileDialog: Missing user data");
    return null;
  }

  return (
    <ResponsiveDialog
      title="Edit Profile"
      description="Update your baseball profile information"
      isOpen={onOpenDialog}
      onOpenChange={onCloseDialog}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <ScrollArea className="h-[500px] pr-4">
            <div className="space-y-6">
              <PersonalInformationSection control={form.control} />
              <AddressSection control={form.control} />
              <BaseballInformationSection control={form.control} watch={form.watch} />
              <BioSection control={form.control} />
            </div>
          </ScrollArea>

          <div className="flex items-center justify-between border-t pt-6">
            <Button
              type="button"
              variant="outline"
              disabled={editProfile.isPending}
              onClick={onCloseDialog}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={editProfile.isPending}
              className="bg-primary hover:bg-primary/90"
            >
              {editProfile.isPending ? "Updating..." : "Update Profile"}
            </Button>
          </div>
        </form>
      </Form>
    </ResponsiveDialog>
  );
};

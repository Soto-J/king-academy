"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";

import { ProfileGetOne } from "@/modules/profile/types";
import { ProfileFormSchema } from "@/modules/profile/schemas";

import { ResponsiveDialog } from "@/components/responsive-dialog";

import { PersonalInformationSection } from "./personal-information-section";
import { AddressSection } from "./address-section";
import { BaseballInformationSection } from "./baseball-information-section";
import { BioSection } from "./bio-section";

interface EditProfileDialogProps {
  isOpen: boolean;
  onCloseDialog: () => void;
  initialValues: ProfileGetOne;
}

export const EditProfileDialog = ({
  isOpen,
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
      phoneNumber: initialValues.profile?.phoneNumber || "",
      school: initialValues.profile?.school || "",
      address: {
        street: initialValues.profile.address?.street || "",
        city: initialValues.profile.address?.city || "",
        state: initialValues.profile.address?.state || "",
        zipcode: initialValues.profile.address?.zipCode || "",
      },
      bio: initialValues?.profile?.bio || "",
      positions:
        initialValues.baseballProfile?.positions?.map(
          (value) => value.position,
        ) || [],
      primaryPosition:
        initialValues.baseballProfile?.positions?.find((pos) => pos.isPrimary)
          ?.position || null,
      battingStance: initialValues.baseballProfile?.battingStance || null,
      throwingArm: initialValues.baseballProfile?.throwingArm || null,
    },
  });

  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const editProfile = useMutation(
    trpc.profile.edit.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries({
          queryKey: [["profile"]],
        });

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
    console.log({ values });

    try {
      editProfile.mutate({
        userId: initialValues.user.id,
        ...values,
      });
    } catch (error) {
      console.error("Error during form submission:", error);
      toast.error("Failed to submit form");
    }
  };

  if (!initialValues?.user?.id) {
    console.warn("EditProfileDialog: Missing user data");
    return null;
  }

  return (
    <ResponsiveDialog
      title="Edit Profile"
      description="Update your baseball profile information"
      isOpen={isOpen}
      isPending={editProfile.isPending}
      onOpenChange={onCloseDialog}
      onClose={onCloseDialog}
    >
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-6 overflow-y-auto">
          <PersonalInformationSection control={form.control} />
          <AddressSection control={form.control} />
          <BaseballInformationSection
            control={form.control}
            watch={form.watch}
          />
          <BioSection control={form.control} />
        </div>
      </form>
    </ResponsiveDialog>
  );
};

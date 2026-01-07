"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

import { toast } from "sonner";

import { cn } from "@/lib/utils";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";

import type { RosterGetOne } from "@/modules/roster/types";

import { useRosterFilters } from "@/modules/roster/hooks/use-roster-filter";

import { RosterEditOneInputSchema } from "@/modules/roster/schema";

import { FormActions } from "@/modules/roster/ui/components/form-actions";

import { FormErrorMessage } from "@/components/form-error-message";
import { ResponsiveDialog } from "@/components/responsive-dialog";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";

interface EditProfileDialogProps {
  onOpenDialog: boolean;
  onCloseDialog: () => void;
  initialValues: RosterGetOne;
}

export const EditPlayerDialog = ({
  onOpenDialog,
  onCloseDialog,
  initialValues,
}: EditProfileDialogProps) => {
  const [filters, _] = useRosterFilters();

  const form = useForm<z.infer<typeof RosterEditOneInputSchema>>({
    resolver: zodResolver(RosterEditOneInputSchema),
    defaultValues: {
      isActive: initialValues.isActive,
      role: initialValues.role,
    },
  });

  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const editProfile = useMutation(
    trpc.roster.editOne.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(
          trpc.roster.getMany.queryOptions({
            ...filters,
          }),
        );

        toast.success("Profile Updated!");
        onCloseDialog();
      },

      onError: (error) => {
        console.error("Edit profile error:", error);
        toast.error(error.message || "Failed to update profile");
      },
    }),
  );

  const onSubmit = (values: z.infer<typeof RosterEditOneInputSchema>) => {
    editProfile.mutate({
      ...values,
      userId: initialValues.id,
    });
  };

  return (
    <ResponsiveDialog
      title="Edit Member"
      description={`${initialValues.name}'s profile`}
      isOpen={onOpenDialog}
      onOpenChange={onCloseDialog}
    >
      <form
        id="edit-player-form"
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex h-full flex-col"
      >
        <div className="flex-1 space-y-6 overflow-y-auto p-6">
          <Controller
            name="isActive"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field className="space-y-3">
                <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50/50 p-4 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800/30 dark:hover:bg-gray-800/50">
                  <div className="space-y-1">
                    <FieldLabel
                      htmlFor="isActive"
                      className="text-sm font-semibold text-gray-900 dark:text-gray-100"
                    >
                      Member Status
                    </FieldLabel>

                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      Toggle member&apos;s active status
                    </p>
                  </div>

                  <div className="flex items-center space-x-3">
                    <span
                      className={cn(
                        "text-sm font-medium transition-colors",
                        field.value
                          ? "text-green-700 dark:text-green-300"
                          : "text-gray-500 dark:text-gray-400",
                      )}
                    >
                      {field.value ? "Active" : "Inactive"}
                    </span>

                    <Switch
                      id="isActive"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="data-[state=checked]:bg-green-600 data-[state=unchecked]:bg-gray-300 dark:data-[state=unchecked]:bg-gray-600"
                    />
                  </div>
                </div>

                <FormErrorMessage error={fieldState.error} />
              </Field>
            )}
          />

          <Controller
            name="role"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field className="space-y-3">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="min-w-0 flex-1 space-y-1">
                    <FieldLabel className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                      Member Role
                    </FieldLabel>
                    <FieldDescription className="text-xs text-gray-600 dark:text-gray-400">
                      Define access level and permissions
                    </FieldDescription>
                  </div>

                  <div className="w-full sm:w-48">
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="h-10 w-full border-gray-300 transition-all focus:border-transparent focus:ring-2 focus:ring-blue-500 dark:border-gray-600">
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>

                      <SelectContent className="z-50">
                        <SelectGroup className="">
                          <SelectItem
                            value="admin"
                            className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                          >
                            <div className="flex w-full items-center justify-between gap-x-2">
                              <span className="font-medium">Admin</span>
                              <span className="rounded bg-orange-100 px-2 py-1 text-xs text-orange-600 dark:bg-orange-900/30 dark:text-orange-400">
                                Full Access
                              </span>
                            </div>
                          </SelectItem>

                          {/* <SelectItem
                            value="staff"
                            className="cursor-pointer px-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                          >
                            <div className="flex items-center justify-between gap-x-2">
                              <span className="font-medium">Staff</span>
                              <span className="rounded bg-blue-100 px-2 py-1 text-xs text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                                Limited Access
                              </span>
                            </div>
                          </SelectItem> */}

                          <SelectItem
                            value="user"
                            className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                          >
                            <div className="flex w-full items-center justify-between gap-x-2">
                              <span className="font-medium">User</span>
                              <span className="rounded bg-blue-100 px-2 py-1 text-xs text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                                Standard Access
                              </span>
                            </div>
                          </SelectItem>

                          {/* <SelectItem
                            value="guest"
                            className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                          >
                            <div className="flex w-full items-center justify-between gap-x-2">
                              <span className="font-medium">Guest</span>
                              <span className="rounded bg-green-100 px-2 py-1 text-xs text-green-600 dark:bg-green-900/30 dark:text-green-400">
                                Minimum Access
                              </span>
                            </div>
                          </SelectItem> */}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <FormErrorMessage error={fieldState.error} />
              </Field>
            )}
          />
        </div>

        <FormActions
          isPending={editProfile.isPending}
          onCloseDialog={onCloseDialog}
          formId="edit-player-form"
        />
      </form>
    </ResponsiveDialog>
  );
};

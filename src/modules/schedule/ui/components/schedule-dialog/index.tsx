"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";

import { ScheduleGetOne } from "@/modules/schedule/types";
import { ScheduleFormSchema } from "@/modules/schedule/schemas";

import { LocationSection } from "./location-section";
import { GameNumber } from "./game-number";
import { DateSection } from "./date-section";
import { TeamsSection } from "./teams-section";

import { ResponsiveDialog } from "@/components/responsive-dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

interface ScheduleDialogProps {
  onOpenDialog: boolean;
  onCloseDialog: () => void;
  initialValues: ScheduleGetOne | null;
  mode: "Create" | "Edit";
}

export const ScheduleDialog = ({
  onOpenDialog,
  onCloseDialog,
  initialValues,
  mode,
}: ScheduleDialogProps) => {
  const form = useForm<z.infer<typeof ScheduleFormSchema>>({
    resolver: zodResolver(ScheduleFormSchema),
    defaultValues: {
      gameNumber: initialValues?.gameNumber,
      division: initialValues?.division || "",
      homeTeam: initialValues?.homeTeam || "",
      visitingTeam: initialValues?.visitingTeam || "",
      location: initialValues?.location || "",
      date: initialValues?.date.toISOString() || "",
      startTime: initialValues?.startTime.toISOString() || "",
      endTime: initialValues?.endTime.toISOString() || "",
    },
  });

  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const editProfile = useMutation(
    trpc.profile.edit.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries({
          queryKey: [["schedule"]],
        });

        toast.success("Schedule Updated!");
        onCloseDialog();
      },

      onError: (error) => {
        console.error(error);
        toast.error(error.message);
      },
    }),
  );

  const onSubmit = (values: z.infer<typeof ScheduleFormSchema>) => {
    console.log({ values });

    // try {
    //   editProfile.mutate({
    //     userId: initialValues.user.id,
    //     ...values,
    //   });
    // } catch (error) {
    //   console.error("Error during form submission:", error);
    //   toast.error("Failed to submit form");
    // }
  };

  return (
    <ResponsiveDialog
      title={`${mode === "Create" ? "Create" : "Edit"} Schedule`}
      description={`${mode === "Create" ? "Create a new" : "Edit"} schedule.`}
      isOpen={onOpenDialog}
      onOpenChange={onCloseDialog}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <ScrollArea className="h-[500px] pr-4">
            <div className="space-y-6">
              <GameNumber control={form.control} />
              <DateSection control={form.control} />
              <TeamsSection control={form.control} />
              <LocationSection control={form.control} />
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

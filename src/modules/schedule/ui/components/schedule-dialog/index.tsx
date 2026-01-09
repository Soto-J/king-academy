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
import { GameInfo } from "./game-info";
import { DateSection } from "./date-section";
import { TeamsSection } from "./teams-section";

import { ResponsiveDialog } from "@/components/responsive-dialog";
import { FormActions } from "@/components/form-actions";
import { FieldGroup } from "@/components/ui/field";

type ScheduleDialogMode = "Create" | "Edit";

const getLabels = (mode: ScheduleDialogMode, isPending: boolean) => {
  if (mode === "Edit") {
    return {
      titleLabel: "Edit Schedule",
      descriptionLabel: "Edit an existing schedule.",
      buttonLabel: isPending ? "Updating..." : "Update Schedule",
    };
  }

  return {
    titleLabel: "Create Schedule",
    descriptionLabel: "Create a new schedule.",
    buttonLabel: isPending ? "Creating..." : "Create Schedule",
  };
};

interface ScheduleDialogProps {
  onOpenDialog: boolean;
  onCloseDialog: () => void;
  initialValues: ScheduleGetOne | null;
  mode: ScheduleDialogMode;
}

export const ScheduleDialog = ({
  onOpenDialog,
  onCloseDialog,
  initialValues,
  mode,
}: ScheduleDialogProps) => {
  const form = useForm<z.infer<typeof ScheduleFormSchema>>({
    resolver: zodResolver(ScheduleFormSchema),
    values: {
      gameNumber: initialValues?.gameNumber?.toString() || "",
      division: initialValues?.division || "",
      homeTeam: initialValues?.homeTeam || "",
      visitingTeam: initialValues?.visitingTeam || "",
      location: initialValues?.location || "",
      date: initialValues?.date
        ? initialValues.date.toISOString().split("T")[0]
        : "",
      startTime: initialValues?.startTime
        ? initialValues.startTime.slice(0, 5)
        : "",
      endTime: initialValues?.endTime ? initialValues.endTime.slice(0, 5) : "",
    },
  });

  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const insertSchedule = useMutation(
    trpc.schedule.insert.mutationOptions({
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
    try {
      insertSchedule.mutate({
        scheduleId: initialValues?.id,
        ...values,
      });
    } catch (error) {
      console.error("Error during form submission:", error);
      toast.error("Failed to submit form");
    }
  };

  const { titleLabel, descriptionLabel, buttonLabel } = getLabels(
    mode,
    insertSchedule.isPending,
  );

  return (
    <ResponsiveDialog
      title={titleLabel}
      description={descriptionLabel}
      isOpen={onOpenDialog}
      onOpenChange={onCloseDialog}
    >
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex h-full min-h-0 flex-col"
      >
        <FieldGroup className="min-h-0 flex-1 overflow-y-auto pr-2 pb-4">
          <GameInfo control={form.control} />
          <DateSection control={form.control} />
          <TeamsSection control={form.control} />
          <LocationSection control={form.control} />
        </FieldGroup>

        <FormActions
          isPending={insertSchedule.isPending}
          onCloseDialog={onCloseDialog}
          submitLabel="Update"
          pendingLabel="Updating"
        />
      </form>
    </ResponsiveDialog>
  );
};

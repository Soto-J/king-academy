"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";

import { ScheduleGetOne } from "@/modules/schedule/types";
import { ScheduleFormSchema } from "@/modules/schedule/schemas";

import ResponsiveDialog from "@/components/responsive-dialog";
import LocationSection from "./location-section";
import GameInfo from "./game-info";
import DateSection from "./date-section";
import TeamsSection from "./teams-section";
import FormActions from "@/components/form-actions";

import { FieldGroup } from "@/components/ui/field";

const LABELS = {
  Create: {
    titleLabel: "Create Schedule",
    descriptionLabel: "Create a new schedule.",
    submitLabel: "Create Schedule",
    pendingLabel: "Creating",
  },
  Edit: {
    titleLabel: "Edit Schedule",
    descriptionLabel: "Edit an existing schedule.",
    submitLabel: "Update",
    pendingLabel: "Updating",
  },
} as const;

interface ScheduleDialogProps {
  isOpen: boolean;
  onCloseDialog: () => void;
  initialValues: ScheduleGetOne | null;
  mode: "Create" | "Edit";
}

export default function ScheduleDialog({
  isOpen,
  onCloseDialog,
  initialValues,
  mode,
}: ScheduleDialogProps) {
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
    insertSchedule.mutate({
      scheduleId: initialValues?.id,
      ...values,
    });
  };

  const { titleLabel, descriptionLabel, submitLabel, pendingLabel } =
    LABELS[mode];

  return (
    <ResponsiveDialog
      title={titleLabel}
      description={descriptionLabel}
      isOpen={isOpen}
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
          submitLabel={submitLabel}
          pendingLabel={pendingLabel}
        />
      </form>
    </ResponsiveDialog>
  );
}

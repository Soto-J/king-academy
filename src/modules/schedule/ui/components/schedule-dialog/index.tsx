"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";

import { ScheduleGetOne } from "@/modules/schedule/types";
import {
  ScheduleEditSchema,
  ScheduleFormSchema,
} from "@/modules/schedule/schemas";

import { LocationSection } from "./location-section";
import { GameInfo } from "./game-info";
import { DateSection } from "./date-section";
import { TeamsSection } from "./teams-section";

import { ResponsiveDialog } from "@/components/responsive-dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

const getLabels = (mode: "Create" | "Edit", isPending: boolean) => {
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
      gameNumber: initialValues?.gameNumber?.toString() || "",
      division: initialValues?.division || "",
      homeTeam: initialValues?.homeTeam || "",
      visitingTeam: initialValues?.visitingTeam || "",
      location: initialValues?.location || "",
      date: initialValues?.date
        ? initialValues.date.toISOString().split("T")[0]
        : "",
      startTime: initialValues?.startTime
        ? initialValues.startTime.toString().split("T")[1].slice(0, 5)
        : "",
      endTime: initialValues?.endTime
        ? initialValues.endTime.toString().split("T")[1].slice(0, 5)
        : "",
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
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit, (error) =>
            console.error(error),
          )}
          className="space-y-6"
        >
          <ScrollArea className="h-[500px] pr-4">
            <div className="space-y-6">
              <GameInfo control={form.control} />
              <DateSection control={form.control} />
              <TeamsSection control={form.control} />
              <LocationSection control={form.control} />
            </div>
          </ScrollArea>

          <div className="flex items-center justify-between border-t pt-6">
            <Button
              type="button"
              variant="outline"
              disabled={insertSchedule.isPending}
              onClick={onCloseDialog}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={insertSchedule.isPending}
              className="bg-primary hover:bg-primary/90"
            >
              {buttonLabel}
            </Button>
          </div>
        </form>
      </Form>
    </ResponsiveDialog>
  );
};

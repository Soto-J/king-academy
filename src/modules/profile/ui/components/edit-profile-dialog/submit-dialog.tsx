import { Button } from "@/components/ui/button";

interface SubmitDialogProps {
  isPending: boolean;
  onClose: () => void;
}

export default function SubmitDialog({
  isPending,
  onClose,
}: SubmitDialogProps) {
  return (
    <div className="flex w-full items-center justify-between border-t pt-8">
      <Button
        type="button"
        variant="outline"
        disabled={isPending}
        onClick={onClose}
      >
        Cancel
      </Button>

      <Button
        type="submit"
        disabled={isPending}
        className="bg-primary hover:bg-primary/90"
      >
        {isPending ? "Updating..." : "Update Profile"}
      </Button>
    </div>
  );
}

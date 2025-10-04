import { Button } from "@/components/ui/button";

interface FormActionsProps {
  isPending: boolean;
  onCloseDialog: () => void;
}

export const FormActions = ({ isPending, onCloseDialog }: FormActionsProps) => {
  return (
    <div className="flex items-center justify-between gap-3 p-6 pt-4 dark:border-gray-700 dark:bg-gray-800/50">
      <Button
        type="button"
        variant="outline"
        disabled={isPending}
        onClick={onCloseDialog}
        className="px-6 py-2 transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
      >
        Cancel
      </Button>
      <Button
        type="submit"
        size="lg"
        disabled={isPending}
        className="bg-blue-600 px-8 py-2 font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isPending ? (
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            Updating...
          </div>
        ) : (
          "Update Member"
        )}
      </Button>
    </div>
  );
};

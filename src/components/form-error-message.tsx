import { FieldError as FieldErrorType } from "react-hook-form";
import { FieldError } from "@/components/ui/field";

interface FormErrorMessageProps {
  error?: FieldErrorType;
}
export default function FormErrorMessage({ error }: FormErrorMessageProps) {
  if (!error) return null;

  return (
    <div className="min-h-5">
      <FieldError errors={[error]} className="text-xs" />
    </div>
  );
}

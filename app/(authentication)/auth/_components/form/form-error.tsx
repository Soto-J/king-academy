// import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

type FormErrorProps = {
  message?: string;
};

const FormError = ({ message }: FormErrorProps) => {
  if (!message) {
    return null;
  }

  return (
    <div
      className="
        bg-destructive/15
        flex
        items-center
        gap-x-2
        rounded-md
        p-3
        text-sm
        text-destructive
      "
    >
      {/* <ExclamationTriangleIcon width={16} height={16} /> */}
      <p>{message}</p>
    </div>
  );
};

export default FormError;

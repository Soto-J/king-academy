// import { CheckCircledIcon } from "@radix-ui/react-icons";

type FormErrorProps = {
  message?: string;
};

const FormSuccess = ({ message }: FormErrorProps) => {
  if (!message) {
    return null;
  }

  return (
    <div
      className="
        bg-emerald-500/15
        flex
        items-center
        gap-x-2
        rounded-md
        p-3
        text-sm
        text-emerald-500
      "
    >
      {/* <CheckCircledIcon width={18} height={18} /> */}
      Success!
      <p>{message}</p>
    </div>
  );
};

export default FormSuccess;

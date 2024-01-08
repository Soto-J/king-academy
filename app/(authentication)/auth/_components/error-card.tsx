import BackButton from "@/app/(authentication)/auth/_components/form/back-button";
import Header from "@/app/(authentication)/auth/_components/form/header";

import { Card, CardHeader, CardFooter } from "@/components/ui/card";
import CardWrapper from "./form/card-wrapper";

const ErrorCard = () => {
  return (
    <CardWrapper
      headerLabel="Oops! Something went wrong!"
      backButtonHref="/auth/login"
      backButtonLabel="Back to login"
    >
      <div className="text-center">WARNING</div>
      {/* <ExclamationTriangleIcon className="mx-auto h-8 w-8 text-destructive" /> */}
    </CardWrapper>
  );
};

export default ErrorCard;

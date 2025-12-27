import { Crown } from "lucide-react";
interface AuthHeaderProps {
  title: string;
  description: string;
}

export const AuthHeader = ({ title, description }: AuthHeaderProps) => {
  return (
    <div className="pb-2 text-center">
      <Crown className="text-primary mx-auto h-8 w-8" />
      <h1 className="from-primary to-primary/70 bg-linear-to-r bg-clip-text text-3xl font-bold text-transparent">
        {title}
      </h1>

      <p className="text-muted-foreground text-lg">{description}</p>
    </div>
  );
};

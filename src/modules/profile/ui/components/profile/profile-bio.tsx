import { FileText } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ProfileBioProps {
  bio: string;
}

export const ProfileBio = ({ bio }: ProfileBioProps) => {
  return (
    <Card className="from-muted/50 to-primary/10 border-border/20 bg-gradient-to-br shadow-md backdrop-blur-sm">
      <CardHeader className="from-primary/5 to-primary/10 bg-gradient-to-r">
        <CardTitle className="text-foreground flex items-center gap-2">
          <FileText className="text-primary h-5 w-5" />
          Player Story
        </CardTitle>
      </CardHeader>

      <CardContent className="pt-6">
        <p className="text-foreground/80 text-base leading-relaxed">{bio}</p>
      </CardContent>
    </Card>
  );
};

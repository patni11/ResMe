import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ReactElement } from "react";

export const SectionWrapper = ({
  title,
  children,
}: {
  title: string;
  children: ReactElement;
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardContent className="p-0 max-h-96 overflow-y-auto">
          {children}
        </CardContent>
      </CardHeader>
    </Card>
  );
};

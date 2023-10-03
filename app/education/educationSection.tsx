import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FC, ReactNode } from "react";
import { DialogContainer } from "./DialogContainer";

interface EductionSectionProps {
  children?: ReactNode[];
  cardDetails: {
    title: string;
    description: string;
  };
  dialogDetails?: {
    dialogTitle: string;
    dialogDescription?: string;
    dialogTrigger: ReactNode;
    dialogContent: ReactNode;
  };
}

const EductionSection: FC<EductionSectionProps> = ({
  children,
  cardDetails,
  dialogDetails,
}) => {
  return (
    <section className="w-full justify-start">
      <Card className="w-[full] border-none">
        <CardHeader>
          <CardTitle>{cardDetails.title}</CardTitle>
          <CardDescription>{cardDetails.description}</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col space-y-2">
          {/** Add loop here for multiple universities */}
          {children?.map((childrenCard) => {
            return childrenCard;
          })}
          {/** End loop here */}
        </CardContent>
        <CardFooter className="flex justify-end">
          {dialogDetails && (
            <DialogContainer
              dialogDetails={{ title: "Add Educaiton" }}
              dialogTrigger={dialogDetails.dialogTrigger}
            >
              {dialogDetails.dialogContent}
            </DialogContainer>
          )}
        </CardFooter>
      </Card>
    </section>
  );
};

export default EductionSection;

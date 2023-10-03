"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FC, ReactNode } from "react";
import { DialogContainer } from "../DialogBox/DialogContainer";

interface ContentSectionProps {
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

const ContentSection: FC<ContentSectionProps> = ({
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
              dialogDetails={{ title: dialogDetails.dialogTitle }}
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

export default ContentSection;

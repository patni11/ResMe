"use client";
import { FC, ReactNode } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Education from "./page";
import { getFormattedDate } from "../utils/FormattingFunctions";
import { DialogContainer } from "./DialogContainer";

interface EducationCardProps {
  className?: string;
  cardDetails: Education;
  dialogDetails?: {
    dialogTitle: string;
    dialogDescription?: string;
    dialogTrigger: ReactNode;
    dialogContent: ReactNode;
  };
  deleteDialogDetails?: {
    dialogTitle: string;
    dialogDescription?: string;
    dialogTrigger: ReactNode;
    dialogContent: ReactNode;
  };
}

const EducationCard: FC<EducationCardProps> = ({
  className,
  cardDetails,
  dialogDetails,
  deleteDialogDetails,
}) => {
  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between pt-4">
        <CardTitle className="flex justify-between">
          <span>{cardDetails.schoolName}</span>
        </CardTitle>
        <div className="flex space-x-2">
          {deleteDialogDetails && (
            <DialogContainer
              dialogDetails={{
                title: deleteDialogDetails.dialogTitle,
                description: deleteDialogDetails.dialogDescription,
              }}
              dialogTrigger={deleteDialogDetails.dialogTrigger}
            >
              {deleteDialogDetails.dialogContent}
            </DialogContainer>
          )}

          {dialogDetails && (
            <DialogContainer
              dialogDetails={{ title: dialogDetails.dialogTitle }}
              dialogTrigger={dialogDetails.dialogTrigger}
            >
              {dialogDetails.dialogContent}
            </DialogContainer>
          )}
        </div>
      </CardHeader>
      <CardContent className="flex flex-col justify-between text-sm">
        <div className="flex justify-between">
          <span>{cardDetails.major}</span>
          <span>
            {cardDetails.startDate
              ? getFormattedDate(cardDetails.startDate) + "-"
              : ""}
            {cardDetails.endDate ? getFormattedDate(cardDetails.endDate) : ""}
          </span>
        </div>

        <div className="flex justify-between">
          <span>{cardDetails.degreeType}</span>
          <span>GPA: {cardDetails.gpa}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default EducationCard;

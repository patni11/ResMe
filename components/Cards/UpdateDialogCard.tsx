"use client";
import { FC, ReactNode } from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { DialogContainer } from "../../components/DialogBox/DialogContainer";

interface UpdateDialogCardProps {
  className?: string;

  cardDetails: {
    cardTitle: string;
  };

  children?: ReactNode;

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

const UpdateDialogCard: FC<UpdateDialogCardProps> = ({
  className,
  children,
  cardDetails,
  dialogDetails,
  deleteDialogDetails,
}) => {
  return (
    <Card className="mb-2">
      <CardHeader className="flex-row items-center justify-between pt-4">
        <CardTitle className="flex justify-between">
          <span>{cardDetails.cardTitle}</span>
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

      {children}

      {/* <CardContent className="flex flex-col justify-between text-sm">
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
      </CardContent> */}
    </Card>
  );
};

export default UpdateDialogCard;

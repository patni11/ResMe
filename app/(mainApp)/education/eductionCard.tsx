"use client";
import { FC, ReactNode } from "react";
import { CardContent } from "@/components/ui/card";
import { EducationType } from "@/lib/types";
import { getFormattedDate } from "@/app/utils/FormattingFunctions";
import UpdateDialogCard from "@/components/Cards/UpdateDialogCard";

interface EducationCardProps {
  cardDetails: EducationType;
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
  cardDetails,
  dialogDetails,
  deleteDialogDetails,
}) => {
  //console.log("cardDetails GPA:", cardDetails.gpa?.$numberDecimal, cardDetails.gpa?.toString());
  return (
    <UpdateDialogCard
      cardDetails={{ cardTitle: cardDetails.schoolName }}
      dialogDetails={dialogDetails}
      deleteDialogDetails={deleteDialogDetails}
    >
      <CardContent className="flex flex-col justify-between text-sm">
        <div className="flex justify-between">
          <span>{cardDetails.major}</span>
          <span className="text-right">
            {cardDetails.startDate
              ? getFormattedDate(cardDetails.startDate) + "-"
              : ""}
            {cardDetails.endDate ? getFormattedDate(cardDetails.endDate) : ""}
          </span>
        </div>

        <div className="flex justify-between">
          <span>{cardDetails.degreeType}</span>
          <span>GPA: {cardDetails.gpa ? cardDetails.gpa.toString() : ""}</span>
        </div>
      </CardContent>
    </UpdateDialogCard>
  );
};

export default EducationCard;

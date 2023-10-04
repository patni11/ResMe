"use client";
import { FC, ReactNode } from "react";
import { CardContent } from "@/components/ui/card";
import Education from "./page";
import { getFormattedDate } from "@/app/utils/FormattingFunctions";
import UpdateDialogCard from "@/components/Cards/UpdateDialogCard";

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
    <UpdateDialogCard
      cardDetails={{ cardTitle: cardDetails.schoolName }}
      dialogDetails={dialogDetails}
      deleteDialogDetails={deleteDialogDetails}
    >
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
    </UpdateDialogCard>
  );
};

export default EducationCard;

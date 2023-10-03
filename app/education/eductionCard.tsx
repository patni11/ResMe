import { FC, ReactNode } from "react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Settings2 } from "lucide-react";
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
}

const EducationCard: FC<EducationCardProps> = ({
  className,
  cardDetails,
  dialogDetails,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between">
          <span>{cardDetails.schoolName}</span>
          {dialogDetails && (
            <DialogContainer
              dialogDetails={{ title: "Edit Educaiton" }}
              dialogTrigger={dialogDetails.dialogTrigger}
            >
              {dialogDetails.dialogContent}
            </DialogContainer>
          )}
        </CardTitle>
        <CardDescription className="flex flex-col justify-between">
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
        </CardDescription>
      </CardHeader>
    </Card>
  );
};

export default EducationCard;

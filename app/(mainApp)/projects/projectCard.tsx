"use client";
import { FC, ReactNode } from "react";
import { CardContent } from "@/components/ui/card";
import Project from "./page";
import { getFormattedDate } from "@/app/utils/FormattingFunctions";
import UpdateDialogCard from "@/components/Cards/UpdateDialogCard";

interface ProjectCardProps {
  className?: string;
  cardDetails: Project;
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

const ProjectCard: FC<ProjectCardProps> = ({
  className,
  cardDetails,
  dialogDetails,
  deleteDialogDetails,
}) => {
  return (
    <UpdateDialogCard
      cardDetails={{ cardTitle: cardDetails.projectName }}
      dialogDetails={dialogDetails}
      deleteDialogDetails={deleteDialogDetails}
    >
      <CardContent className="flex flex-col justify-between text-sm space-y-4">
        <div className="flex justify-between px-2">
          <div className="flex space-x-4 items-center">
            <span className="font-bold text-lg">
              {cardDetails.positionTitle}
            </span>
          </div>
          <div className="flex space-x-4">
            <span className="font">{cardDetails.location}</span>

            <span>
              {cardDetails.startDate
                ? getFormattedDate(cardDetails.startDate) + " - "
                : ""}
              {cardDetails.endDate instanceof Date
                ? getFormattedDate(cardDetails.endDate)
                : ""}
            </span>
          </div>
        </div>

        <ul className="w-full p-4 rounded-md shadow-md">
          {cardDetails.description
            .split("\n")
            .filter((item) => item.trim() !== "")
            .map((item, index) => (
              <li key={index} className="mb-2 wrap-text">
                <span className="text-blue-500 mr-2">•</span>
                {item}
              </li>
            ))}
        </ul>
      </CardContent>
    </UpdateDialogCard>
  );
};

export default ProjectCard;

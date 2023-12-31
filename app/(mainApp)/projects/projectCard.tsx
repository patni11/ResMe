"use client";
import { FC, ReactNode } from "react";
import { CardContent } from "@/components/ui/card";
import { Project } from "@/lib/types";
import { getFormattedDate } from "@/app/utils/FormattingFunctions";
import UpdateDialogCard from "@/components/Cards/UpdateDialogCard";

interface ProjectCardProps {
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
        <div className="flex flex-col space-y-1 md:space-y-0 items-center md:flex-row md:justify-between">
          <div className="flex space-x-4 items-center">
            <span className="font-bold text-sm md:text-lg">
              {cardDetails.positionTitle}
            </span>
          </div>
          <div className="flex space-x-4">
            <span className="font-bold">{cardDetails.location}</span>

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
            .filter((item: string) => item.trim() !== "")
            .map((item: string, index: number) => (
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

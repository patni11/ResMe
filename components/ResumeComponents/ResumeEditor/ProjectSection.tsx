"use client";

import { createProjectsSection } from "@/store/projectsInfo";
import ResumeComponentContainer from "./ResumeComponentContainer";
import { FC } from "react";
import { getFormattedDate } from "@/app/utils/FormattingFunctions";
import "./listStyle.css";
interface ProjectSectionProps {
  projectId: string;
}

const ProjectSection: FC<ProjectSectionProps> = ({ projectId }) => {
  const useProjectsInfo = createProjectsSection(projectId);
  const {
    projects,
    hiddenProjects,
    hideAll,
    hiddenDates,
    hiddenLocation,
    hiddenPosition,
  } = useProjectsInfo();

  if (hideAll) {
    return null;
  }

  return (
    <ResumeComponentContainer>
      <div className="flex flex-col justify-start items-start w-full">
        <h1 className="sectionHeader">PROJECTS </h1>

        {projects.map((project: any) => {
          const isProjectHidden = hiddenProjects && hiddenProjects[project._id];
          const isDatesHidden = hiddenDates && hiddenDates[project._id];
          const isLocationHidden =
            hiddenLocation && hiddenLocation[project._id];
          const isPositionHidden =
            hiddenPosition && hiddenPosition[project._id];
          if (isProjectHidden) {
            return <div key={project._id}></div>; // Remember to add a key here
          }
          return (
            <ProjectCard
              key={project._id}
              projectName={project.projectName}
              projectId={project._id}
              {...(project.location &&
                !isLocationHidden && { location: project.location })}
              {...(project.positionTitle &&
                !isPositionHidden && { positionTitle: project.positionTitle })}
              {...(project.startDate &&
                project.endDate &&
                !isDatesHidden && {
                  startDate: project.startDate,
                  endDate: project.endDate,
                })}
              descriptions={project.description}
              // hideProject={hiddenProjects && hiddenProjects[project._id]}
            />
          );
        })}
      </div>
    </ResumeComponentContainer>
  );
};

interface ProjectCardProps {
  projectName: string;
  projectId: string;
  location?: string;
  positionTitle?: string;
  startDate?: Date;
  endDate?: Date;
  descriptions: string[];
}

const ProjectCard: FC<ProjectCardProps> = ({
  projectName,
  projectId,
  location,
  positionTitle,
  startDate,
  endDate,
  descriptions,
}) => {
  const newStartDate = startDate
    ? getFormattedDate(new Date(startDate))
    : undefined;
  const newEndDate = endDate ? getFormattedDate(new Date(endDate)) : undefined;
  return (
    <div className="card-w-list">
      <div className="card">
        <div className="detail-col text-left">
          <h2 className="sideText">{projectName}</h2>

          <span className="italicSecondary">{positionTitle}</span>
        </div>
        <div className="detail-col text-right">
          {/* <p>Bachelor&apos;s Computer Science</p> */}
          <h2 className="sideText">{location}</h2>
          {newStartDate != undefined ? (
            <span className="italicSecondary">
              {newStartDate} - {newEndDate}
            </span>
          ) : null}
        </div>
      </div>
      <ul className="sectionList">
        {Array.isArray(descriptions)
          ? descriptions.map((desc, index) => {
              return (
                <li key={index} className="bulletList">
                  {desc}
                </li>
              );
            })
          : null}
      </ul>
    </div>
  );
};

export default ProjectSection;

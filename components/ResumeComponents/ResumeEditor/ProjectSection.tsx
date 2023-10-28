"use client";

import { useProjectsInfo } from "@/store/projectsInfo";
import ResumeComponentContainer from "./ResumeComponentContainer";
import { Project } from "@/app/(mainApp)/projects/pageTypes";
import { FC } from "react";
import { getFormattedDate } from "@/app/utils/FormattingFunctions";

export default function ProjectSection() {
  const { projects, hiddenProjects, hideAll } = useProjectsInfo();

  if (hideAll) {
    return null;
  }

  return (
    <ResumeComponentContainer>
      <div className="flex flex-col justify-start items-start w-full">
        <h1 className="text-sm font-semibold m-0"> PROJECTS </h1>
        <hr className="h-[3px] bg-black w-full mb-[0.5px]" />

        {projects.map((project) => {
          const isProjectHidden = hiddenProjects && hiddenProjects[project._id];
          if (isProjectHidden) {
            return <div key={project._id}></div>; // Remember to add a key here
          }
          return (
            <ProjectCard
              key={project._id}
              project={project}
              // hideProject={hiddenProjects && hiddenProjects[project._id]}
            />
          );
        })}
      </div>
    </ResumeComponentContainer>
  );
}

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: FC<ProjectCardProps> = ({ project }) => {
  const descriptions = project.description.split("\n");
  const startDate = project.startDate
    ? getFormattedDate(new Date(project.startDate))
    : "";
  const endDate = project.endDate
    ? getFormattedDate(new Date(project.endDate))
    : "";
  return (
    <div className="flex flex-col space-between text-xs w-full leading-tight mb-3">
      <div className="flex space-between">
        <div className="flex flex-col w-full text-left">
          {/* <p>Northeastern University</p> */}
          <p className="font-bold">{project.projectName}</p>
          {/* <p>September 2021 - May 2025</p> */}
          <p className="italic text-gray-500 font-normal">
            {project.positionTitle}
          </p>
        </div>
        <div className="flex flex-col font-light italic w-full text-right">
          {/* <p>Bachelor&apos;s Computer Science</p> */}
          {project.location}
          <p className="font-bold">
            {startDate} - {endDate}
          </p>
        </div>
      </div>
      <ul className="text-left ml-4" style={{ listStyleType: "disc" }}>
        {descriptions.map((desc, index) => {
          return <li key={index}>{desc}</li>;
        })}
      </ul>
    </div>
  );
};

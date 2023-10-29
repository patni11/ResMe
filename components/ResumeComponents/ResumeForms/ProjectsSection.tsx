"use client";
import { FC, useEffect } from "react";
import { FormCardWrapper } from "./FormCardWrapper";
import { HideButtons } from "@/components/UIButtons/HideButtons";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PlusCircleIcon, Trash2 } from "lucide-react";
import { useProjectsInfo } from "@/store/projectsInfo";

import { Project } from "@/app/(mainApp)/projects/pageTypes";
interface ProjectSectionCard {}

export const ProjectSectionCard: FC<ProjectSectionCard> = ({}) => {
  const {
    projects,
    hiddenProjects,
    hideAll,
    setHiddenProject,
    fetchProjects,
    setHideAll,
  } = useProjectsInfo();

  useEffect(() => {
    let projectsLocalStorage = localStorage.getItem("projectsLocalStorage");
    if (!projectsLocalStorage) {
      fetchProjects();
    }
  }, [fetchProjects]);

  return (
    <FormCardWrapper
      cardTitle="Project"
      refreshFunction={() => fetchProjects()}
      hideAll={hideAll}
      deleteFunction={setHideAll}
    >
      {projects.map((project) => {
        return (
          <ProjectCard
            key={project._id}
            project={project}
            hideProject={hiddenProjects![project._id]}
            setHideEducation={() => setHiddenProject(project._id)}
          />
        );
      })}
    </FormCardWrapper>
  );
};

interface ProjectCardProps {
  project: Project;
  hideProject: boolean;
  setHideEducation: () => void;
}

const ProjectCard: FC<ProjectCardProps> = ({
  project,
  hideProject,
  setHideEducation,
}) => {
  const { updateDescriptions } = useProjectsInfo();
  const descriptions = project.description.split("\n");
  const handleOnChange = (e: string, idx: number) => {
    const updatedDescriptions = [...descriptions];
    updatedDescriptions[idx] = e;
    const newDescription = updatedDescriptions.join("\n");

    // 4. Call updateDescriptions.
    updateDescriptions(project._id, newDescription);
  };

  return (
    <div className="flex flex-col w-full bg-secondary p-4 rounded-lg mb-2">
      <div className="flex flex-col w-full text-md">
        <h1 className="font-semibold"> {project.projectName} </h1>
        <div className="flex justify-between w-full items-center">
          <h1 className="text-sm">{project.positionTitle}</h1>
          <HideButtons hide={hideProject} setHide={() => setHideEducation()}>
            <span>Hide Position</span>
          </HideButtons>
        </div>
      </div>

      <ul className="flex flex-col w-full my-2">
        {descriptions.map((desc, index) => {
          return (
            <li key={index} className="flex space-x-2 w-full">
              <Input
                className="w-full focus-visible:ring-0"
                defaultValue={desc}
                onChange={(e) => handleOnChange(e.currentTarget.value, index)}
              ></Input>
              <Button
                variant="ghost"
                className="hover:text-destructive"
                onClick={() => handleOnChange("", index)}
              >
                <Trash2 className="w-4 h-4"></Trash2>
              </Button>
            </li>
          );
        })}
      </ul>
      <Button
        className="mr-2 text-xs w-12 hover:bg-primary hover:text-primary-foreground"
        variant="ghost"
      >
        <PlusCircleIcon className="h-4 w-4" />
      </Button>
    </div>
  );
};

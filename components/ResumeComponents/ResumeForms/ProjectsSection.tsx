"use client";
import { FC, useEffect } from "react";
import { FormCardWrapper } from "./FormCardWrapper";
import { HideButtons } from "@/components/UIButtons/HideButtons";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PlusCircleIcon, Trash2 } from "lucide-react";
import { createProjectsSection } from "@/store/projectsInfo";

interface ProjectSectionCard {
  projectId: string;
}

export const ProjectSectionCard: FC<ProjectSectionCard> = ({ projectId }) => {
  const useProjectsInfo = createProjectsSection(projectId);
  const {
    projects,
    hiddenProjects,
    hiddenDates,
    hiddenLocation,
    hiddenPosition,
    hideAll,
    isLoading,
    setHiddenProject,
    setHiddenDates,
    setHiddenLocation,
    setHiddenPosition,
    updateDescriptions,
    fetchProjects,
    setHideAll,
    deleteDescription,
    addDescription,
  } = useProjectsInfo();

  useEffect(() => {
    let projectsLocalStorage = localStorage.getItem(projectId);
    if (!projectsLocalStorage) {
      fetchProjects();
    }
  }, [fetchProjects]);

  return (
    <FormCardWrapper
      cardTitle="Project"
      refreshFunction={() => fetchProjects()}
      hideAll={hideAll}
      isLoading={isLoading}
      deleteFunction={setHideAll}
    >
      {projects.map((project: any) => {
        return (
          <ProjectCard
            key={project._id}
            projectName={project.projectName}
            projectId={project._id}
            // location={project.location}
            // positionTitle={project.positionTitle}
            // startDate={project.startDate}
            // endDate={project.endDate}
            descriptions={project.description}
            deleteDescription={deleteDescription}
            updateDescriptions={updateDescriptions}
            hideProject={hiddenProjects![project._id]}
            setHiddenProject={() => setHiddenProject(project._id)}
            {...(project.location && {
              hideLocation: hiddenLocation![project._id],
              setHiddenLocation: () => setHiddenLocation(project._id),
            })}
            {...(project.positionTitle && {
              hidePosition: hiddenPosition![project._id],
              setHiddenPosition: () => setHiddenPosition(project._id),
            })}
            {...(project.startDate && {
              hideDates: hiddenDates![project._id],
              setHiddenDates: () => setHiddenDates(project._id),
            })}
            addDescription={addDescription}
          />
        );
      })}
    </FormCardWrapper>
  );
};

interface ProjectCardProps {
  projectName: string;
  projectId: string;
  descriptions: string[];
  deleteDescription: (key: string, idx: number) => void;
  updateDescriptions: (
    key: string,
    idx: number,
    newDescription: string
  ) => void;
  hideProject: boolean;
  hideLocation?: boolean;
  hidePosition?: boolean;
  hideDates?: boolean;
  setHiddenProject: () => void;
  setHiddenDates?: () => void;
  setHiddenLocation?: () => void;
  setHiddenPosition?: () => void;
  addDescription: (key: string) => void;
}

const ProjectCard: FC<ProjectCardProps> = ({
  projectName,
  projectId,
  descriptions,
  deleteDescription,
  updateDescriptions,
  hideProject,
  hideLocation,
  hidePosition,
  hideDates,
  setHiddenProject,
  setHiddenDates,
  setHiddenLocation,
  setHiddenPosition,
  addDescription,
}) => {
  const handleOnChange = (e: string, idx: number) => {
    updateDescriptions(projectId, idx, e);
  };

  return (
    <div className="flex flex-col w-full bg-secondary p-4 rounded-lg mb-2">
      <div className="flex flex-col w-full text-md">
        <h1 className="font-semibold"> {projectName} </h1>
        <div className="flex justify-end w-full items-center space-x-4">
          <HideButtons hide={hideProject} setHide={() => setHiddenProject()}>
            <span>Project</span>
          </HideButtons>

          {setHiddenDates ? (
            <HideButtons
              hide={hideDates || false}
              setHide={() => setHiddenDates()}
            >
              <span>Dates</span>
            </HideButtons>
          ) : null}
          {setHiddenPosition ? (
            <HideButtons
              hide={hidePosition || false}
              setHide={() => setHiddenPosition()}
            >
              <span>Position</span>
            </HideButtons>
          ) : null}

          {setHiddenLocation ? (
            <HideButtons
              hide={hideLocation || false}
              setHide={() => setHiddenLocation()}
            >
              <span>Location</span>
            </HideButtons>
          ) : null}
        </div>
      </div>

      <ul className="flex flex-col w-full my-2">
        {Array.isArray(descriptions)
          ? descriptions.map((desc, index) => {
              return (
                <li key={index} className="flex space-x-2 w-full">
                  <Input
                    className="w-full focus-visible:ring-0"
                    value={desc}
                    onChange={(e) =>
                      handleOnChange(e.currentTarget.value, index)
                    }
                  ></Input>
                  <Button
                    variant="ghost"
                    className="hover:text-destructive"
                    onClick={() => deleteDescription(projectId, index)}
                    aria-label="Delete Description"
                  >
                    <Trash2 className="w-4 h-4"></Trash2>
                  </Button>
                </li>
              );
            })
          : null}
      </ul>
      <Button
        className="mr-2 text-xs w-12 hover:bg-primary hover:text-primary-foreground"
        variant="ghost"
        onClick={() => addDescription(projectId)}
        aria-label="Add Description"
      >
        <PlusCircleIcon className="h-4 w-4" />
      </Button>
    </div>
  );
};

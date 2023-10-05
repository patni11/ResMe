"use client";
import ContentSection from "@/components/Sections/ContentSection";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { PlusCircleIcon, Settings2, Trash2 } from "lucide-react";
import { FC, useReducer } from "react";
import { Button } from "@/components/ui/button";
import ProjectDialogContent from "./ProjectDialogContent";
import { Project } from "./pageTypes";
import ProjectCard from "./projectCard";
import Image from "next/image";

interface ProjectProps {}

interface ProjectAction {
  type: "edit" | "add" | "delete";
  payload?: Project;
}

function workProjectReducer(
  state: Project[],
  action: ProjectAction
): Project[] {
  const { type, payload } = action;

  switch (type) {
    case "delete":
      return state.filter((project) => project.id !== payload?.id);

    case "edit":
      return state.map((project) =>
        project.id === payload?.id ? { ...project, ...payload } : project
      );

    case "add":
      return payload ? [...state, payload] : state;
    default:
      return state;
  }
}

const Project: FC<ProjectProps> = () => {
  const [educationState, projectDispatch] = useReducer(workProjectReducer, []);

  const addProject = (projectData: Project) => {
    console.log("Add Project", projectData);

    projectDispatch({
      type: "add",
      payload: projectData,
    });
  };

  const deleteProject = (projectData: Project) => {
    console.log("Delete Project", projectData);
    projectDispatch({
      type: "delete",
      payload: projectData,
    });
  };

  const updateProject = (projectData: Project) => {
    console.log("Update Project", projectData);
    projectDispatch({
      type: "edit",
      payload: projectData,
    });
  };

  return (
    <main className="flex justify-center w-full h-full">
      <div className="flex-1 flex flex-col items-center py-12 space-y-8 px-8">
        <ContentSection
          cardDetails={{
            title: "Add Projects",
            description:
              "Add personal projects, outside experiences, hackathons, etc.",
          }}
          dialogDetails={{
            dialogTitle: "Add Project",
            dialogTrigger: (
              <Button>
                Add <PlusCircleIcon className="ml-1.5 h-5 w-5" />
              </Button>
            ),
            dialogContent: <ProjectDialogContent addData={addProject} />,
          }}
        >
          <div className="flex flex-col space-y-2">
            {educationState.map((projectVal: Project) => {
              return (
                <ProjectCard
                  key={projectVal.id}
                  cardDetails={{
                    projectName: projectVal.projectName,
                    location: projectVal.location,
                    positionTitle: projectVal.positionTitle,
                    startDate: projectVal.startDate,
                    endDate: projectVal.endDate,
                    description: projectVal.description,
                    id: projectVal.id,
                  }}
                  deleteDialogDetails={{
                    dialogTitle: "Delete Project",
                    dialogDescription:
                      "Are you sure you want to delete this project?",
                    dialogTrigger: (
                      <Button
                        variant="ghost"
                        className={
                          "text-destructive hover:bg-destructive hover:text-destructive-foreground text-sm"
                        }
                      >
                        <Trash2 className="w-5 h-5"></Trash2>
                      </Button>
                    ),
                    dialogContent: (
                      <DialogTrigger className="flex justify-between">
                        <Button variant="outline">Cancel</Button>
                        <Button
                          type="submit"
                          variant="outline"
                          className="text-destructive hover:bg-destructive hover:text-destructive-foreground"
                          onClick={() => deleteProject(projectVal)}
                        >
                          Delete
                        </Button>
                      </DialogTrigger>
                    ),
                  }}
                  dialogDetails={{
                    dialogTitle: "Edit Education",
                    dialogTrigger: (
                      <Button variant="ghost">
                        <Settings2 className="w-5 h-5"></Settings2>
                      </Button>
                    ),
                    dialogContent: (
                      <ProjectDialogContent
                        addData={updateProject}
                        defaultValues={projectVal}
                      />
                    ),
                  }}
                />
              );
            })}
          </div>
        </ContentSection>
      </div>
      <div className="flex-shrink-0 w-1/3 max-w-[30%] h-full relative">
        {/* Aspect ratio container */}
        <div className="relative h-full" style={{ paddingTop: "42.86%" }}>
          <Image
            src="/pageStyles/projects/pixelArt5.png"
            alt="graphic"
            layout="fill" // This makes the image take up the full width and height of its container
            objectFit="cover" // This ensures the image maintains its aspect ratio while filling its container
          />
        </div>
      </div>
    </main>
  );
};

export default Project;

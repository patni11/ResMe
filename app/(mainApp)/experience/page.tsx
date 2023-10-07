"use client";
import ContentSection from "@/components/Sections/ContentSection";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { PlusCircleIcon, Settings2, Trash2 } from "lucide-react";
import { FC, useReducer } from "react";
import { Button } from "@/components/ui/button";
import ExperienceDialogContent from "./ExperienceDialogContent";
import { Experience } from "./pageTypes";
import ExperienceCard from "./experienceCard";
import ImageWrapper from "@/components/ImageWrapper";
interface ExperienceProps {}

interface ExperienceAction {
  type: "edit" | "add" | "delete";
  payload?: Experience;
}

function workExperienceReducer(
  state: Experience[],
  action: ExperienceAction
): Experience[] {
  const { type, payload } = action;

  switch (type) {
    case "delete":
      return state.filter((experience) => experience.id !== payload?.id);

    case "edit":
      return state.map((experience) =>
        experience.id === payload?.id
          ? { ...experience, ...payload }
          : experience
      );

    case "add":
      return payload ? [...state, payload] : state;
    default:
      return state;
  }
}

const Experience: FC<ExperienceProps> = () => {
  const [educationState, experienceDispatch] = useReducer(
    workExperienceReducer,
    []
  );

  const addExperience = (experienceData: Experience) => {
    console.log("Add Experience", experienceData);

    experienceDispatch({
      type: "add",
      payload: experienceData,
    });
  };

  const deleteExperience = (experienceData: Experience) => {
    console.log("Delete Experience", experienceData);
    experienceDispatch({
      type: "delete",
      payload: experienceData,
    });
  };

  const updateExperience = (experienceData: Experience) => {
    console.log("Update Experience", experienceData);
    experienceDispatch({
      type: "edit",
      payload: experienceData,
    });
  };

  return (
    <ImageWrapper imgSrc="experience">
      <div className="flex-1 flex flex-col items-center py-12 space-y-8 px-8">
        <ContentSection
          cardDetails={{
            title: "Add Work Experience",
            description:
              "Add internship, jobs, competitions you have completed",
          }}
          dialogDetails={{
            dialogTitle: "Add Experience",
            dialogTrigger: (
              <Button>
                Add <PlusCircleIcon className="ml-1.5 h-5 w-5" />
              </Button>
            ),
            dialogContent: <ExperienceDialogContent addData={addExperience} />,
          }}
        >
          <div className="flex flex-col space-y-2">
            {educationState.map((experienceVal: Experience) => {
              return (
                <ExperienceCard
                  key={experienceVal.id}
                  cardDetails={{
                    company: experienceVal.company,
                    location: experienceVal.location,
                    positionTitle: experienceVal.positionTitle,
                    experienceType: experienceVal.experienceType,
                    startDate: experienceVal.startDate,
                    endDate: experienceVal.endDate,
                    description: experienceVal.description,
                    id: experienceVal.id,
                  }}
                  deleteDialogDetails={{
                    dialogTitle: "Delete Experience",
                    dialogDescription:
                      "Are you sure you want to delete this experience?",
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
                          onClick={() => deleteExperience(experienceVal)}
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
                      <ExperienceDialogContent
                        addData={updateExperience}
                        defaultValues={experienceVal}
                      />
                    ),
                  }}
                />
              );
            })}
          </div>
        </ContentSection>
      </div>
    </ImageWrapper>
  );
};

export default Experience;

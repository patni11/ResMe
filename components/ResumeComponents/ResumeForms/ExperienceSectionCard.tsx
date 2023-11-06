"use client";
import { FC, memo, useEffect } from "react";
import { FormCardWrapper } from "./FormCardWrapper";

import { HideButtons } from "@/components/UIButtons/HideButtons";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PlusCircleIcon, Trash2 } from "lucide-react";
import { createExperienceInfo } from "@/store/experienceInfo";
interface ExperienceSectionCard {
  experienceID: string;
  index: number;
  moveUp: (index: number) => void;
  moveDown: (index: number) => void;
}

const ExperienceSectionCard: FC<ExperienceSectionCard> = ({
  experienceID,
  index,
  moveUp,
  moveDown,
}) => {
  const useExperiencesInfo = createExperienceInfo(experienceID);
  const {
    experiences,
    hiddenExperiences,
    hideAll,
    isLoading,
    setHiddenExperience,
    fetchExperiences,
    setHideAll,
    updateDescriptions,
    deleteDescription,
    addDescription,
  } = useExperiencesInfo();

  useEffect(() => {
    let experiencesLocalStorage = localStorage.getItem(experienceID);
    if (!experiencesLocalStorage) {
      fetchExperiences();
    }
  }, [fetchExperiences]);

  return (
    <FormCardWrapper
      cardTitle="Experience"
      refreshFunction={() => fetchExperiences()}
      hideAll={hideAll}
      isLoading={isLoading}
      deleteFunction={setHideAll}
      index={index}
      moveUp={moveUp}
      moveDown={moveDown}
    >
      {experiences.map((experience: any) => {
        return (
          <ExperienceCard
            key={experience._id}
            experienceId={experience.experienceID}
            company={experience.company}
            location={experience.location}
            positionTitle={experience.positionTitle}
            experienceType={experience.experienceType}
            startDate={experience.startDate}
            endDate={experience.endDate}
            descriptions={experience.description}
            deleteDescription={(idx) => deleteDescription(experience._id, idx)}
            updateDescriptions={(idx, newDescription) =>
              updateDescriptions(experience._id, idx, newDescription)
            }
            addDescription={() => addDescription(experience._id)}
            hideExperience={hiddenExperiences![experience._id]}
            setHideEducation={() => setHiddenExperience(experience._id)}
          />
        );
      })}
    </FormCardWrapper>
  );
};

interface ExperienceCardProps {
  experienceId: string;
  company: string;
  location: string;
  positionTitle: string;
  experienceType: string;
  startDate: Date;
  endDate: Date | "working";
  descriptions: string[];
  deleteDescription: (idx: number) => void;
  updateDescriptions: (idx: number, newDescription: string) => void;
  addDescription: () => void;
  hideExperience: boolean;
  setHideEducation: () => void;
  experienceID?: string;
}

const ExperienceCard: FC<ExperienceCardProps> = ({
  experienceId,
  company,
  location,
  positionTitle,
  experienceType,
  startDate,
  endDate,
  descriptions,
  deleteDescription,
  updateDescriptions,
  addDescription,
  hideExperience,
  setHideEducation,
  experienceID = "experiencesLocalStorage",
}) => {
  const handleOnChange = (e: string, idx: number) => {
    updateDescriptions(idx, e);
  };

  console.log("descriptions", descriptions);

  return (
    <div className="flex flex-col w-full bg-secondary p-4 rounded-lg mb-2">
      <div className="flex flex-col w-full text-md">
        <h1 className="font-semibold"> {positionTitle} </h1>
        <div className="flex justify-between w-full items-center">
          <h1 className="text-sm">{company}</h1>
          <HideButtons hide={hideExperience} setHide={() => setHideEducation()}>
            <span>Experience</span>
          </HideButtons>
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
                    onClick={() => deleteDescription(index)}
                    aria-label="Hide Description"
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
        onClick={addDescription}
        aria-label="Add Description"
      >
        <PlusCircleIcon className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default memo(ExperienceSectionCard);

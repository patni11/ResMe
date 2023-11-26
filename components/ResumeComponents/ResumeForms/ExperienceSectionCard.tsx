"use client";
import { FC, memo } from "react";
import { FormCardWrapper } from "./FormCardWrapper";

import { HideButtons } from "@/components/UIButtons/HideButtons";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  ChevronDown,
  ChevronUp,
  PlusCircleIcon,
  RefreshCw,
  Trash2,
} from "lucide-react";
import { createExperienceInfo } from "@/store/experienceInfo";
import { AIHelper } from "@/components/Cards/AIHelper";
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
    fetchDefaultExperiences,
    fetchExperiences,
    setHideAll,
    updateDescriptions,
    deleteDescription,
    addDescription,
    moveExpUp,
    moveExpDown,
  } = useExperiencesInfo();

  return (
    <FormCardWrapper
      cardTitle="Experience"
      refreshFunction={() => fetchDefaultExperiences()}
      refreshSection={() => fetchExperiences(experienceID.split("-")[2])}
      hideAll={hideAll}
      isLoading={isLoading}
      deleteFunction={setHideAll}
      index={index}
      moveUp={moveUp}
      moveDown={moveDown}
    >
      {experiences.length <= 0 ? (
        <div className="text-xs flex w-full space-x-4 justify-center">
          <span>No Experiences Found, Click</span>
          <RefreshCw className="h-4 w-4" />
          <span>or add Experiences from Experiences section</span>
        </div>
      ) : null}

      {experiences.map((experience: any, index: number) => {
        return (
          <ExperienceCard
            key={experience._id}
            index={index}
            size={experiences.length}
            moveExpUp={() => moveExpUp(index)}
            moveExpDown={() => moveExpDown(index)}
            company={experience.company}
            positionTitle={experience.positionTitle}
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
  moveExpUp: () => void;
  index: number;
  size: number;
  moveExpDown: () => void;
  company: string;
  positionTitle: string;
  descriptions: string[];
  deleteDescription: (idx: number) => void;
  updateDescriptions: (idx: number, newDescription: string) => void;
  addDescription: () => void;
  hideExperience: boolean;
  setHideEducation: () => void;
}

const ExperienceCard: FC<ExperienceCardProps> = ({
  moveExpUp,
  moveExpDown,
  company,
  index,
  positionTitle,
  size,
  descriptions,
  deleteDescription,
  updateDescriptions,
  addDescription,
  hideExperience,
  setHideEducation,
}) => {
  const handleOnChange = (e: string, idx: number) => {
    updateDescriptions(idx, e);
  };

  return (
    <div
      className={`flex flex-col w-full p-4 rounded-lg mb-2 ${
        hideExperience ? "bg-secondary" : "bg-muted"
      }`}
    >
      <div className="flex space-x-2 w-full">
        <div className="flex flex-col mr-2">
          {index != 0 ? (
            <button
              className="hover:bg-secondary rounded-lg p-1"
              onClick={() => moveExpUp()}
            >
              <ChevronUp className="h-4 w-4" />
            </button>
          ) : null}
          {index != size - 1 ? (
            <button
              className="hover:bg-secondary rounded-lg p-1"
              onClick={() => moveExpDown()}
            >
              <ChevronDown className="h-4 w-4" />
            </button>
          ) : null}
        </div>
        <div className="flex flex-col w-full text-md">
          <h1 className="font-semibold"> {positionTitle} </h1>
          <div className="flex justify-between w-full items-center">
            <h1 className="text-sm">{company}</h1>
            <HideButtons
              hide={hideExperience}
              setHide={() => setHideEducation()}
            >
              <span>Experience</span>
            </HideButtons>
          </div>
        </div>
      </div>
      {hideExperience ? null : (
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
      )}
      {hideExperience ? null : (
        <div className="flex justify-end space-x-2 w-full">
          <Button
            className="mr-2 text-xs w-12 hover:bg-primary hover:text-primary-foreground"
            variant="ghost"
            onClick={addDescription}
            aria-label="Add Description"
          >
            <PlusCircleIcon className="h-4 w-4" />
          </Button>
          <AIHelper />
        </div>
      )}
    </div>
  );
};

export default memo(ExperienceSectionCard);

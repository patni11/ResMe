"use client";
import { FC, useEffect } from "react";
import { FormCardWrapper } from "./FormCardWrapper";

import { HideButtons } from "@/components/UIButtons/HideButtons";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PlusCircleIcon, Trash2 } from "lucide-react";
import { createExperienceInfo } from "@/store/experienceInfo";

import { Experience } from "@/app/(mainApp)/experience/pageTypes";
interface ExperienceSectionCard {
  experienceID?: string;
}

const ExperienceSectionCard: FC<ExperienceSectionCard> = ({
  experienceID = "experiencesLocalStorage",
}) => {
  const useExperiencesInfo = createExperienceInfo(experienceID);
  const {
    experiences,
    hiddenExperiences,
    hideAll,
    setHiddenExperience,
    fetchExperiences,
    setHideAll,
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
      deleteFunction={setHideAll}
    >
      {experiences.map((experience) => {
        return (
          <ExperienceCard
            key={experience._id}
            experience={experience}
            hideExperience={hiddenExperiences![experience._id]}
            setHideEducation={() => setHiddenExperience(experience._id)}
          />
        );
      })}
    </FormCardWrapper>
  );
};

interface ExperienceCardProps {
  experience: Experience;
  hideExperience: boolean;
  setHideEducation: () => void;
  experienceID?: string;
}

const ExperienceCard: FC<ExperienceCardProps> = ({
  experience,
  hideExperience,
  setHideEducation,
  experienceID = "experiencesLocalStorage",
}) => {
  const useExperiencesInfo = createExperienceInfo(experienceID);
  const { updateDescriptions } = useExperiencesInfo();
  const descriptions = experience.description.split("\n");

  const handleOnChange = (e: string, idx: number) => {
    const updatedDescriptions = [...descriptions];
    updatedDescriptions[idx] = e;
    const newDescription = updatedDescriptions.join("\n");
    console.log("Updated Descriptions", updatedDescriptions);
    console.log("Descriptions", experience.description);
    console.log("New Descriptions", newDescription);
    // 4. Call updateDescriptions.
    updateDescriptions(experience._id, newDescription);
  };

  return (
    <div className="flex flex-col w-full bg-secondary p-4 rounded-lg mb-2">
      <div className="flex flex-col w-full text-md">
        <h1 className="font-semibold"> {experience.positionTitle} </h1>
        <div className="flex justify-between w-full items-center">
          <h1 className="text-sm">{experience.company}</h1>
          <HideButtons hide={hideExperience} setHide={() => setHideEducation()}>
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

export default ExperienceSectionCard;

"use client";
import { FC } from "react";
import { FormCardWrapper } from "./FormCardWrapper";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createEducationInfo } from "@/store/educationInfo";
import { HideButtons } from "@/components/UIButtons/HideButtons";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { memo } from "react";
import { EducationType } from "@/lib/types/types";
import { RefreshCw } from "lucide-react";

interface EducationCardProps {
  education: EducationType;
  hideGPA: boolean;
  hideDate: boolean;
  hideEducation: boolean;
  setHideEducation: () => void;
  setHideDate: () => void;
  setHideGpa: () => void;
}

const EducationCard: FC<EducationCardProps> = ({
  education,
  hideEducation,
  hideGPA,
  hideDate,
  setHideEducation,
  setHideDate,
  setHideGpa,
}) => {
  return (
    <Card className="mb-2">
      <CardHeader className="flex flex-row justify-between">
        <div className="flex flex-col space-y-2">
          <CardTitle>{education.schoolName}</CardTitle>
          <CardDescription>
            {education.degreeType} {education.major}
          </CardDescription>
        </div>
        <div className="flex space-x-4">
          <HideButtons hide={hideEducation} setHide={setHideEducation}>
            <span>Education</span>
          </HideButtons>

          <HideButtons hide={hideGPA} setHide={setHideGpa}>
            <span>GPA</span>
          </HideButtons>

          <HideButtons hide={hideDate} setHide={setHideDate}>
            <span>Date</span>
          </HideButtons>
        </div>
      </CardHeader>
    </Card>
  );
};
interface EducationSectionCard {
  educationID: string;
  index: number;
  moveUp: (index: number) => void;
  moveDown: (index: number) => void;
}

const EducationSectionCard: FC<EducationSectionCard> = ({
  educationID,
  index,
  moveUp,
  moveDown,
}) => {
  const useEducationsInfo = createEducationInfo(educationID);
  const {
    educations,
    hiddenEducations,
    hiddenGPAs,
    hiddenDates,
    relevantCourseWork,
    hideAll,
    isLoading,
    updateRelevantCourseWork,
    setHiddenEducation,
    setHiddenDates,
    setHiddenGPAs,
    fetchDefaultEducations,
    //  fetchEducations,
    setHideAll,
  } = useEducationsInfo();

  return (
    <FormCardWrapper
      cardTitle="Education"
      refreshFunction={() => fetchDefaultEducations()}
      // refreshSection={() => fetchEducations()}
      hideAll={hideAll}
      isLoading={isLoading}
      deleteFunction={setHideAll}
      index={index}
      moveUp={moveUp}
      moveDown={moveDown}
    >
      {educations.length <= 0 ? (
        <div className="text-xs flex w-full space-x-4 justify-center">
          <span>No Education Found, Click</span>
          <RefreshCw className="h-4 w-4" />
          <span>or add Education from Education section</span>
        </div>
      ) : null}

      {educations.map((education: any) => {
        return (
          <EducationCard
            key={education._id}
            education={education}
            hideGPA={hiddenGPAs![education._id]}
            hideDate={hiddenDates![education._id]}
            hideEducation={hiddenEducations![education._id]}
            setHideEducation={() => setHiddenEducation(education._id)}
            setHideDate={() => setHiddenDates(education._id)}
            setHideGpa={() => setHiddenGPAs(education._id)}
          />
        );
      })}

      <div className="flex flex-col space-y-2 mt-4">
        <Label>Relavant Coursework</Label>
        <Input
          placeholder="Relavant Coursework"
          value={relevantCourseWork}
          onChange={(e) => {
            updateRelevantCourseWork(e.currentTarget.value);
          }}
        ></Input>
      </div>
    </FormCardWrapper>
  );
};

export default memo(EducationSectionCard);

"use client";
import { FC, useEffect } from "react";
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
import { EducationType } from "@/app/(mainApp)/education/pageTypes";

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
    <>
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
    </>
  );
};
interface EducationSectionCard {
  educationID: string;
}

export const EducationSectionCard: FC<EducationSectionCard> = ({
  educationID,
}) => {
  const useEducationsInfo = createEducationInfo(educationID);
  const {
    educations,
    hiddenEducations,
    hiddenGPAs,
    hiddenDates,
    relevantCourseWork,
    hideAll,
    updateRelevantCourseWork,
    setHiddenEducation,
    setHiddenDates,
    setHiddenGPAs,
    fetchEducations,
    setHideAll,
  } = useEducationsInfo();

  useEffect(() => {
    let educationsLocalStorage = localStorage.getItem(educationID);
    if (!educationsLocalStorage) {
      fetchEducations();
    }
  }, [fetchEducations]);

  return (
    <FormCardWrapper
      cardTitle="Education"
      refreshFunction={() => fetchEducations()}
      hideAll={hideAll}
      deleteFunction={setHideAll}
    >
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

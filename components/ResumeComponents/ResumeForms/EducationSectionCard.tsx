"use client";
import { FC, useState } from "react";
import { FormCardWrapper } from "./FormCardWrapper";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { HideButtons } from "@/components/UIButtons/HideButtons";
interface EducationSectionCard {}

export const EducationSectionCard: FC<EducationSectionCard> = ({}) => {
  const [hideGPA, setHideGpa] = useState(true);
  const [hideYears, setHideYears] = useState(false);

  return (
    <FormCardWrapper cardTitle="Education">
      <div className="flex space-x-4 w-full justify-end">
        <HideButtons hide={hideGPA} setHide={() => setHideGpa(!hideGPA)}>
          <span>Hide GPA</span>
        </HideButtons>

        <HideButtons hide={hideYears} setHide={() => setHideYears(!hideYears)}>
          <span>Hide Years</span>
        </HideButtons>
      </div>
      <Label>Relavant Coursework</Label>
      <Input placeholder="Relavant Coursework"></Input>
    </FormCardWrapper>
  );
};

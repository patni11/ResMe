"use client";
import { FC, memo } from "react";
import { FormCardWrapper } from "../FormCardWrapper";
import { Input } from "@/components/ui/input";

import { createTalentsInfo } from "@/store/talentsInfo";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Trash2 } from "lucide-react";
import { Label } from "@/components/ui/label";

type TalentsSectionProp = {
  // skills: string;
  // hideAll: boolean;
  talentsID: string;
  index: number;
  moveUp: (index: number) => void;
  moveDown: (index: number) => void;
  // isLoading: boolean;
  // fetchSkills: () => void;
  // setHideAll: () => void;
  // setSkills: (newSkills: string) => void;
};
const TalentsSection: FC<TalentsSectionProp> = ({
  talentsID,
  index,
  moveUp,
  moveDown,
}) => {
  const useTalentsInfo = createTalentsInfo(talentsID);
  const {
    skills,
    interests,
    languages,
    hideSkills,
    hideLanguages,
    hideInterests,
    isLoading,
    setHideSkills,
    setHideInterests,
    setHideLanguages,
    setSkills,
    setInterests,
    setLanguages,
    fetchDefaultTalent,
    fetchTalents,
  } = useTalentsInfo();

  const setHideAll = () => {
    setHideInterests(true);
    setHideLanguages(true);
    setHideSkills(true);
  };

  return (
    <FormCardWrapper
      cardTitle="Talent"
      refreshFunction={() => fetchDefaultTalent()}
      refreshSection={() => fetchTalents()}
      hideAll={hideSkills && hideInterests & hideLanguages}
      isLoading={isLoading}
      deleteFunction={setHideAll}
      index={index}
      moveUp={moveUp}
      moveDown={moveDown}
    >
      <div className="flex flex-col space-y-2 mt-4">
        <div className="flex flex-col space-y-2 w-full">
          <Label className="block"> Skills</Label>
          <div className="flex">
            <Input
              className="w-full focus-visible:ring-0"
              placeholder={`Your Skills`}
              value={skills}
              onChange={(e) => {
                setSkills(e.currentTarget.value);
              }}
            ></Input>
            <Button
              variant="ghost"
              className="hover:text-destructive"
              onClick={() => setHideSkills(!hideSkills)}
              aria-label="Delete Description"
            >
              {!hideSkills ? (
                <Eye className="w-4 h-4" />
              ) : (
                <EyeOff className="w-4 h-4" />
              )}
            </Button>
          </div>
        </div>
        <div className="flex flex-col space-y-2 w-full">
          <Label className="block"> Interests</Label>
          <div className="flex">
            <Input
              className="w-full focus-visible:ring-0"
              placeholder={`Your Interests`}
              value={interests}
              onChange={(e) => {
                setInterests(e.currentTarget.value);
              }}
            ></Input>
            <Button
              variant="ghost"
              className="hover:text-destructive"
              onClick={() => setHideInterests(!hideInterests)}
              aria-label="Delete Description"
            >
              {!hideInterests ? (
                <Eye className="w-4 h-4" />
              ) : (
                <EyeOff className="w-4 h-4" />
              )}
            </Button>
          </div>
        </div>
        <div className="flex flex-col space-y-2 w-full">
          <Label className="block"> Languages</Label>
          <div className="flex">
            <Input
              className="w-full focus-visible:ring-0"
              placeholder={`Your Languages`}
              value={languages}
              onChange={(e) => {
                setLanguages(e.currentTarget.value);
              }}
            ></Input>
            <Button
              variant="ghost"
              className="hover:text-destructive"
              onClick={() => setHideLanguages(!hideLanguages)}
              aria-label="Delete Description"
            >
              {!hideLanguages ? (
                <Eye className="w-4 h-4" />
              ) : (
                <EyeOff className="w-4 h-4" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </FormCardWrapper>
  );
};

export default memo(TalentsSection);

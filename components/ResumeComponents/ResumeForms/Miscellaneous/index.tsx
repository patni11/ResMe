"use client";
import { FC, useEffect } from "react";
import { FormCardWrapper } from "../FormCardWrapper";
import { Input } from "@/components/ui/input";
type MiscellaneousSectionCardProp = {
  name: string;
  skills: string;
  hideAll: boolean;
  fetchSkills: () => void;
  setHideAll: () => void;
  setSkills: (newSkills: string) => void;
};
const MiscellaneousSectionCard: FC<MiscellaneousSectionCardProp> = ({
  name,
  skills,
  hideAll,
  setHideAll,
  fetchSkills,
  setSkills,
}) => {
  useEffect(() => {
    let skillssLocalStorage = localStorage.getItem("skillssLocalStorage");
    if (!skillssLocalStorage) {
      fetchSkills();
    }
  }, [fetchSkills]);

  return (
    <FormCardWrapper
      cardTitle={name}
      refreshFunction={() => fetchSkills()}
      hideAll={hideAll}
      deleteFunction={setHideAll}
    >
      <div className="flex flex-col space-y-2 mt-4">
        <Input
          placeholder="Your skills"
          value={skills}
          onChange={(e) => {
            setSkills(e.currentTarget.value);
          }}
        ></Input>
      </div>
    </FormCardWrapper>
  );
};

import { useSkillsInfo } from "@/store/skillsInfo";
export const SkillsSectionCard = ({}) => {
  const { skills, hideAll, setHideAll, fetchSkills, setSkills } =
    useSkillsInfo();

  return (
    <MiscellaneousSectionCard
      name="Skills"
      skills={skills}
      hideAll={hideAll}
      setHideAll={setHideAll}
      fetchSkills={fetchSkills}
      setSkills={setSkills}
    />
  );
};

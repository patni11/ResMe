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
    let skillssLocalStorage = localStorage.getItem("talentLocalStorage");
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
          placeholder={`Your ${name}`}
          value={skills}
          onChange={(e) => {
            setSkills(e.currentTarget.value);
          }}
        ></Input>
      </div>
    </FormCardWrapper>
  );
};

import { useTalentsInfo } from "@/store/talentsInfo";
export const SkillsSectionCard = ({}) => {
  const { skills, hideSkills, setHideSkills, fetchSkills, setSkills } =
    useTalentsInfo();

  return (
    <MiscellaneousSectionCard
      name="Skills"
      skills={skills}
      hideAll={hideSkills}
      setHideAll={setHideSkills}
      fetchSkills={fetchSkills}
      setSkills={setSkills}
    />
  );
};

export const InterestsSectionCard = ({}) => {
  const {
    interests,
    hideInterests,
    setHideInterests,
    fetchInterests,
    setInterests,
  } = useTalentsInfo();

  return (
    <MiscellaneousSectionCard
      name="Interests"
      skills={interests}
      hideAll={hideInterests}
      setHideAll={setHideInterests}
      fetchSkills={fetchInterests}
      setSkills={setInterests}
    />
  );
};

export const LanguagesSectionCard = ({}) => {
  const {
    languages,
    hideLanguages,
    setHideLanguages,
    fetchLanguages,
    setLanguages,
  } = useTalentsInfo();

  return (
    <MiscellaneousSectionCard
      name="Languages"
      skills={languages}
      hideAll={hideLanguages}
      setHideAll={setHideLanguages}
      fetchSkills={fetchLanguages}
      setSkills={setLanguages}
    />
  );
};

"use client";
import { FC, useEffect } from "react";
import { FormCardWrapper } from "../FormCardWrapper";
import { Input } from "@/components/ui/input";
type MiscellaneousSectionCardProp = {
  name: string;
  skills: string;
  hideAll: boolean;
  talentsID: string;
  fetchSkills: () => void;
  setHideAll: () => void;
  setSkills: (newSkills: string) => void;
};
const MiscellaneousSectionCard: FC<MiscellaneousSectionCardProp> = ({
  name,
  skills,
  hideAll,
  talentsID,
  setHideAll,
  fetchSkills,
  setSkills,
}) => {
  useEffect(() => {
    let skillssLocalStorage = localStorage.getItem(talentsID);
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

import { createTalentsInfo } from "@/store/talentsInfo";
export const SkillsSectionCard = ({ talentsID }: { talentsID: string }) => {
  const useTalentsInfo = createTalentsInfo(talentsID);
  const { skills, hideSkills, setHideSkills, fetchSkills, setSkills } =
    useTalentsInfo();

  return (
    <MiscellaneousSectionCard
      name="Skills"
      skills={skills}
      hideAll={hideSkills}
      talentsID={talentsID}
      setHideAll={() => setHideSkills()}
      fetchSkills={() => fetchSkills()}
      setSkills={(newSkills: string) => setSkills(newSkills)}
    />
  );
};

export const InterestsSectionCard = ({ talentsID }: { talentsID: string }) => {
  const useTalentsInfo = createTalentsInfo(talentsID);
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
      talentsID={talentsID}
      setHideAll={() => setHideInterests()}
      fetchSkills={() => fetchInterests()}
      setSkills={(newSkills: string) => setInterests(newSkills)}
    />
  );
};

export const LanguagesSectionCard = ({ talentsID }: { talentsID: string }) => {
  const useTalentsInfo = createTalentsInfo(talentsID);
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
      talentsID={talentsID}
      setHideAll={() => setHideLanguages()}
      fetchSkills={() => fetchLanguages()}
      setSkills={(newSkills: string) => setLanguages(newSkills)}
    />
  );
};

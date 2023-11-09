"use client";
import { createTalentsInfo } from "@/store/talentsInfo";
import ResumeComponentContainer from "./ResumeComponentContainer";
//import ResumeComponentContainer from "./ResumeComponentContainer";

export default function TalentSection({ talentsID }: { talentsID: string }) {
  const useTalentsInfo = createTalentsInfo(talentsID);
  const {
    skills,
    languages,
    interests,
    hideSkills,
    hideLanguages,
    hideInterests,
  } = useTalentsInfo();

  if (hideInterests && hideLanguages && hideSkills) {
    return null;
  }

  return (
    <ResumeComponentContainer>
      <div className="flex flex-col justify-start items-start w-full">
        <h1 className="sectionHeader">SKILLS & INTERESTS </h1>

        {skills != "" && !hideSkills ? (
          <p className="text-xs text-left">
            <span className="font-semibold">Skills: </span>
            {skills}
          </p>
        ) : null}
        {interests != "" && !hideInterests ? (
          <p className="text-xs text-left">
            <span className="font-semibold">Interests: </span>
            {interests}
          </p>
        ) : null}
        {languages != "" && !hideLanguages ? (
          <p className="text-xs text-left">
            <span className="font-semibold">Languages: </span>
            {languages}
          </p>
        ) : null}
      </div>
    </ResumeComponentContainer>
  );
}

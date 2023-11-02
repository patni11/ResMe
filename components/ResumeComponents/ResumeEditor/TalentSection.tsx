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

  return (
    <ResumeComponentContainer>
      <div className="flex flex-col justify-start items-start w-full">
        <h1 className="text-sm font-semibold" style={{ marginBottom: "2px" }}>
          SKILLS & INTERESTS{" "}
        </h1>
        <hr
          className="h-[3px] bg-black w-full"
          style={{ marginBottom: "1px" }}
        />

        {skills != "" && !hideSkills ? (
          <p className="text-xs text-left">
            <span className="font-semibold">Skills: </span>
            {skills}
          </p>
        ) : null}
        {languages != "" && !hideLanguages ? (
          <p className="text-xs text-left">
            <span className="font-semibold">Languages: </span>
            {languages}
          </p>
        ) : null}
        {interests != "" && !hideInterests ? (
          <p className="text-xs text-left">
            <span className="font-semibold">Interests: </span>
            {interests}
          </p>
        ) : null}
      </div>
    </ResumeComponentContainer>
  );
}

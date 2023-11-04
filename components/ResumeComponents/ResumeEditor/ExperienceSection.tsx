"use client";

import { createExperienceInfo } from "@/store/experienceInfo";
import ResumeComponentContainer from "./ResumeComponentContainer";
import { FC } from "react";
import { getFormattedDate } from "@/app/utils/FormattingFunctions";
import "./listStyle.css";
interface ExperienceSection {
  experienceID: string;
}

const ExperienceSection: FC<ExperienceSection> = ({ experienceID }) => {
  const useExperiencesInfo = createExperienceInfo(experienceID);
  const { experiences, hiddenExperiences, hideAll } = useExperiencesInfo();

  if (hideAll) {
    return null;
  }

  return (
    <ResumeComponentContainer>
      <div className="flex flex-col justify-start items-start w-full mt-4">
        <h1 className="text-sm font-semibold" style={{ marginBottom: "2px" }}>
          {" "}
          EXPERIENCES{" "}
        </h1>
        <hr
          className="h-[3px] bg-black w-full"
          style={{ marginBottom: "1px" }}
        />

        {experiences.map((experience: any) => {
          const isExperienceHidden =
            hiddenExperiences && hiddenExperiences[experience._id];
          if (isExperienceHidden) {
            return <div key={experience._id}></div>; // Remember to add a key here
          }
          return (
            <ExperienceCard
              key={experience._id}
              experience={experience}
              // hideExperience={hiddenExperiences && hiddenExperiences[experience._id]}
            />
          );
        })}
      </div>
    </ResumeComponentContainer>
  );
};

interface ExperienceCardProps {
  experience: {
    _id: string;
    company: string;
    location: string;
    positionTitle: string;
    experienceType: string;
    startDate: Date;
    endDate: Date | "working";
    description: string[];
  };
}

const ExperienceCard: FC<ExperienceCardProps> = ({ experience }) => {
  const endDate =
    experience.endDate == "working"
      ? "Current"
      : getFormattedDate(new Date(experience.endDate));

  const descriptions = experience.description;

  return (
    <div className="flex flex-col space-between text-xs w-full leading-tight mb-3">
      <div className="flex space-between">
        <div className="flex flex-col w-full text-left">
          {/* <p>Northeastern University</p> */}
          <p className="font-bold">{experience.company}</p>
          {/* <p>September 2021 - May 2025</p> */}
          <p className="italic text-gray-900 font-normal">
            {experience.positionTitle}
          </p>
        </div>
        <div className="flex flex-col font-bold w-full text-right">
          {/* <p>Bachelor&apos;s Computer Science</p> */}
          {experience.experienceType} {experience.location}
          <p className="font-light italic">
            {getFormattedDate(new Date(experience.startDate))} - {endDate}
          </p>
        </div>
      </div>
      <ul className="text-left m-0 pl-2" style={{ listStyleType: "none" }}>
        {Array.isArray(descriptions)
          ? descriptions.map((desc, index) => {
              return (
                <li key={index} className="bulletList">
                  {desc}
                </li>
              );
            })
          : null}
      </ul>
    </div>
  );
};

export default ExperienceSection;

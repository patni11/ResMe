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
        <h1 className="sectionHeader">EXPERIENCE </h1>

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
    <div className="card-w-list">
      <div className="card">
        <div className="detail-col text-left">
          <h2 className="sideText">{experience.company}</h2>
          <span className="italicSecondary">{experience.positionTitle}</span>
        </div>
        <div className="detail-col text-right">
          <h2 className="sideText">
            {experience.experienceType} {experience.location}
          </h2>
          <span className="italicSecondary">
            {getFormattedDate(new Date(experience.startDate))} - {endDate}
          </span>
        </div>
      </div>
      <ul className="sectionList">
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

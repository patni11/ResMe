"use client";

import { createEducationInfo } from "@/store/educationInfo";
import ResumeComponentContainer from "./ResumeComponentContainer";
import { EducationType } from "@/app/(mainApp)/education/pageTypes";
import { FC } from "react";
import {
  getFormattedDate,
  parseDecimal,
} from "@/app/utils/FormattingFunctions";

interface EducationSectionProps {
  educationID: string;
}

import "./sectionStyle.css";

const EducationSection: React.FC<EducationSectionProps> = ({ educationID }) => {
  const useEducationsInfo = createEducationInfo(educationID);
  const {
    educations,
    hiddenDates,
    hiddenGPAs,
    hiddenEducations,
    hideAll,
    relevantCourseWork,
  } = useEducationsInfo();

  if (hideAll) {
    return null;
  }

  return (
    <ResumeComponentContainer>
      <div className="flex flex-col justify-start items-start w-full">
        {/* <h1 className="text-sm font-semibold"> EDUCATION </h1>
        <hr className="h-[3px] bg-black w-full mb-[0.5px] mt-[0.5px]" /> */}
        <h1 className="sectionHeader">EDUCATION </h1>

        {educations.map((education: any) => {
          const isEducationHidden =
            hiddenEducations && hiddenEducations[education._id];
          if (isEducationHidden) {
            return <div key={education._id}></div>; // Remember to add a key here
          }
          return (
            <EducationCard
              key={education._id}
              education={education}
              hideGPA={hiddenGPAs![education._id]}
              hideDate={hiddenDates![education._id]}
              // hideEducation={hiddenEducations && hiddenEducations[education._id]}
            />
          );
        })}

        {relevantCourseWork != "" ? (
          <p className="text-xs text-left">
            <span className="font-semibold text-left">Relevant Courses:</span>{" "}
            {relevantCourseWork}
          </p>
        ) : null}
      </div>
    </ResumeComponentContainer>
  );
};

interface EducationCardProps {
  education: EducationType;
  hideGPA: boolean;
  hideDate: boolean;
}

const EducationCard: FC<EducationCardProps> = ({
  education,
  hideGPA,
  hideDate,
}) => {
  const gpa = education?.gpa ? parseDecimal(education.gpa) : 0;
  return (
    <div className="card">
      <div className="detail-col text-left">
        <h2>{education.schoolName}</h2>

        <span className="italicSecondary">
          {education.degreeType} {education.major}
        </span>
      </div>
      <div className="detail-col text-right">
        {/* <p>Bachelor&apos;s Computer Science</p> */}

        {!hideDate ? (
          <h2>
            {getFormattedDate(new Date(education.startDate))} -{" "}
            {getFormattedDate(new Date(education.endDate))}
          </h2>
        ) : null}

        {!hideGPA ? (
          <span className="italicSecondary"> GPA: {gpa.toString()}</span>
        ) : null}
      </div>
    </div>
  );
};

export default EducationSection;

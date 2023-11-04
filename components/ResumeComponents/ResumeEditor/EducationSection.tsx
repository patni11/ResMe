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
        <h1 className="text-sm font-semibold" style={{ marginBottom: "2px" }}>
          {" "}
          EDUCATION{" "}
        </h1>
        <hr
          className="h-[3px] bg-black w-full"
          style={{ marginBottom: "1px" }}
        />

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
    <div className="flex flex space-between text-xs w-full leading-tight mb-1">
      <div className="flex flex-col w-full text-left">
        {/* <p>Northeastern University</p> */}
        <p className="font-bold">{education.schoolName}</p>
        {/* <p>September 2021 - May 2025</p> */}
        <p className="italic text-gray-900 font-normal">
          {education.degreeType} {education.major}
        </p>
      </div>
      <div className="flex flex-col font-light italic w-full text-right">
        {/* <p>Bachelor&apos;s Computer Science</p> */}

        {!hideDate ? (
          <p className="font-bold">
            {getFormattedDate(new Date(education.startDate))} -{" "}
            {getFormattedDate(new Date(education.endDate))}
          </p>
        ) : null}
        {!hideGPA ? <p> GPA: {gpa.toString()}</p> : null}
      </div>
    </div>
  );
};

export default EducationSection;

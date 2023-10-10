"use client";

import ResumeComponentContainer from "./ResumeComponentContainer";

export default function EducationSection({
  headerContent,
}: {
  headerContent?: any;
}) {
  return (
    <ResumeComponentContainer>
      <div className="flex flex-col justify-start items-start w-full">
        <h1 className="text-sm font-semibold m-0"> EDUCATION </h1>
        <hr className="h-[3px] bg-black w-full mb-[0.5px]" />

        <EducationCard></EducationCard>
        <EducationCard></EducationCard>
        <ul className="text-xs mt-1 ml-4 list-disc">
          <li>
            <span className="font-semibold">Relevant Courses:</span> Data
            Structures & Algorithms, Object Oriented Design, Financial
            Economics, Database Design
          </li>
        </ul>

        <p className="mx-0 text-xs">
          <span className="font-semibold m-0">Certifications: </span>Stanford
          University Algorithms Specialization, Nand 2 Tetris Part 1, Full Stack
          Solidity Developer Course
        </p>
      </div>
    </ResumeComponentContainer>
  );
}

const EducationCard = () => {
  return (
    <div className="flex flex-col items-center text-xs w-full leading-tight mb-1">
      <div className="flex justify-between font-bold w-full">
        <p>Northeastern University</p>
        <p>September 2021 - May 2025</p>
      </div>
      <div className="flex justify-between font-light italic w-full">
        <p>Bachelor's Computer Science</p>
        <p>GPA: 3.3</p>
      </div>
    </div>
  );
};

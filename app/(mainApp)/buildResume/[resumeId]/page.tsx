"use client";
import { TestResumeHeader } from "@/components/ResumeComponents/ResumeForms/testHeaderSections";

const BuildResume = ({ params }: { params: { resumeId: string } }) => {
  console.log(params.resumeId);
  return (
    <>
      <TestResumeHeader resumeId={params.resumeId} />
    </>
  );
};

export default BuildResume;

"use client";
//import { TestResumeHeader } from "@/components/ResumeComponents/ResumeForms/testHeaderSections";
import MainEditor from "../mainEditor";

const BuildResume = ({ params }: { params: { resumeId: string } }) => {
  console.log(params.resumeId);
  return (
    <>
      <MainEditor resumeId={params.resumeId} />
    </>
  );
};

export default BuildResume;

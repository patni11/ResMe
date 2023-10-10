"use client";

import ResumeComponentContainer from "./ResumeComponentContainer";

export default function ResumeHeader({
  headerContent,
}: {
  headerContent?: any;
}) {
  return (
    <ResumeComponentContainer>
      <div className="flex flex-col items-center">
        <h1 className="text-2xl font-semibold"> SHUBH PATNI </h1>
        <div className="flex items-center text-xs">
          <p>+1 124918 | </p>
          <h2>shubhpatni2002@gmail.com</h2>
        </div>
      </div>
    </ResumeComponentContainer>
  );
}

"use client";
import { SectionWrapper } from "./SectionWrapper";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useRef, useState } from "react";
import React from "react";
import { AICLHelper } from "@/components/Cards/AICLHelper";
import { createCoverLetterData } from "@/store/coverLetter/data";
import { buttonVariants } from "@/components/ui/button";
import { CardDescription } from "@/components/ui/card";
import { fetchDashboardData } from "@/lib/actions/user.actions";
import { Skeleton } from "@/components/ui/skeleton";

const SavedData = ({
  selectedResume,
  setSelectedResume,
}: {
  selectedResume: string;
  setSelectedResume: (newSelectedResume: string) => void;
}) => {
  const [isloading, setIsLoading] = useState(true);
  const [resumes, setResumes] = useState<
    | Array<{
        id: string;
        resumeName: string;
        updatedAt: Date;
        pdfLink: string;
      }>
    | undefined
  >(undefined);

  useEffect(() => {
    async function getData() {
      const resumeData = (await fetchDashboardData())?.resumes;
      setResumes(resumeData);
      setIsLoading(false);
    }
    getData();
  }, [resumes]);

  if (isloading || resumes === undefined) {
    return (
      <div className="w-96">
        <div className="flex flex-row space-x-4 overflow-x-auto">
          <Skeleton className="w-20 h-10"></Skeleton>
          <Skeleton className="w-20 h-10"></Skeleton>
          <Skeleton className="w-20 h-10"></Skeleton>
          <Skeleton className="w-20 h-10"></Skeleton>
          <Skeleton className="w-20 h-10"></Skeleton>
          <Skeleton className="w-20 h-10"></Skeleton>
        </div>
      </div>
    );
  }

  return (
    <div className="w-96 flex flex-col space-y-2">
      <CardDescription> Select a resume for cover letter</CardDescription>
      <div className="w-96">
        <div className="flex flex-row space-x-4 overflow-x-auto">
          <button
            className={buttonVariants({
              variant: "ghost",
              className: `whitespace-nowrap border ${
                selectedResume === "default"
                  ? "border-black"
                  : "border-transparent"
              }`,
            })}
            onClick={(e) => {
              e.preventDefault();
              setSelectedResume("default");
            }}
          >
            All Saved Data
          </button>

          {resumes.map((resume) => {
            return (
              <button
                key={resume.id}
                className={buttonVariants({
                  variant: "ghost",
                  className: `whitespace-nowrap border flex flex-col justify-start items-start text-left py-1 ${
                    selectedResume === resume.id
                      ? "border-black"
                      : "border-transparent"
                  }`,
                })}
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedResume(resume.id);
                }}
              >
                <span className="text-md font-semibold m-0 text-left">
                  {resume.resumeName}
                </span>
                {/* <span
                  className="font-normal m-0 text-left"
                  style={{ fontSize: "9px" }}
                >
                  {timeAgo(resume.updatedAt)}
                </span> */}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const AI = () => {
  const [inputText, setInputText] = useState("");
  const [selectedResume, setSelectedResume] = useState("default");
  const textAreaInput = useRef<HTMLTextAreaElement>(null);
  React.useImperativeHandle(textAreaInput, () => textAreaInput.current!);

  const useCoverLetterData = createCoverLetterData("1");
  const { changeData } = useCoverLetterData();

  return (
    <>
      <SectionWrapper
        title="AI"
        description="Enter your job description and let AI generate the cover letter"
        onboardClass="ai"
      >
        <div className="w-full flex flex-col space-y-4 ai">
          <Textarea
            ref={textAreaInput}
            placeholder="Enter Job Description"
            className="h-96"
            onChange={(e) => {
              setInputText(e.target.value);
            }}
          />

          {/* select resume or all data */}
          <SavedData
            selectedResume={selectedResume}
            setSelectedResume={setSelectedResume}
          />

          <AICLHelper
            jobDescription={inputText}
            resumeId={selectedResume} //todo
            setMessage={(message: string) => {
              changeData({ field: "text", value: message });
            }}
          />
        </div>
      </SectionWrapper>
    </>
  );
};

export default AI;

"use client";
import { FC } from "react";

import { EducationSectionCard } from "@/components/ResumeComponents/ResumeForms/EducationSectionCard";
import { buttonVariants } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import ExperienceSectionCard from "@/components/ResumeComponents/ResumeForms/ExperienceSectionCard";
import ResumeHeader from "@/components/ResumeComponents/ResumeForms/ResumeHeader";
import { UserInfo } from "@/app/(mainApp)/userInfo/pageType";

import { ProjectSectionCard } from "@/components/ResumeComponents/ResumeForms/ProjectsSection";
import {
  InterestsSectionCard,
  LanguagesSectionCard,
  SkillsSectionCard,
} from "@/components/ResumeComponents/ResumeForms/Miscellaneous/index";
import { CertificateSectionCard } from "@/components/ResumeComponents/ResumeForms/CertificateSectionCard";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface EditPanelProps {
  resumeId?: string;
  email?: string;
}

const EditPanel: FC<EditPanelProps> = ({
  resumeId = "default",
  email = "",
}) => {
  return (
    <main className="w-full h-screen overflow-y-auto flex flex-col items-start bg-gray-200 p-4 space-y-2">
      <div className="flex space-x-2 w-full  justify-right">
        <Dialog>
          <DialogTrigger className="w-full ">
            <span
              className={buttonVariants({
                variant: "outline",
              })}
            >
              How It Works
            </span>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-center mb-4">
                How ResMe Works
              </DialogTitle>
              <DialogDescription className="flex flex-col space-y-4 items-center">
                <ul className="flex flex-col space-y-4">
                  <li>Step1: Enter your details to sections in sidebar</li>
                  <li>Step2: Click refresh to reset or load data</li>
                  <li>Step3: Make your changes</li>
                  <li>Step4: Save or Download</li>
                </ul>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
        <h1
          className={`${buttonVariants({
            variant: "secondary",
          })} w-full flex space-x-2`}
        >
          <span>Click</span> <RefreshCw className="h-4 w-4" />{" "}
          <span>to Load Data</span>
        </h1>
      </div>
      <ResumeHeader resumeHeaderID={`resumeHeader-${email}-${resumeId}`} />
      <EducationSectionCard educationID={`educations-${email}-${resumeId}`} />
      <CertificateSectionCard
        certificateID={`certificates-${email}-${resumeId}`}
      />
      <ExperienceSectionCard
        experienceID={`experiences-${email}-${resumeId}`}
      />
      <ProjectSectionCard projectId={`projects-${email}-${resumeId}`} />
      <SkillsSectionCard talentsID={`talents-${email}-${resumeId}`} />
      <LanguagesSectionCard talentsID={`talents-${email}-${resumeId}`} />
      <InterestsSectionCard talentsID={`talents-${email}-${resumeId}`} />
    </main>
  );
};

export default EditPanel;

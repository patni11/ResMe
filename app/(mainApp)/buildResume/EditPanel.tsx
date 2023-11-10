"use client";
import { FC } from "react";

import EducationSectionCard from "@/components/ResumeComponents/ResumeForms/EducationSectionCard";
import { buttonVariants } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import ExperienceSectionCard from "@/components/ResumeComponents/ResumeForms/ExperienceSectionCard";
import ResumeHeader from "@/components/ResumeComponents/ResumeForms/ResumeHeader";
import ProjectSectionCard from "@/components/ResumeComponents/ResumeForms/ProjectsSection";
import TalentsSection from "@/components/ResumeComponents/ResumeForms/Miscellaneous/index";
import CertificateSectionCard from "@/components/ResumeComponents/ResumeForms/CertificateSectionCard";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React from "react";

interface EditPanelProps {
  componentsData: { type: string; id: string }[];
  moveUp: (index: number) => void;
  moveDown: (index: number) => void;
}

const EditPanel: FC<EditPanelProps> = ({
  componentsData,
  moveUp,
  moveDown,
}) => {
  // const initialComponents = [
  //   <ResumeHeader resumeHeaderID={`resumeHeader-${email}-${resumeId}`} />,
  //   <EducationSectionCard educationID={`educations-${email}-${resumeId}`} />,
  //   <CertificateSectionCard
  //     certificateID={`certificates-${email}-${resumeId}`}
  //   />,
  //   <ExperienceSectionCard experienceID={`experiences-${email}-${resumeId}`} />,
  //   <ProjectSectionCard projectId={`projects-${email}-${resumeId}`} />,
  //   <TalentsSection talentsID={`talents-${email}-${resumeId}`} />,
  //   // ... other components
  // ];

  const renderComponent = (
    componentData: { type: string; id: string },
    index: number
  ) => {
    switch (componentData.type) {
      case "ResumeHeader":
        return (
          <ResumeHeader
            resumeHeaderID={componentData.id}
            index={index}
            moveUp={moveUp}
            moveDown={moveDown}
          />
        );
      case "EducationSectionCard":
        return (
          <EducationSectionCard
            educationID={componentData.id}
            index={index}
            moveUp={moveUp}
            moveDown={moveDown}
          />
        );
      case "CertificateSectionCard":
        return (
          <CertificateSectionCard
            certificateID={componentData.id}
            index={index}
            moveUp={moveUp}
            moveDown={moveDown}
          />
        );
      case "ExperienceSectionCard":
        return (
          <ExperienceSectionCard
            experienceID={componentData.id}
            index={index}
            moveUp={moveUp}
            moveDown={moveDown}
          />
        );
      case "ProjectSectionCard":
        return (
          <ProjectSectionCard
            projectId={componentData.id}
            index={index}
            moveUp={moveUp}
            moveDown={moveDown}
          />
        );
      case "TalentsSection":
        return (
          <TalentsSection
            talentsID={componentData.id}
            index={index}
            moveUp={moveUp}
            moveDown={moveDown}
          />
        );
      // ... other cases for other components
      default:
        return null;
    }
  };

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
              <DialogTitle className="text-center mb-4 text-xl font-semibold">
                How ResMe Works
              </DialogTitle>
              <DialogDescription className="flex flex-col space-y-8 items-center">
                <ul className="flex flex-col space-y-8 mb-4">
                  <li className="text-lg">
                    Step1: Enter your details to sections in sidebar
                  </li>
                  <li className="text-lg">
                    Step2: Click refresh to reset or load data
                  </li>
                  <li className="text-lg">Step3: Make your changes</li>
                  <li className="text-lg">Step4: Save or Download</li>
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
      {/* <ResumeHeader resumeHeaderID={`resumeHeader-${email}-${resumeId}`} />
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
      <InterestsSectionCard talentsID={`talents-${email}-${resumeId}`} /> */}
      {/* <div>
        {components.map((Component, index) => (
          <div key={index}>
            {Component}
            <button onClick={() => moveUp(index)}>Up</button>
            <button onClick={() => moveDown(index)}>Down</button>
          </div>
        ))}
      </div> */}

      {componentsData.map((componentData, index) => (
        <div key={componentData.id} className="w-full">
          {renderComponent(componentData, index)}
        </div>
      ))}
    </main>
  );
};

export default EditPanel;

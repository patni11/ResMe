"use client";
import { FC } from "react";

import { EducationSectionCard } from "@/components/ResumeComponents/ResumeForms/EducationSectionCard";
import { buttonVariants } from "@/components/ui/button";
import { SaveIcon } from "lucide-react";
import ExperienceSectionCard from "@/components/ResumeComponents/ResumeForms/ExperienceSectionCard";
import ResumeHeader from "@/components/ResumeComponents/ResumeForms/ResumeHeader";
import { UserInfo } from "@/app/(mainApp)/userInfo/pageType";
import { Input } from "@/components/ui/input";
import { ProjectSectionCard } from "@/components/ResumeComponents/ResumeForms/ProjectsSection";
import {
  InterestsSectionCard,
  LanguagesSectionCard,
  SkillsSectionCard,
} from "@/components/ResumeComponents/ResumeForms/Miscellaneous/index";
import { CertificateSectionCard } from "@/components/ResumeComponents/ResumeForms/CertificateSectionCard";
interface EditPanelProps {
  resumeId?: string;
  email?: string;
}

const EditPanel: FC<EditPanelProps> = ({
  resumeId = "default",
  email = "",
}) => {
  const userDetails: UserInfo = {
    displayName: "Shubh Patni",
    email: "1234",
    location: "Boston, MA",
    links: [
      { linkName: "Website", link: "https://www.shubhpatni.com/" },
      { linkName: "Linkedin", link: "https://www.linkedin.com/in/patnishubh/" },
    ],
    contactInfo: [{ contact: "shubhpatni2002@gmail.com" }],
  };

  return (
    <main className="w-full h-screen overflow-y-auto flex flex-col items-start bg-gray-200 p-4 space-y-2">
      <div className="flex space-x-2 w-full">
        <Input defaultValue={`Untitled Resume`} className=""></Input>
        <h1
          className={`${buttonVariants({
            variant: "secondary",
          })} w-full flex space-x-2`}
        >
          <span>Edit Resume & Save</span>
          <SaveIcon className="w-5 h-5" />
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

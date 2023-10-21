import { FC } from "react";

import { EducationSectionCard } from "@/components/ResumeComponents/ResumeForms/EducationSectionCard";
import { buttonVariants } from "@/components/ui/button";
import { ArrowBigRight } from "lucide-react";
import { ExperienceSectionCard } from "@/components/ResumeComponents/ResumeForms/ExperienceSectionCard";
import { ResumeHeader } from "@/components/ResumeComponents/ResumeForms/ResumeHeader";
import { UserInfo } from "@/app/(mainApp)/userInfo/pageType";
interface EditPanelProps {}

const EditPanel: FC<EditPanelProps> = () => {
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
    <main className="w-full h-full flex flex-col items-start bg-gray-200 p-4 space-y-2">
      <h1 className={buttonVariants({ variant: "secondary" })}>
        Enter details here & preview on the right{" "}
        <ArrowBigRight className="w-5 h-5" />
        <ArrowBigRight className="w-5 h-5" />
        <ArrowBigRight className="w-5 h-5" />
      </h1>
      <ResumeHeader userDetails={userDetails}></ResumeHeader>
      <EducationSectionCard></EducationSectionCard>
      <ExperienceSectionCard></ExperienceSectionCard>
      <ExperienceSectionCard></ExperienceSectionCard>
      <ExperienceSectionCard></ExperienceSectionCard>
    </main>
  );
};

export default EditPanel;

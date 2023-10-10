import { FC } from "react";

import { EducationSectionCard } from "@/components/ResumeComponents/ResumeForms/EducationSectionCard";
import { buttonVariants } from "@/components/ui/button";
import { ArrowBigRight } from "lucide-react";
import { ExperienceSectionCard } from "@/components/ResumeComponents/ResumeForms/ExperienceSectionCard";
interface EditPanelProps {}

const EditPanel: FC<EditPanelProps> = () => {
  return (
    <main className="w-full h-full flex flex-col items-start bg-gray-200 p-4 space-y-2">
      <h1 className={buttonVariants({ variant: "secondary" })}>
        Enter details here & preview on the right{" "}
        <ArrowBigRight className="w-5 h-5" />
        <ArrowBigRight className="w-5 h-5" />
        <ArrowBigRight className="w-5 h-5" />
      </h1>
      <EducationSectionCard></EducationSectionCard>
      <ExperienceSectionCard></ExperienceSectionCard>
    </main>
  );
};

export default EditPanel;

import { FC } from "react";
import { ResumeCard } from "./ResumeCard";
import { cn } from "@/lib/utils";
import { timeAgo } from "@/app/utils/FormattingFunctions";
import { CreateResumeButton } from "../UIButtons/CreateResume";
import { Plan } from "@/app/utils/stripe";
interface DashBoardProps {
  email: string;
  resumes:
    | { id: string; resumeName: string; updatedAt: Date; pdfLink: string }[]
    | [];
  plan: Plan;
}
const DashBoard: FC<DashBoardProps> = async ({ email, resumes, plan }) => {
  return (
    <>
      <div className="relative w-[90%] flex justify-center md:justify-start items-center space-y-4">
        <div className="flex flex-col justify-center space-y-4 md:space-y-0 md:flex-row md:justify-start flex-wrap space-x-4 pb-4 text-wrap">
          <div className={cn("space-y-3 w-[200px] ml-4")}>
            <CreateResumeButton
              email={email}
              canCreateResumes={resumes.length < plan.quota}
              //canCreateResumes={true}
            />

            <div className="flex justify-left text-sm">
              <h3 className="font-medium leading-none">Create Resume</h3>
            </div>
          </div>
          {resumes.map((resume) => (
            <ResumeCard
              key={resume.id}
              resumeName={resume.resumeName}
              resumeId={resume.id}
              email={email}
              pdfLink={resume.pdfLink}
              updatedAt={timeAgo(resume.updatedAt) || ""}
              className="w-[200px] mb-12"
              aspectRatio="portrait"
              width={200}
              height={265}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default DashBoard;

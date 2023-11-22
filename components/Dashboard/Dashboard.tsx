import { FC } from "react";
import { ResumeCard } from "./ResumeCard";
import { cn } from "@/lib/utils";
import { fetchResumes } from "@/lib/actions/resumes.action";
import { timeAgo } from "@/app/utils/FormattingFunctions";
import { CreateResumeButton } from "../UIButtons/CreateResume";

interface DashBoardProps {
  email: string;
}
const DashBoard: FC<DashBoardProps> = async ({ email }) => {
  const resumes = await fetchResumes();

  return (
    <>
      <div className="relative w-[90%]">
        <div className="flex flex-wrap space-x-4 pb-4 text-wrap">
          {/* <ResumeCard
            key="default"
            album={defaultResume}
            className="w-[200px]"
            aspectRatio="portrait"
            width={200}
            height={265}
          /> */}
          <div className={cn("space-y-3 w-[200px] ml-4")}>
            <CreateResumeButton email={email} />

            <div className="flex justify-left text-sm">
              <h3 className="font-medium leading-none">Create Resume</h3>
            </div>
          </div>
          {resumes.map((resume) => (
            <ResumeCard
              key={resume._id}
              resumeName={resume.resumeName}
              resumeId={resume._id}
              email={resume.email}
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

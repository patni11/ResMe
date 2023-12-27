"use client";
import { Button } from "../ui/button";
import { Sparkles } from "lucide-react";
import { generateCoverLetter } from "@/lib/actions/openai.action";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import LoadingSpinner from "../LoadingSpinner";
import { updateUserAICalls } from "@/lib/actions/user.actions";
import { absoluteUrl } from "@/lib/utils";
import {
  fetchAllData,
  fetchCoverLetterResumeData,
  fetchResume,
} from "@/lib/actions/resumes.action";
//import { ComingSoon } from "./ComingSoon";

export const AICLHelper = ({
  jobDescription,
  resumeId,
  setMessage,
}: {
  jobDescription: string;
  resumeId: string;
  setMessage: (message: string) => void;
}) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  // return (
  //   <ComingSoon>
  //     <div
  //       className={buttonVariants({
  //         variant: "outline",
  //         size: "icon",
  //         className:
  //           " text-violet-600  hover:bg-violet-600 hover:text-primary-foreground bg-transparent",
  //       })}
  //     >
  //       <Sparkles className="w-4 h-4" />
  //     </div>
  //   </ComingSoon>
  // );

  const handleButtonClick = async () => {
    setIsLoading(true);
    try {
      const timeout = setTimeout(() => {
        toast({
          title: "This is taking longer than expected...",
        });
      }, 12000);

      if (jobDescription.length < 100) {
        toast({
          title:
            "Please provide more job description for us to create better cover letter",
          variant: "destructive",
        });
        return;
      }

      let resumeData = "";
      //get resume data
      if (resumeId === "default") {
        resumeData = await fetchAllData();
      } else {
        resumeData = await fetchCoverLetterResumeData(resumeId);
      }

      if (resumeData.length < 100) {
        toast({
          title:
            "Please enter more data about education, projects, skills etc for us to create better cover letter",
          variant: "destructive",
        });
        return;
      }

      const response = await generateCoverLetter(jobDescription, resumeData);
      if (response.code === "error") {
        toast({
          title: response.message,
        });
        setIsLoading(false);
        return;
      }

      if (response.code === "limitExceeded") {
        toast({
          title: response.message,
          description: (
            <Button
              variant="outline"
              className="w-full border border-violet-600 font-semibold text-violet-600 hover:bg-violet-600 hover:text-white"
              onClick={() => {
                window.location.href = absoluteUrl("/pricing");
              }}
            >
              Upgrade
            </Button>
          ),
        });

        setIsLoading(false);
        return;
      }
      await updateUserAICalls(3);

      const cleanedString = response.message.replace(/ *- */g, "");
      setMessage(cleanedString);

      clearTimeout(timeout);
    } catch (e) {
      console.log("AI Cover Letter Error", e);
      toast({
        title: "There was some error, please try again",
        variant: "destructive",
      });
    }

    setIsLoading(false);
  };

  return (
    <Button
      onClick={handleButtonClick}
      type="button"
      variant="outline"
      size="icon"
      disabled={isLoading}
      className=" text-violet-600  hover:bg-violet-600 hover:text-primary-foreground bg-transparent"
    >
      {isLoading ? <LoadingSpinner /> : <Sparkles className="w-4 h-4" />}
    </Button>
  );
};

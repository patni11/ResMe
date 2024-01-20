"use client";
import { Button } from "../ui/button";
import { Sparkles } from "lucide-react";
import { generateCoverLetter } from "@/lib/actions/openai.action";
import { useToast } from "@/components/ui/use-toast";
import { useEffect, useState } from "react";
import LoadingSpinner from "../LoadingSpinner";
import { updateUserAICalls } from "@/lib/actions/user.actions";
import { absoluteUrl } from "@/lib/utils";
import plane from "@/public/coverLetter/plane.gif";
import loading from "@/public/coverLetter/loading.gif";
import donut from "@/public/coverLetter/donut.gif";
import writing from "@/public/coverLetter/writing.gif";

import {
  fetchAllData,
  fetchCoverLetterResumeData,
} from "@/lib/actions/resumes.action";
import Image from "next/image";
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
  async function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

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
        setIsLoading(false);
        return;
      }

      let resumeData = "";
      //get resume data
      try {
        if (resumeId === "default") {
          resumeData = await fetchAllData();
        } else {
          console.log("Resume ID", resumeId);
          resumeData = await fetchCoverLetterResumeData(resumeId);
        }
      } catch (e) {
        toast({
          title: "There was an error getting your data, please try again",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      if (resumeData.length < 100) {
        toast({
          title:
            "Please enter more data about education, projects, skills etc for us to create better cover letter",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      const response = await generateCoverLetter(jobDescription, resumeData);
      if (response.code === "error") {
        toast({
          title: response.message,
        });
        console.log("AI Cover Letter Error:", response);
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

      // const response =
      //   "Dear Hiring Manager,\n\nI am writing to express my interest in the software engineer position on the R&D Infrastructure Team at SPAN. With my experience and skills, I am confident in my ability to contribute to the development of mission-critical internal platforms to support experimental and test efforts.\n\nHaving worked as a Full Stack Developer at Giaaka, I honed my skills in Next.js, MongoDB, and AWS while leading a team of engineers to build a staking service. Moreover, as a Researcher at DAO Maker and Phemex, I developed extensive knowledge of tokenomics, investment strategies, and relevant web3 events. ";

      const modifiedText = response.message
        .split("\n")
        .map((line, index, array) =>
          index === array.length - 1 ? line : `${line}<br />&nbsp;`
        )
        .join("");

      setMessage(modifiedText);

      setIsLoading(false);
      clearTimeout(timeout);
    } catch (e) {
      console.log("AI Cover Letter Error", e);
      toast({
        title: "There was some error, please try again",
        variant: "destructive",
      });
    }
  };

  const images = [plane, writing, donut, loading];
  const comments = [
    "Gathering Data...",
    "Writing...",
    "Optimizing...",
    "Almost There...",
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      // Increment the image index, and loop back to the first image if it exceeds the array length
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 6000);

    // Clear the interval when the component unmounts
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {" "}
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
      {isLoading ? (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 bg-black h-screen w-screen">
          <div className="bg-white p-4 rounded-md text-center">
            <div
              className="relative aspect-w-21 aspect-h-9 h-auto"
              style={{ minWidth: "480px" }}
            >
              <Image
                src={images[currentImageIndex]}
                alt="Background GIF"
                style={{ width: "full", height: "full" }}
                className="relative object-cover rounded-md w-full height-full"
              />

              <p className="absolute inset-0 flex items-center justify-center z-2 font-bold text-white opacity-75 text-4xl">
                {comments[currentImageIndex]}
              </p>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

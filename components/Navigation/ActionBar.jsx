"use client";
import { buttonVariants } from "@/components/ui/button";
import { useState } from "react";
import { UploadCloud, File } from "lucide-react";
import {
  fixCertificateFormat,
  fixEducationFormat,
  fixProjectFormat,
  fixExperienceFormat,
  fixHeaderInfo,
  fixTalent,
} from "@/app/utils/FormattingFunctions";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { updateResume } from "@/lib/actions/resumes.action";
import { saveAs } from "file-saver";
import { Packer } from "docx";
import DocumentCreator from "@/components/ResumeComponents/ResumeDocsFormatter/generateDocx";
import { useResumeDataContext } from "@/app/(mainApp)/buildResume/ResumeDataContext";
//import { ComingSoon } from "../Cards/ComingSoon";
//import { saveLocally } from "./storeLocally";
import { useToast } from "@/components/ui/use-toast";
import * as gtag from "@/lib/gtag";

const ActionBar = ({ componentsData, children }) => {
  const [isSaving, setIsSaving] = useState(false);
  //const [isDownloading, setIsDownloading] = useState(false);
  const { toast } = useToast();
  const { email, name, isSubscribed, resumeId } = useResumeDataContext();
  //const router = useRouter();

  const downloadDocx = async () => {
    try {
      const doc = DocumentCreator({ componentsData, resumeId, email });

      await Packer.toBlob(doc).then((blob) => {
        saveAs(blob, `${name}_resume.docx`);
      });
      toast({
        title: "Downloaded Docx 🥳",
      });
    } catch (e) {
      toast({
        title: "Sorry could not download Docx, contact support",
      });
      console.log("Error downloading docx", e);
    }
  };
  // function fixExperience(rawExperiences) {
  //   const formattedExperiences = rawExperiences.map((exp) => {
  //     let endDate = exp.endDate;

  //     // Check if endDate is a string and not 'working', then parse it as a Date.
  //     if (typeof endDate === "string" && endDate !== "working") {
  //       endDate = new Date(endDate);
  //     }

  //     return {
  //       ...exp,
  //       endDate: endDate,
  //     };
  //   });
  //   return formattedExperiences;
  // }

  // function fixStructure(arrayOfObjects) {
  //   arrayOfObjects = arrayOfObjects.map(
  //     ({ _id, __v, email, createdAt, updatedAt, ...rest }) => rest
  //   );
  //   return arrayOfObjects;
  // }

  const handleSave = async () => {
    gtag.event({
      clientWindow: window,
      action: "Save",
      category: "Download",
      label: "Save",
    });
    try {
      const resumeHeader = localStorage.getItem(
        `resumeHeader-${email}-${resumeId}`
      );

      const processedHeader = fixHeaderInfo(JSON.parse(resumeHeader)["state"]);

      const educations = localStorage.getItem(
        `educations-${email}-${resumeId}`
      );
      const processedEducation = fixEducationFormat(
        JSON.parse(educations)["state"]
      );

      const certificates = localStorage.getItem(
        `certificates-${email}-${resumeId}`
      );
      const processedCertificates = fixCertificateFormat(
        JSON.parse(certificates)["state"]
      );

      const experiences = localStorage.getItem(
        `experiences-${email}-${resumeId}`
      );
      const processedExperiences = fixExperienceFormat(
        JSON.parse(experiences)["state"]
      );

      const projects = localStorage.getItem(`projects-${email}-${resumeId}`);
      const processedProjects = fixProjectFormat(JSON.parse(projects)["state"]);

      const talents = localStorage.getItem(`talents-${email}-${resumeId}`);
      const processedTalents = fixTalent(JSON.parse(talents)["state"]);

      const res = await updateResume({
        email: email,
        resumeId: resumeId,
        skills: processedTalents.skills,
        languages: processedTalents.languages,
        interests: processedTalents.interests,
        educations: processedEducation,
        certificates: processedCertificates,
        experiences: processedExperiences,
        projects: processedProjects,
        headerInfo: processedHeader,
      });

      if (res.isSuccess) {
        toast({
          title: `Resume Updated 🥳`,
        });
      } else {
        console.log(res);
        const error = res.error;
        toast({
          title: `Could Not Update: ${error} `,
        });
      }
    } catch (e) {
      toast({
        title:
          "Sorry could not Save at this time, try again later or contact support",
      });
      console.log("Error saving resume", e);
    }

    setIsSaving(false);
  };

  return (
    <div className="relative w-[80%] flex justify-center items-cetner space-x-2 py-1.5 mb-2 items-center bg-secondary rounded-full">
      <TooltipProvider>
        <Tooltip delayDuration={300}>
          <TooltipTrigger className="cursor-default ml-1.5">
            <div
              className={buttonVariants({
                variant: "outlineHover",
                size: "xs",
                className: "flex space-x-2",
              })}
              onClick={async () => {
                setIsSaving(true);
                await handleSave();
                setIsSaving(false);
              }}
              disabled={isSaving}
            >
              <UploadCloud className="w-4 h-4" />
              <span className="hidden md:block">Save</span>
            </div>
          </TooltipTrigger>
          <TooltipContent className="p-2 text-xs font-normal">
            Save Data
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip delayDuration={300}>
          <TooltipTrigger className="cursor-default ml-1.5">
            {/* <ComingSoon> */}
            <div
              className={buttonVariants({
                variant: "outlineHover",
                size: "xs",
                className: "flex space-x-2",
              })}
              onClick={async () => {
                setIsSaving(true);
                gtag.event({
                  clientWindow: window,
                  action: "Download Docx",
                  category: "Download",
                  label: "Download Docx",
                });

                if (isSubscribed) {
                  await downloadDocx();
                } else {
                  toast({
                    title: "Please upgrade to use this feature",
                  });
                }
                await downloadDocx();

                setIsSaving(false);
              }}
              disabled={isSaving}
            >
              <File className="w-4 h-4" />

              <span>Docx</span>
            </div>
            {/* </ComingSoon> */}
          </TooltipTrigger>
          <TooltipContent className="p-2 text-xs font-normal">
            Download microsoft docx file
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {children}
    </div>
  );
};

export default ActionBar;

"use client";
import { buttonVariants } from "@/components/ui/button";
import { useState } from "react";
import { SaveIcon, File } from "lucide-react";
import {
  fixCertificateFormat,
  fixEducationFormat,
  fixProjectFormat,
  fixExperienceFormat,
  fixHeaderInfo,
  fixTalent,
} from "@/app/utils/FormattingFunctions";
import { updateResume } from "@/lib/actions/resumes.action";
//import { saveAs } from "file-saver";
//import { Packer } from "docx";
//import DocumentCreator from "@/components/ResumeComponents/ResumeDocsFormatter/generateDocx";
// import { PDFViewer } from "@react-pdf/renderer";
// import Document from "@/components/ResumeComponents/ReactPDF/index";
import { ComingSoon } from "@/components/Cards/ComingSoon";
//import { saveLocally } from "./storeLocally";
import { useToast } from "@/components/ui/use-toast";
import * as gtag from "@/lib/gtag";

const ActionBar = ({ resumeId, email, children }) => {
  const [isSaving, setIsSaving] = useState(false);
  //const [isDownloading, setIsDownloading] = useState(false);
  const { toast } = useToast();
  //const router = useRouter();

  // const downloadDocx = () => {
  //   gtag.event({
  //     clientWindow: window,
  //     action: "Download Docx",
  //     category: "Download",
  //     label: "Download Docx",
  //   });

  //   const doc = DocumentCreator({ componentsData, resumeId, email });

  //   Packer.toBlob(doc).then((blob) => {
  //     console.log(blob);
  //     saveAs(blob, "resume.docx");
  //     console.log("Document created successfully");
  //   });
  // };
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

    const resumeHeader = localStorage.getItem(
      `resumeHeader-${email}-${resumeId}`
    );
    console.log("header", `resumeHeader-${email}-${resumeId}`, resumeHeader);
    const processedHeader = fixHeaderInfo(JSON.parse(resumeHeader)["state"]);

    const educations = localStorage.getItem(`educations-${email}-${resumeId}`);
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
    setIsSaving(false);
  };

  return (
    <div className="relative w-[80%] flex justify-center items-cetner space-x-2 py-1.5 mb-2 items-center bg-secondary rounded-full">
      <div
        className={buttonVariants({
          variant: "outlineHover",
          size: "xs",
          className: "flex space-x-2",
        })}
        onClick={() => {
          setIsSaving(true);
          handleSave();
        }}
        disabled={isSaving}
      >
        <SaveIcon className="w-4 h-4" />
        <span className="hidden md:block">Save</span>
      </div>
      <ComingSoon>
        <div
          className={buttonVariants({
            variant: "outlineHover",
            size: "xs",
            className: "flex space-x-2",
          })}
          onClick={() => {
            gtag.event({
              clientWindow: window,
              action: "Download Docx",
              category: "Download",
              label: "Download Docx",
            });
            // setIsSaving(true);
            // downloadDocx();
          }}
          disabled={isSaving}
        >
          <File className="w-4 h-4" />

          <span>Docx</span>
        </div>
      </ComingSoon>

      {children}
    </div>
  );
};

export default ActionBar;

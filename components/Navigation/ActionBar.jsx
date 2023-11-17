"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import { useState } from "react";
import { SaveIcon, ArrowUpRightSquare, File } from "lucide-react";

import { saveAs } from "file-saver";
import { Packer } from "docx";
import DocumentCreator from "@/components/ResumeComponents/ResumeDocsFormatter/generateDocx";
// import { PDFViewer } from "@react-pdf/renderer";
// import Document from "@/components/ResumeComponents/ReactPDF/index";
const { v4: uuidv4 } = require("uuid");
import { ComingSoon } from "@/components/Cards/ComingSoon";
//import { saveLocally } from "./storeLocally";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

import { createResume, updateResume } from "@/lib/actions/resumes.action";
import * as gtag from "@/lib/gtag";

const ActionBar = ({ componentsData, resumeId, email, children }) => {
  const [isSaving, setIsSaving] = useState(false);
  //const [isDownloading, setIsDownloading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const downloadDocx = () => {
    gtag.event({
      clientWindow: window,
      action: "Download Docx",
      category: "Download",
      label: "Download Docx",
    });

    const doc = DocumentCreator({ componentsData, resumeId, email });

    Packer.toBlob(doc).then((blob) => {
      console.log(blob);
      saveAs(blob, "resume.docx");
      console.log("Document created successfully");
    });
  };
  function fixExperience(rawExperiences) {
    const formattedExperiences = rawExperiences.map((exp) => {
      let endDate = exp.endDate;

      // Check if endDate is a string and not 'working', then parse it as a Date.
      if (typeof endDate === "string" && endDate !== "working") {
        endDate = new Date(endDate);
      }

      return {
        ...exp,
        endDate: endDate,
      };
    });
    return formattedExperiences;
  }

  function fixStructure(arrayOfObjects) {
    arrayOfObjects = arrayOfObjects.map(
      ({ _id, __v, email, createdAt, updatedAt, ...rest }) => rest
    );
    return arrayOfObjects;
  }

  const handleSave = async () => {
    gtag.event({
      clientWindow: window,
      action: "Save",
      category: "Download",
      label: "Save",
    });

    const certificates = localStorage.getItem(
      `certificates-${email}-${resumeId}`
    );
    const resumeHeader = localStorage.getItem(
      `resumeHeader-${email}-${resumeId}`
    );

    const educations = localStorage.getItem(`educations-${email}-${resumeId}`);

    const experiences = localStorage.getItem(
      `experiences-${email}-${resumeId}`
    );

    const projects = localStorage.getItem(`projects-${email}-${resumeId}`);

    const talents = localStorage.getItem(`talents-${email}-${resumeId}`);

    const processedCertificates = fixStructure(
      JSON.parse(certificates)["state"]["certificates"]
    );
    const processedEducation = fixStructure(
      JSON.parse(educations)["state"]["educations"]
    );
    const processedProjects = fixStructure(
      JSON.parse(projects)["state"]["projects"]
    );
    const processedHeader = JSON.parse(resumeHeader)["state"]["headerInfo"];
    delete processedHeader._id;
    delete processedHeader.__v;
    const processedExperiences = fixStructure(
      fixExperience(JSON.parse(experiences)["state"]["experiences"])
    );

    if (resumeId === "default") {
      const newResumeId = uuidv4();

      //saveLocally(newResumeId);
      // add code to save to DB
      // show a toast
      const res = await createResume({
        email: email,
        resumeId: newResumeId,
        resumeName: "New Resume",
        skills: JSON.parse(talents)["state"]["skills"],
        languages: JSON.parse(talents)["state"]["languages"],
        interests: JSON.parse(talents)["state"]["interests"],
        educations: processedEducation,
        certificates: processedCertificates,
        experiences: processedExperiences,
        projects: processedProjects,
        headerInfo: processedHeader,
      });

      if (res.isSuccess) {
        localStorage.setItem(
          `certificates-${email}-${newResumeId}`,
          certificates
        );

        localStorage.setItem(
          `resumeHeader-${email}-${newResumeId}`,
          resumeHeader
        );

        localStorage.setItem(`educations-${email}-${newResumeId}`, educations);

        localStorage.setItem(
          `experiences-${email}-${newResumeId}`,
          experiences
        );

        localStorage.setItem(`projects-${email}-${newResumeId}`, projects);

        localStorage.setItem(`talents-${email}-${newResumeId}`, talents);

        toast({
          title: `Saved a new Resume 🥳`,
        });

        setTimeout(() => {
          router.push(`/buildResume/${newResumeId}`);
        }, 1000);
      } else {
        console.log(res);
        const error = res.error;
        toast({
          title: `Failed: ${error} `,
        });
      }
      setIsSaving(false);
    } else {
      const res = await updateResume({
        email: email,
        resumeId: resumeId,
        skills: JSON.parse(talents)["state"]["skills"],
        languages: JSON.parse(talents)["state"]["languages"],
        interests: JSON.parse(talents)["state"]["interests"],
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
    }
  };

  return (
    <div className="w-full flex justify-right space-x-4 mb-2 items-center">
      <div
        className={buttonVariants({
          variant: "default",
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

      <div
        className={buttonVariants({
          variant: "default",
          className: "flex space-x-2",
        })}
        onClick={() => {
          gtag.event({
            clientWindow: window,
            action: "Download Docx",
            category: "Download",
            label: "Download Docx",
          });
          setIsSaving(true);
          downloadDocx();
        }}
        disabled={isSaving}
      >
        <File className="w-4 h-4" />

        <span>Docx</span>
      </div>

      <ComingSoon>
        <div
          className={buttonVariants({
            variant: "default",
            className: "flex space-x-2",
          })}
          onClick={() => {
            gtag.event({
              clientWindow: window,
              action: "Share Link",
              category: "Download",
              label: "Share Link",
            });
          }}
        >
          <ArrowUpRightSquare className="w-4 h-4" />

          <span>Copy</span>
        </div>
      </ComingSoon>
      {children}
    </div>
  );
};

export default ActionBar;

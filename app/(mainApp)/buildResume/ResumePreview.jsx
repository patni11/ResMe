"use client";
import { PremiumDialog } from "@/components/Cards/UpgradeToPremium";
import ResumeHeader from "@/components/ResumeComponents/ResumeEditor/ResumeHeader";
import EducationSection from "@/components/ResumeComponents/ResumeEditor/EducationSection";
import ExperienceSection from "@/components/ResumeComponents/ResumeEditor/ExperienceSection";
import CertificateSection from "@/components/ResumeComponents/ResumeEditor/CertificateSections";
import TalentSection from "@/components/ResumeComponents/ResumeEditor/TalentSection";
import ProjectSection from "@/components/ResumeComponents/ResumeEditor/ProjectSection";
import { Button, buttonVariants } from "@/components/ui/button";
import html2pdf from "html2pdf.js";
import { useRef, useState } from "react";
import { SaveIcon, Download } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { saveAs } from "file-saver";
import { Packer } from "docx";
import DocumentCreator from "@/components/ResumeComponents/ResumeDocsFormatter/generateDocx";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Link from "next/link";
// import { PDFViewer } from "@react-pdf/renderer";
// import Document from "@/components/ResumeComponents/ReactPDF/index";
const { v4: uuidv4 } = require("uuid");

import "./style/resumePreview.css";
//import { saveLocally } from "./storeLocally";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { createResume, updateResume } from "@/lib/actions/resumes.action";

export default function ResumePreview({
  resumeId = "default",
  email = "",
  componentsData,
}) {
  const elementRef = useRef(null);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const downloadPDF = () => {
    var element = document.getElementById("element-to-print");
    var opt = {
      margin: 0.5,
      filename: "resume.pdf",
      html2canvas: { scale: 2, windowWidth: 694 },
      pagebreak: { mode: ["avoid-all"] },
      jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
    };
    html2pdf().set(opt).from(element).save();
  };

  const downloadDocx = () => {
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
          title: `Resume Updated: ${resumeId} `,
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

  const renderComponent = (componentData) => {
    switch (componentData.type) {
      case "ResumeHeader":
        return (
          <ResumeHeader resumeHeaderID={`resumeHeader-${email}-${resumeId}`} />
        );
      case "EducationSectionCard":
        return (
          <EducationSection educationID={`educations-${email}-${resumeId}`} />
        );
      case "CertificateSectionCard":
        return (
          <CertificateSection
            certificateID={`certificates-${email}-${resumeId}`}
          />
        );
      case "ExperienceSectionCard":
        return (
          <ExperienceSection
            experienceID={`experiences-${email}-${resumeId}`}
          />
        );
      case "ProjectSectionCard":
        return <ProjectSection projectId={`projects-${email}-${resumeId}`} />;
      case "TalentsSection":
        return <TalentSection talentsID={`talents-${email}-${resumeId}`} />;
      // ... other cases for other components
      default:
        return null;
    }
  };

  return (
    <main className="sticky top-0 w-full h-full flex flex-col justify-center bg-gray-200 p-4">
      <div className="w-full flex justify-right space-x-4 mb-2">
        <Button
          className="w-24 flex space-x-2"
          onClick={() => {
            setIsSaving(true);
            handleSave();
          }}
          disabled={isSaving}
        >
          <span className="hidden md:block">Save</span>
          <SaveIcon className="w-5 h-5" />
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger
            className={buttonVariants({
              variant: "default",
              className: "w-24 flex space-x-2",
            })}
          >
            <span className="hidden md:block">Download</span>
            <Download className="w-5 h-5" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem asChild>
              <button onClick={downloadDocx} className="">
                Docx
              </button>
              {/* <Dialog>
                <DialogTrigger className="px-2 py-1.5 text-sm  transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
                  <span>Docx</span>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle className="flex w-full justify-center">
                      Coming Soon! 😄
                    </DialogTitle>
                    <DialogDescription className="flex flex-col space-y-4 items-center">
                      <span>
                        We are currently working on it, Follow us to stay
                        updated!
                      </span>
                      <Link
                        href="https://twitter.com/resmexyz"
                        className={`${buttonVariants({
                          variant: "outline",
                        })}`}
                      >
                        Follow
                      </Link>
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog> */}
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <button onClick={downloadPDF} className="">
                PDF
              </button>
            </DropdownMenuItem>

            <DropdownMenuItem asChild>
              <PremiumDialog>
                <button className="">Share Link</button>
              </PremiumDialog>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* <PDFViewer style={{ flex: 1 }}>
        <Document />
      </PDFViewer> */}
      {/* style={{ width: "595px" }} */}
      <div
        className="relative bg-white w-full h-full"
        style={{ padding: "3rem", width: 694, height: 981 }}
      >
        <div
          className="relative bg-white mx-auto h-full overflow-y-auto font-serif leading-tight text-center align-middle"
          id="element-to-print"
          ref={elementRef}
        >
          {componentsData.map((componentData) => (
            <div key={componentData.id} className="w-full">
              {renderComponent(componentData)}
            </div>
          ))}

          {/* <ResumeHeader resumeHeaderID={`resumeHeader-${email}-${resumeId}`} />
          <EducationSection educationID={`educations-${email}-${resumeId}`} />
          <CertificateSection
            certificateID={`certificates-${email}-${resumeId}`}
          />
          <ExperienceSection
            experienceID={`experiences-${email}-${resumeId}`}
          />
          <ProjectSection projectId={`projects-${email}-${resumeId}`} />
          <TalentSection talentsID={`talents-${email}-${resumeId}`} /> */}
        </div>
      </div>
    </main>
  );
}

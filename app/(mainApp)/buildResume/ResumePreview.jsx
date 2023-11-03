"use client";

import ResumeHeader from "@/components/ResumeComponents/ResumeEditor/ResumeHeader";
import EducationSection from "@/components/ResumeComponents/ResumeEditor/EducationSection";
import ExperienceSection from "@/components/ResumeComponents/ResumeEditor/ExperienceSection";
import CertificateSection from "@/components/ResumeComponents/ResumeEditor/CertificateSections";
import TalentSection from "@/components/ResumeComponents/ResumeEditor/TalentSection";
import ProjectSection from "@/components/ResumeComponents/ResumeEditor/ProjectSection";
import { Button, buttonVariants } from "@/components/ui/button";
import html2pdf from "html2pdf.js";
import { useRef } from "react";
import { SaveIcon, Download } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
//import { saveAs } from "file-saver";
//import { Packer } from "docx";
//import DocumentCreator from "@/components/ResumeComponents/ResumeDocsFormatter/generateDocx";
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
import { createResume } from "@/lib/actions/resumes.action";

export default function ResumePreview({ resumeId = "default", email = "" }) {
  const elementRef = useRef(null);
  const { toast } = useToast();
  const router = useRouter();
  const downloadPDF = () => {
    var element = document.getElementById("element-to-print");
    var opt = {
      margin: 0.5,
      filename: "resume.pdf",
      html2canvas: { scale: 2 },
      pagebreak: { mode: ["avoid-all"] },
      jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
    };
    html2pdf().set(opt).from(element).save();
  };

  // const downloadDocx = () => {
  //   const doc = DocumentCreator();

  //   Packer.toBlob(doc).then((blob) => {
  //     console.log(blob);
  //     saveAs(blob, "resume.docx");
  //     console.log("Document created successfully");
  //   });
  // };

  const handleSave = async () => {
    if (resumeId === "default") {
      const newResumeId = uuidv4();
      //saveLocally(newResumeId);
      // add code to save to DB
      // show a toast
      const certificates = localStorage.getItem(
        `certificates-${email}-${resumeId}`
      );
      const resumeHeader = localStorage.getItem(
        `resumeHeader-${email}-${resumeId}`
      );

      const educations = localStorage.getItem(
        `educations-${email}-${resumeId}`
      );

      const experiences = localStorage.getItem(
        `experiences-${email}-${resumeId}`
      );

      const projects = localStorage.getItem(`projects-${email}-${resumeId}`);

      const talents = localStorage.getItem(`talents-${email}-${resumeId}`);

      // const processedProjects = JSON.parse(projects)["state"]["projects"]
      // const processedExperiences = JSON.parse(experiences)["state"]["experiences"]
      console.log(JSON.parse(experiences)["state"]["experiences"]);

      const res = await createResume({
        email: email,
        resumeId: newResumeId,
        resumeName: "New Resume",
        skills: JSON.parse(talents)["state"]["skills"],
        languages: JSON.parse(talents)["state"]["languages"],
        interests: JSON.parse(talents)["state"]["interests"],
        educations: JSON.parse(educations)["state"]["educations"],
        certificates: JSON.parse(certificates)["state"]["certificates"],
        experiences: JSON.parse(experiences)["state"]["experiences"],
        //projects: JSON.parse(projects)["state"]["projects"],
        headerInfo: JSON.parse(resumeHeader)["state"]["headerInfo"],
      });

      if (res.isSuccess) {
        // localStorage.setItem(
        //   `certificates-${email}-${newResumeId}`,
        //   certificates
        // );

        // localStorage.setItem(
        //   `resumeHeader-${email}-${newResumeId}`,
        //   resumeHeader
        // );

        // localStorage.setItem(`educations-${email}-${newResumeId}`, educations);

        // localStorage.setItem(
        //   `experiences-${email}-${newResumeId}`,
        //   experiences
        // );

        // localStorage.setItem(`projects-${email}-${newResumeId}`, projects);

        // localStorage.setItem(`talents-${email}-${newResumeId}`, talents);

        toast({
          title: `Saved a new Resume 🥳: ${newResumeId} `,
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

      // save to DB

      // if successful, save to new local Storage, // redirect to /resumeId
    } else {
      toast({
        title: `Not New Resume 🥳: ${newResumeId} `,
      });
    }
  };

  return (
    <main className="sticky top-0 w-full h-full flex flex-col justify-center bg-gray-200 p-4">
      <div className="flex justify-left space-x-4 mb-2">
        <Button className="w-24 flex space-x-2" onClick={() => handleSave()}>
          <span className="hidden md:block">Save</span>
          <SaveIcon className="w-5 h-5" />
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button className="w-24 flex space-x-2">
              <span className="hidden md:block">Download</span>
              <Download className="w-5 h-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem asChild>
              <Dialog>
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
              </Dialog>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <button
                onClick={downloadPDF}
                className="hover:text-destructive hover:text-semibold w-full cursor-pointer"
              >
                PDF
              </button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* <PDFViewer style={{ flex: 1 }}>
        <Document />
      </PDFViewer> */}
      {/* style={{ width: "595px" }} */}
      <div className="px-12 py-12 relative bg-white w-full h-full">
        <div
          className="relative bg-white mx-auto h-full overflow-y-auto font-serif leading-tight text-center align-middle"
          id="element-to-print"
          ref={elementRef}
        >
          <ResumeHeader resumeHeaderID={`resumeHeader-${email}-${resumeId}`} />
          <EducationSection educationID={`educations-${email}-${resumeId}`} />
          <CertificateSection
            certificateID={`certificates-${email}-${resumeId}`}
          />
          <ExperienceSection
            experienceID={`experiences-${email}-${resumeId}`}
          />
          <ProjectSection projectId={`projects-${email}-${resumeId}`} />
          <TalentSection talentsID={`talents-${email}-${resumeId}`} />
        </div>
      </div>
    </main>
  );
}

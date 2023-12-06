"use client";
import { FC } from "react";

import EducationSectionCard from "@/components/ResumeComponents/ResumeForms/EducationSectionCard";
import { buttonVariants } from "@/components/ui/button";
import {
  ArrowUpRightSquare,
  Download,
  Eye,
  File,
  RefreshCw,
  UploadCloud,
  Trash2,
  ArrowLeft,
} from "lucide-react";
import ExperienceSectionCard from "@/components/ResumeComponents/ResumeForms/ExperienceSectionCard";
import ResumeHeader from "@/components/ResumeComponents/ResumeForms/ResumeHeader";
import ProjectSectionCard from "@/components/ResumeComponents/ResumeForms/ProjectsSection";
import TalentsSection from "@/components/ResumeComponents/ResumeForms/Miscellaneous/index";
import CertificateSectionCard from "@/components/ResumeComponents/ResumeForms/CertificateSectionCard";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React from "react";
//import { Label } from "@/components/ui/label";
//import { RenameDialog } from "@/components/Dashboard/ResumeFuncitonButtons";

interface EditPanelProps {
  componentsData: { type: string; id: string }[];
  moveUp: (index: number) => void;
  moveDown: (index: number) => void;
}

const EditPanel: FC<EditPanelProps> = ({
  componentsData,
  moveUp,
  moveDown,
}) => {
  const renderComponent = (
    componentData: { type: string; id: string },
    index: number
  ) => {
    switch (componentData.type) {
      case "ResumeHeader":
        return (
          <ResumeHeader
            resumeHeaderID={componentData.id}
            index={index}
            moveUp={moveUp}
            moveDown={moveDown}
          />
        );
      case "EducationSectionCard":
        return (
          <EducationSectionCard
            educationID={componentData.id}
            index={index}
            moveUp={moveUp}
            moveDown={moveDown}
          />
        );
      case "CertificateSectionCard":
        return (
          <CertificateSectionCard
            certificateID={componentData.id}
            index={index}
            moveUp={moveUp}
            moveDown={moveDown}
          />
        );
      case "ExperienceSectionCard":
        return (
          <ExperienceSectionCard
            experienceID={componentData.id}
            index={index}
            moveUp={moveUp}
            moveDown={moveDown}
          />
        );
      case "ProjectSectionCard":
        return (
          <ProjectSectionCard
            projectId={componentData.id}
            index={index}
            moveUp={moveUp}
            moveDown={moveDown}
          />
        );
      case "TalentsSection":
        return (
          <TalentsSection
            talentsID={componentData.id}
            index={index}
            moveUp={moveUp}
            moveDown={moveDown}
          />
        );
      // ... other cases for other components
      default:
        return null;
    }
  };

  return (
    <main className="w-full h-screen overflow-y-auto flex flex-col items-start bg-gray-200 p-4 space-y-2">
      <div className="flex space-x-2 w-full justify-between">
        <span
          className={buttonVariants({
            variant: "outline",
            size: "xs",
            className: "ml-8 text-xs",
          })}
        >
          <ArrowLeft className="w-3 h-3" /> Close sidebar for better view
        </span>
        <Dialog>
          <DialogTrigger className="">
            <span
              className={buttonVariants({
                variant: "outline",
              })}
            >
              How It Works
            </span>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-center mb-4 text-xl font-semibold">
                How ResMe Works
              </DialogTitle>
              <div className="flex flex-col space-y-8 items-center">
                <ul className="flex flex-col space-y-8 mb-4">
                  <li className="flex flex-col space-y-1">
                    <h3 className="text-lg text-primary">
                      Step1: Enter your details for each section in sidebar
                    </h3>
                    <p>
                      This will become your default values which will be
                      available on every resume automatically
                    </p>
                  </li>
                  <li className="flex flex-col space-y-1">
                    <h3 className="text-lg text-primary">
                      Step2: Customize your resume
                    </h3>
                    <p className="flex flex-col space-y-1">
                      <span>
                        Choose which projects, experiences, and skills you want
                        to highlight in the resume. Use -
                      </span>
                      <span className="flex space-x-2">
                        <Trash2 className="w-5 h-5 mr-2" />
                        icon to delete bullet points
                      </span>
                      <span className="flex space-x-2">
                        <Eye className="h-5 w-5 mr-2" /> to hide values &
                        sections
                      </span>
                    </p>
                  </li>

                  <li className="flex flex-col space-y-1">
                    <h3 className="text-lg text-primary">
                      Step3: Save, Download, and Share!
                    </h3>
                    <p className="flex flex-col space-y-1">
                      <span className="flex space-x-2">
                        <UploadCloud className="w-5 h-5 mr-2" />
                        save to cloud
                      </span>

                      <span className="flex space-x-2">
                        <Download className="w-5 h-5 mr-2" />
                        to download in Pdf
                      </span>

                      <span className="flex space-x-2">
                        <File className="w-5 h-5 mr-2" />
                        to download Docx file
                      </span>

                      <span className="flex space-x-2">
                        <ArrowUpRightSquare className="w-5 h-5 mr-2" />
                        to share live link
                      </span>
                    </p>
                  </li>

                  <li className="flex flex-col space-y-1">
                    <h3 className="text-lg text-primary">Load Data</h3>
                    <p className="flex flex-col space-y-1">
                      <span>
                        You can reload the saved data for this resume or load
                        the default data you entered in each section
                      </span>
                      <span className="flex space-x-2">
                        click &quot;Reset&quot; to load default data
                      </span>

                      <span className="flex space-x-2">
                        <RefreshCw className="w-5 h-5 mr-2" /> to load resume
                        data
                      </span>
                    </p>
                  </li>
                </ul>
              </div>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>

      {componentsData.map((componentData, index) => (
        <div key={componentData.id} className="w-full">
          {renderComponent(componentData, index)}
        </div>
      ))}
    </main>
  );
};

export default EditPanel;

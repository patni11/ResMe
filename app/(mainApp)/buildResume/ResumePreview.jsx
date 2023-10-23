"use client";

import ResumeHeader from "@/components/ResumeComponents/ResumeEditor/ResumeHeader";
import EducationSection from "@/components/ResumeComponents/ResumeEditor/EducationSection";
import ExperienceSection from "@/components/ResumeComponents/ResumeEditor/ExperienceSection";
import { Button } from "@/components/ui/button";
import html2pdf from "html2pdf.js";
import { useRef } from "react";
import { SaveIcon, Download } from "lucide-react";

export default function ResumePreview() {
  const elementRef = useRef(null);
  const handleExport = () => {
    var element = document.getElementById("element-to-print");
    html2pdf().from(element).save();
  };

  return (
    <main className=" w-full h-full flex flex-col justify-center bg-gray-200 p-4 space-y-2">
      <div className="flex justify-between w-full">
        <Button className="w-24 flex space-x-2" onClick={() => {}}>
          <span className="hidden md:block">Save</span>
          <SaveIcon className="w-5 h-5" />
        </Button>
        <Button className="w-24 flex space-x-2" onClick={handleExport}>
          <span className="hidden md:block">Download</span>
          <Download className="w-5 h-5" />
        </Button>
      </div>

      <div
        className="bg-white w-full h-full max-h-[48] overflow-y-auto border py-12 px-12 font-serif leading-tight text-center align-middle"
        id="element-to-print"
        ref={elementRef}
      >
        <ResumeHeader></ResumeHeader>
        <EducationSection></EducationSection>
        <ExperienceSection></ExperienceSection>
      </div>
    </main>
  );
}

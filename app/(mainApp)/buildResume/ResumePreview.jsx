"use client";

import ResumeHeader from "@/components/ResumeComponents/ResumeEditor/ResumeHeader";
import EducationSection from "@/components/ResumeComponents/ResumeEditor/EducaitonSection";

import { Button } from "@/components/ui/button";
import html2pdf from "html2pdf.js";
import { useRef } from "react";

export default function ResumePreview() {
  const elementRef = useRef(null);
  const handleExport = () => {
    var element = document.getElementById("element-to-print");
    // var opt = {
    //   margin: 1,
    //   filename: "myfile.pdf",
    //   image: { type: "jpeg", quality: 0.98 },
    //   html2canvas: { scale: 2 },
    //   jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    // };

    html2pdf().from(element).save();
  };

  return (
    <main className=" w-full h-full flex flex-col justify-center bg-gray-200 p-4 space-y-2">
      <div className="flex justify-between w-full">
        <Button className="w-24" onClick={() => {}}>
          Save
        </Button>
        <Button className="w-24" onClick={handleExport}>
          Export
        </Button>
      </div>

      <div
        className="bg-white w-full h-full max-h-[48] overflow-y-auto border py-12 px-12 font-serif leading-tight text-center align-middle"
        id="element-to-print"
        ref={elementRef}
      >
        <ResumeHeader></ResumeHeader>
        <EducationSection></EducationSection>
      </div>
    </main>
  );
}

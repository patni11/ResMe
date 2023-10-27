"use client";

import ResumeHeader from "@/components/ResumeComponents/ResumeEditor/ResumeHeader";
import EducationSection from "@/components/ResumeComponents/ResumeEditor/EducationSection";
import ExperienceSection from "@/components/ResumeComponents/ResumeEditor/ExperienceSection";
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
import { cn } from "@/lib/utils";
export default function ResumePreview() {
  const elementRef = useRef(null);

  const downloadPDF = () => {
    var element = document.getElementById("element-to-print");
    html2pdf().from(element).save();
  };

  const downloadDocx = () => {
    const doc = DocumentCreator();

    Packer.toBlob(doc).then((blob) => {
      console.log(blob);
      saveAs(blob, "resume.docx");
      console.log("Document created successfully");
    });
  };

  return (
    <main className=" w-full h-full flex flex-col justify-center bg-gray-200 p-4 space-y-2">
      <div className="flex justify-between w-full">
        <Button className="w-24 flex space-x-2" onClick={() => {}}>
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
                        className={buttonVariants}
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

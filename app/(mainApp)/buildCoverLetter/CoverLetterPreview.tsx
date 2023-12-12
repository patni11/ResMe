"use client";
import ActionBar from "@/components/Navigation/ActionBar";

import { ResumePDF } from "@/components/ResumeComponents/ReactPDF/ResumePDF";
import { ResumeControlBarCSR } from "@/components/ResumeComponents/ReactPDF/ResumeControlBar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useState } from "react";
import { ResumeIframeCSR } from "@/components/ResumeComponents/ReactPDF/ResumeIFrame";
import { DEFAULT_DOCUMENT_SIZE } from "@/components/ResumeComponents/ReactPDF/constants";
import { useMemo } from "react";
import { DEFAULT_FONT_FAMILY } from "@/components/ResumeComponents/ReactPDF/constants";
import { Toggle } from "@/components/ui/toggle";

import {
  useRegisterReactPDFFont,
  useRegisterReactPDFHyphenationCallback,
} from "@/components/fonts/hooks";

export default function CoverLetterPreview() {
  const [pdfPreview, setPDFPreview] = useState(false);

  useRegisterReactPDFFont();
  useRegisterReactPDFHyphenationCallback(DEFAULT_FONT_FAMILY);
  const [page, setPage] = useState(1);

  const document = useMemo(() => {
    return (
      <CoverLetterPDF
      // resume={resume}
      // componentsData={componentsData}
      // setPage={(totalPages) => setPage(totalPages)}
      />
    );
  }, [resume, componentsData, page]);
  const width = DEFAULT_DOCUMENT_SIZE === "A4" ? A4_WIDTH_PX : LETTER_WIDTH_PX;
  return (
    <main className="sticky top-0 w-full h-full flex flex-col bg-gray-200 px-4">
      <ActionBar
        resumeId={resumeId}
        email={email}
        componentsData={componentsData}
      >
        <div className="flex items-center space-x-2">
          <ResumeControlBarCSR document={document} />

          <TooltipProvider>
            <Tooltip delayDuration={300}>
              <TooltipTrigger className="cursor-default ml-1.5">
                <Toggle
                  id="edit"
                  pressed={pdfPreview}
                  onPressedChange={() => setPDFPreview(!pdfPreview)}
                  size="xs"
                  variant="outlineHover"
                >
                  {pdfPreview ? "View" : "Edit"}
                </Toggle>
              </TooltipTrigger>
              <TooltipContent className="p-2 text-xs font-normal">
                Switch to Edit/View Mode
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </ActionBar>
      <div
        style={{
          position: "relative",
        }}
        className="h-full w-full"
      >
        <ResumeIframeCSR
          documentSize={DEFAULT_DOCUMENT_SIZE}
          scale={0.8}
          enablePDFViewer={pdfPreview}
          totalPages={page}
        >
          {document}
        </ResumeIframeCSR>
        {!pdfPreview ? (
          <div
            style={{
              width: `${width * 0.8}px`,
              height: "2rem",
              backgroundColor: "white",
              position: "absolute bottom-0",
              bottom: 0,
              left: 0,
              zIndex: 3, // Higher z-index to overlay over the Frame
            }}
          />
        ) : null}
      </div>
    </main>
  );
}

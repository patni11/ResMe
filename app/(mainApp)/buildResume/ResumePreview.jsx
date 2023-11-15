"use client";
import ActionBar from "@/components/ResumeComponents/ResumeEditor/ActionBar";

import { ResumePDF } from "@/components/ResumeComponents/ReactPDF/ResumePDF";
import { ResumeControlBarCSR } from "@/components/ResumeComponents/ReactPDF/ResumeControlBar";

import { useState } from "react";
import { ResumeIframeCSR } from "@/components/ResumeComponents/ReactPDF/ResumeIFrame";
import { DEFAULT_DOCUMENT_SIZE } from "@/components/ResumeComponents/ReactPDF/constants";
import { useMemo } from "react";
import { DEFAULT_FONT_FAMILY } from "@/components/ResumeComponents/ReactPDF/constants";
import { Toggle } from "@/components/ui/toggle";

import { createResumeHeaderInfo } from "@/store/resumeHeaderInfo";
import { createCertificateInfo } from "@/store/certificatesInfo";
import { createEducationInfo } from "@/store/educationInfo";
import { createExperienceInfo } from "@/store/experienceInfo";
import { createProjectsSection } from "@/store/projectsInfo";
import {
  useRegisterReactPDFFont,
  useRegisterReactPDFHyphenationCallback,
} from "@/components/fonts/hooks";

import { createTalentsInfo } from "@/store/talentsInfo";

import {
  A4_WIDTH_PX,
  LETTER_WIDTH_PX,
} from "@/components/ResumeComponents/ReactPDF/constants";

export default function ResumePreview({
  resumeId = "default",
  email = "",
  componentsData,
}) {
  const [pdfPreview, setPDFPreview] = useState(false);

  const useEducationsInfo = createEducationInfo(
    `educations-${email}-${resumeId}`
  );
  const educationData = useEducationsInfo();

  const useResumeHeaderInfo = createResumeHeaderInfo(
    `resumeHeader-${email}-${resumeId}`
  );
  const headerData = useResumeHeaderInfo();

  const useCertificatesInfo = createCertificateInfo(
    `certificates-${email}-${resumeId}`
  );
  const certificateData = useCertificatesInfo();

  const useExperiencesInfo = createExperienceInfo(
    `experiences-${email}-${resumeId}`
  );
  const experienceData = useExperiencesInfo();

  const useProjectsInfo = createProjectsSection(
    `projects-${email}-${resumeId}`
  );
  const projectData = useProjectsInfo();

  const useTalentInfo = createTalentsInfo(`talents-${email}-${resumeId}`);
  const talentData = useTalentInfo();

  const resume = {
    headerData,
    educationData,
    certificateData,
    experienceData,
    projectData,
    talentData,
  };

  useRegisterReactPDFFont();
  useRegisterReactPDFHyphenationCallback(DEFAULT_FONT_FAMILY);
  const [page, setPage] = useState(1);

  const document = useMemo(() => {
    return (
      <ResumePDF
        resume={resume}
        componentsData={componentsData}
        setPage={(totalPages) => setPage(totalPages)}
      />
    );
  }, [resume, componentsData, page]);
  const width = DEFAULT_DOCUMENT_SIZE === "A4" ? A4_WIDTH_PX : LETTER_WIDTH_PX;
  return (
    <main className="sticky top-0 w-full h-full flex flex-col justify-center bg-gray-200 p-4">
      <ActionBar
        resumeId={resumeId}
        email={email}
        componentsData={componentsData}
      >
        {/* <button>
          <PDFDownloadLink document={document} fileName="somename.pdf">
            {({ blob, url, loading, error }) => {
              console.log("URL", url, loading);
              return loading ? (
                <Button disabled={loading}>
                  <LoadingSpinner />
                </Button>
              ) : (
                <Button className="flex space-x-2">
                  <Download className="w-4 h-4" /> <span>PDF</span>
                </Button>
              );
            }}
          </PDFDownloadLink>
        </button> */}

        <ResumeControlBarCSR document={document} fileName={"somename"} />
        <div className="flex items-center space-x-2">
          <Toggle
            id="edit"
            pressed={pdfPreview}
            onPressedChange={() => setPDFPreview(!pdfPreview)}
          >
            {!pdfPreview ? "View" : "Edit"}
          </Toggle>
        </div>
      </ActionBar>

      {/* <TransformWrapper
        centerOnInit
        minScale={0.25}
        initialScale={0.55}
        limitToBounds={true}
        centerZoomedOut={true}
        pinch={{ step: 3 }}
        wheel={{ step: 0.1 }}
        // disabled={!interactionEnabled}
      >
        <TransformComponent wrapperClass="w-full overflow-visible">
        </TransformComponent>
      </TransformWrapper> */}
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

{
  /* <div
            className="relative bg-white"
            contentEditable="true"
            style={{
              height: `${height}px`,
              overflow: "hidden",
              padding: "3rem",
              width: 694,
            }}
          >
            <div
              className="relative bg-white font-serif leading-tight text-center align-middle"
              id="element-to-print"
              style={{
                minHeight: initialHeight, // Use minHeight to ensure it never goes below initial height
                overflow: "hidden",
              }}
              ref={contentRef}
            >
              {componentsData.map((componentData) => (
                <div key={componentData.id} className="w-full">
                  {renderComponent(componentData)}
                </div>
              ))}
            </div>
          </div> */
}

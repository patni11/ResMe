"use client";
// import ResumeHeader from "@/components/ResumeComponents/ResumeEditor/ResumeHeader";
// import EducationSection from "@/components/ResumeComponents/ResumeEditor/EducationSection";
// import ExperienceSection from "@/components/ResumeComponents/ResumeEditor/ExperienceSection";
// import CertificateSection from "@/components/ResumeComponents/ResumeEditor/CertificateSections";
// import TalentSection from "@/components/ResumeComponents/ResumeEditor/TalentSection";
// import ProjectSection from "@/components/ResumeComponents/ResumeEditor/ProjectSection";
import ActionBar from "@/components/ResumeComponents/ResumeEditor/ActionBar";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
// import { useState, useRef, useEffect } from "react";
// import { Button } from "@/components/ui/button";
// import { Hand, Pencil } from "lucide-react";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Download } from "lucide-react";
import { ResumePDF } from "@/components/ResumeComponents/ReactPDF/ResumePDF";
import { ResumeControlBarCSR } from "@/components/ResumeComponents/ReactPDF/ResumeControlBar";
import { usePDF } from "@react-pdf/renderer";
import { ResumeIframeCSR } from "@/components/ResumeComponents/ReactPDF/ResumeIFrame";
import {
  DEBUG_RESUME_PDF_FLAG,
  DEFAULT_DOCUMENT_SIZE,
} from "@/components/ResumeComponents/ReactPDF/constants";
import { useMemo } from "react";
import { DEFAULT_FONT_FAMILY } from "@/components/ResumeComponents/ReactPDF/constants";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { createResumeHeaderInfo } from "@/store/resumeHeaderInfo";
import { createCertificateInfo } from "@/store/certificatesInfo";
import { createEducationInfo } from "@/store/educationInfo";
import { createExperienceInfo } from "@/store/experienceInfo";
import { createProjectsSection } from "@/store/projectsInfo";
import {
  useRegisterReactPDFFont,
  useRegisterReactPDFHyphenationCallback,
} from "@/components/fonts/hooks";
import { Button } from "@/components/ui/button";
import { createTalentsInfo } from "@/store/talentsInfo";
export default function ResumePreview({
  resumeId = "default",
  email = "",
  componentsData,
}) {
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

  const document = useMemo(() => {
    return <ResumePDF resume={resume} componentsData={componentsData} />;
  }, [resume, componentsData]);

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

      <ResumeIframeCSR
        documentSize={DEFAULT_DOCUMENT_SIZE}
        scale={0.8}
        enablePDFViewer={DEBUG_RESUME_PDF_FLAG}
      >
        {document}
      </ResumeIframeCSR>
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

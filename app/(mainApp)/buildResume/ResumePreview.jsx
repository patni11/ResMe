"use client";
import ResumeHeader from "@/components/ResumeComponents/ResumeEditor/ResumeHeader";
import EducationSection from "@/components/ResumeComponents/ResumeEditor/EducationSection";
import ExperienceSection from "@/components/ResumeComponents/ResumeEditor/ExperienceSection";
import CertificateSection from "@/components/ResumeComponents/ResumeEditor/CertificateSections";
import TalentSection from "@/components/ResumeComponents/ResumeEditor/TalentSection";
import ProjectSection from "@/components/ResumeComponents/ResumeEditor/ProjectSection";
import ActionBar from "@/components/ResumeComponents/ResumeEditor/ActionBar";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Hand, Pencil } from "lucide-react";

export default function ResumePreview({
  resumeId = "default",
  email = "",
  componentsData,
}) {
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

  const [interactionEnabled, setInteractionEnabled] = useState(true);
  const initialHeight = 981;
  const [height, setHeight] = useState(initialHeight);
  const contentRef = useRef(null);

  useEffect(() => {
    console.log("In Use effect");
    if (contentRef.current) {
      const currentContentHeight = contentRef.current.scrollHeight;
      console.log("Height", height, currentContentHeight);

      // Only increase if content height exceeds current div height
      if (currentContentHeight > height) {
        console.log("Increasing Height");
        setHeight((previousHeight) => previousHeight + initialHeight); // Double the height
      }
      // Decrease height if content height is less, but never below the initial height
      else if (currentContentHeight < height && height > initialHeight) {
        console.log("Decreasing Height");
        setHeight((previousHeight) => previousHeight - initialHeight);
      }
    }
  }, [componentsData]); // Dependency on the content's child nodes

  return (
    <main className="sticky top-0 w-full h-full flex flex-col justify-center bg-gray-200 p-4">
      <ActionBar
        resumeId={resumeId}
        email={email}
        componentsData={componentsData}
      >
        <div className="flex items-center justify-center space-x-4">
          <Button
            onClick={() => setInteractionEnabled(true)}
            disabled={interactionEnabled}
          >
            <Hand className="w-4 h-4" />
          </Button>
          <Button
            onClick={() => setInteractionEnabled(false)}
            disabled={!interactionEnabled}
          >
            <Pencil className="w-4 h-4" />
          </Button>
        </div>
      </ActionBar>

      {/* <PDFViewer style={{ flex: 1 }}>
        <Document />
      </PDFViewer> */}
      {/* style={{ width: "595px" }} */}
      <TransformWrapper
        centerOnInit
        minScale={0.25}
        initialScale={0.55}
        limitToBounds={true}
        centerZoomedOut={true}
        pinch={{ step: 3 }}
        wheel={{ step: 0.1 }}
        disabled={!interactionEnabled}
      >
        <TransformComponent wrapperClass="w-full overflow-visible">
          <div
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
          </div>
        </TransformComponent>
      </TransformWrapper>
    </main>
  );
}

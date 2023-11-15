import { Page, Document, Text } from "@react-pdf/renderer";
import { styles, spacing } from "./styles";
import ResumeHeader from "./ResumeHeader";
import {
  DEFAULT_FONT_COLOR,
  DEFAULT_FONT_FAMILY,
  DEFAULT_FONT_SIZE,
  DEFAULT_DOCUMENT_SIZE,
} from "./constants";
// import { ResumePDFWorkExperience } from "components/Resume/ResumePDF/ResumePDFWorkExperience";
// import { ResumePDFEducation } from "components/Resume/ResumePDF/ResumePDFEducation";
// import { ResumePDFProject } from "components/Resume/ResumePDF/ResumePDFProject";
// import { ResumePDFSkills } from "components/Resume/ResumePDF/ResumePDFSkills";
// import { ResumePDFCustom } from "components/Resume/ResumePDF/ResumePDFCustom";
//import { DEFAULT_FONT_COLOR } from "lib/redux/settingsSlice";
//import type { Settings, ShowForm } from "lib/redux/settingsSlice";
//import type { Resume } from "lib/redux/types";
import { SuppressResumePDFErrorMessage } from "./common/SuppressResumePDFErrorMessage";
import ResumeEducation from "./ResumeEducation";
import ResumeCertificate from "./ResumeCertificate";
import ResumeExperience from "./ResumeExperience";
import ResumeProject from "./ResumeProjects";
import { State as HeaderState } from "@/store/resumeHeaderInfo";
import { State as CertificateState } from "@/store/certificatesInfo";
import { State as EducationState } from "@/store/educationInfo";
import { State as ExperienceState } from "@/store/experienceInfo";
import { State as ProjectState } from "@/store/projectsInfo";
import { State as TalentState } from "@/store/talentsInfo";
import ResumeTalent from "./ResumeTalent";
/**
 * Note: ResumePDF is supposed to be rendered inside PDFViewer. However,
 * PDFViewer is rendered too slow and has noticeable delay as you enter
 * the resume form, so we render it without PDFViewer to make it render
 * instantly. There are 2 drawbacks with this approach:
 * 1. Not everything works out of box if not rendered inside PDFViewer,
 *    e.g. svg doesn't work, so it takes in a isPDF flag that maps react
 *    pdf element to the correct dom element.
 * 2. It throws a lot of errors in console log, e.g. "<VIEW /> is using incorrect
 *    casing. Use PascalCase for React components, or lowercase for HTML elements."
 *    in development, causing a lot of noises. We can possibly workaround this by
 *    mapping every react pdf element to a dom element, but for now, we simply
 *    suppress these messages in <SuppressResumePDFErrorMessage />.
 *    https://github.com/diegomura/react-pdf/issues/239#issuecomment-487255027
 */
export const ResumePDF = ({
  resume,
  settings = {
    fontSize: DEFAULT_FONT_SIZE,
    fontFamily: DEFAULT_FONT_FAMILY,
    documentSize: DEFAULT_DOCUMENT_SIZE,
  },
  componentsData,
  setPage,
}: {
  resume: {
    headerData: HeaderState;
    educationData: EducationState;
    certificateData: CertificateState;
    experienceData: ExperienceState;
    projectData: ProjectState;
    talentData: TalentState;
  };
  settings: { fontFamily: string; fontSize: string; documentSize: string };
  componentsData: { type: string; id: string }[];
  isPDF?: boolean;
  setPage: (totalPages: number) => void;
}) => {
  const renderComponent = (componentsData: { type: string; id: string }) => {
    switch (componentsData.type) {
      case "ResumeHeader":
        return (
          <ResumeHeader
            headerData={resume.headerData}
            key={componentsData.type}
          />
        );
      case "EducationSectionCard":
        return (
          <ResumeEducation
            heading="EDUCATION"
            educationData={resume.educationData}
            key={componentsData.type}
          />
        );

      case "CertificateSectionCard":
        return (
          <ResumeCertificate
            heading="Certifications: "
            certificatesData={resume.certificateData}
            key={componentsData.type}
          />
        );
      case "ExperienceSectionCard":
        return (
          <ResumeExperience
            heading="PROFESSIONAL EXPERIENCE"
            experienceData={resume.experienceData}
            key={componentsData.type}
          />
        );
      case "ProjectSectionCard":
        return (
          <ResumeProject
            heading="PROJECTS & OUTSIDE EXPERIENCE"
            projectData={resume.projectData}
            key={componentsData.type}
          />
        );
      case "TalentsSection":
        return (
          <ResumeTalent
            heading="SKILLS & INTERESTS"
            talentData={resume.talentData}
            key={componentsData.type}
          />
        );

      // ... other cases for other components
      default:
        return null;
    }
  };

  const { fontFamily, fontSize, documentSize } = settings;

  return (
    <>
      <Document title={`Resume`} author={"Some Author"} producer={"ResMe"}>
        <Page
          size={documentSize === "A4" ? "A4" : "LETTER"}
          style={{
            ...styles.flexCol,

            color: DEFAULT_FONT_COLOR,
            fontFamily,
            fontSize: fontSize + "pt",
            padding: `${spacing["10"]} ${spacing["10"]}`,
          }}
        >
          {componentsData.map((componentData) =>
            renderComponent(componentData)
          )}
          <Text
            render={({ totalPages }) => {
              setPage(totalPages);
              return "";
            }}
            style={{ display: "none" }}
          />
        </Page>
      </Document>
      <SuppressResumePDFErrorMessage />
    </>
  );
};

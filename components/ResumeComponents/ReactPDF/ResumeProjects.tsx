import { View } from "@react-pdf/renderer";
import { ResumePDFBulletList, ResumePDFCard, ResumePDFSection } from "./common";
import { styles, spacing } from "./styles";
import { State } from "@/store/projectsInfo";
import { DEFAULT_THEME_COLOR } from "./constants";
import { memo } from "react";
import { getFormattedDate } from "@/app/utils/FormattingFunctions";

const ResumeProject = ({
  heading,

  projectData,
}: {
  heading: string;

  projectData: State;
}) => {
  const {
    projects,
    hiddenProjects,
    hideAll,
    hiddenDates,
    hiddenLocation,
    hiddenPosition,
  } = projectData;

  if (hideAll) {
    return null;
  }

  return (
    <ResumePDFSection heading={heading} themeColor={DEFAULT_THEME_COLOR}>
      {projects.map((project: any, idx) => {
        const isProjectHidden = hiddenProjects && hiddenProjects[project._id];

        if (isProjectHidden) {
          return null; // Remember to add a key here
        }
        const isDatesHidden = hiddenDates && hiddenDates[project._id];
        const isLocationHidden = hiddenLocation && hiddenLocation[project._id];
        const isPositionHidden = hiddenPosition && hiddenPosition[project._id];
        const descriptions = project.description;

        let location = undefined;
        let date = undefined;
        let positionTitle = undefined;

        if (!isDatesHidden && project.startDate != undefined) {
          date = `${getFormattedDate(
            new Date(project.startDate)
          )} - ${getFormattedDate(new Date(project.endDate))}`;
        }

        if (!isLocationHidden) {
          location = project.location;
        }

        if (!isPositionHidden) {
          positionTitle = project.positionTitle;
        }

        return (
          <ResumePDFCard
            heading={project.projectName}
            subHeading={`${project.positionTitle}`}
            dates={positionTitle}
            value={date}
            key={idx}
          >
            <View style={{ ...styles.flexCol, marginTop: spacing["0.5"] }}>
              <ResumePDFBulletList items={descriptions} />
            </View>
          </ResumePDFCard>
        );
      })}
    </ResumePDFSection>
  );
};

export default memo(ResumeProject);

import { View } from "@react-pdf/renderer";
import { ResumePDFBulletList, ResumePDFCard, ResumePDFSection } from "./common";
import { styles, spacing } from "./styles";
import { State } from "@/store/experienceInfo";
import { DEFAULT_THEME_COLOR } from "./constants";
import { getFormattedDate } from "@/app/utils/FormattingFunctions";
import { memo } from "react";

const ResumeExperience = ({
  heading,
  experienceData,
}: {
  heading: string;
  experienceData: State;
}) => {
  const { experiences, hiddenExperiences, hideAll } = experienceData;

  if (hideAll) {
    return null;
  }

  return (
    <ResumePDFSection heading={heading} themeColor={DEFAULT_THEME_COLOR}>
      {experiences.map((experience: any, idx) => {
        const isExperienceHidden =
          hiddenExperiences && hiddenExperiences[experience._id];
        if (isExperienceHidden) {
          return null; // Remember to add a key here
        }

        const endDate =
          experience.endDate == "working"
            ? "Current"
            : getFormattedDate(new Date(experience.endDate));

        const descriptions = experience.description;

        return (
          <ResumePDFCard
            key={idx}
            heading={experience.company}
            subHeading={`${experience.positionTitle}`}
            dates={`${experience.experienceType} ${experience.location}`}
            value={`${getFormattedDate(
              new Date(experience.startDate)
            )} - ${endDate}`}
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

export default memo(ResumeExperience);

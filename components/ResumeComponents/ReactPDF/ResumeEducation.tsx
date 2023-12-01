import { View } from "@react-pdf/renderer";
import { ResumePDFCard, ResumePDFSection, ResumePDFText } from "./common";
import { styles, spacing } from "./styles";
import { State } from "@/store/educationInfo";
import { DEFAULT_THEME_COLOR } from "./constants";
import {
  getFormattedDate,
  parseDecimal,
} from "@/app/utils/FormattingFunctions";
import { memo } from "react";

const ResumeEducation = ({
  heading,
  educationData,
}: {
  heading: string;

  educationData: State;
}) => {
  const {
    educations,
    hiddenDates,
    hiddenGPAs,
    hiddenEducations,
    hideAll,
    relevantCourseWork,
  } = educationData;

  if (hideAll) {
    return null;
  }

  return (
    <ResumePDFSection heading={heading} themeColor={DEFAULT_THEME_COLOR}>
      {educations.map((education: any, idx) => {
        const isEducationHidden =
          hiddenEducations && hiddenEducations[education._id];
        if (isEducationHidden) {
          return null; // Remember to add a key here
        }

        let gpa = undefined;
        let dates = undefined;

        if (!hiddenGPAs![education._id]) {
          gpa = education?.gpa
            ? `GPA: ${parseDecimal(education.gpa).toString()}`
            : undefined;
        }

        if (!hiddenDates![education._id]) {
          dates =
            `${getFormattedDate(new Date(education.startDate))}` +
            " - " +
            `${getFormattedDate(new Date(education.endDate))}`;
        }

        return (
          <ResumePDFCard
            heading={education.schoolName}
            subHeading={`${education.degreeType} ${education.major}`}
            dates={dates}
            value={gpa}
            key={idx}
          />
        );
      })}
      {relevantCourseWork && (
        <View
          style={{
            ...styles.flexRow,
            marginTop: spacing["1.5"],
            //gap: spacing["1"],
            flexWrap: "wrap", // ensure the text wraps
          }}
        >
          <ResumePDFText bold={true}>
            {`Relevant Courses:`}{" "}
            <ResumePDFText>{relevantCourseWork}</ResumePDFText>
          </ResumePDFText>
        </View>

        // <View style={{ marginTop: spacing["1.5"] }}>
        //   <Text style={{ fontWeight: 700 }}>
        //     Relevant Courses: {relevantCourseWork}
        //   </Text>
        // </View>
      )}
    </ResumePDFSection>
  );
};

export default memo(ResumeEducation);

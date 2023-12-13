import { ResumePDFText, ResumePDFSection } from "../../PDFComponents/common";
import { styles, spacing } from "./styles";
import { State } from "@/store/talentsInfo";
import { DEFAULT_THEME_COLOR } from "../../PDFComponents/common/constants";
import { memo } from "react";
import { View } from "@react-pdf/renderer";

const ResumeTalent = ({
  heading,
  talentData,
}: {
  heading: string;
  talentData: State;
}) => {
  const {
    skills,
    languages,
    interests,
    hideSkills,
    hideLanguages,
    hideInterests,
  } = talentData;

  if (hideInterests && hideLanguages && hideSkills) {
    return null;
  }

  return (
    <ResumePDFSection heading={heading} themeColor={DEFAULT_THEME_COLOR}>
      {skills != "" && !hideSkills ? (
        <View
          style={{
            ...styles.flexRow,
            marginTop: spacing["1.5"],
            flexWrap: "wrap", // ensure the text wraps
          }}
        >
          <ResumePDFText bold={true}>
            {`Skills:`} <ResumePDFText>{skills}</ResumePDFText>
          </ResumePDFText>
        </View>
      ) : null}

      {interests != "" && !hideInterests ? (
        <View
          style={{
            ...styles.flexRow,
            marginTop: spacing["1.5"],
            flexWrap: "wrap", // ensure the text wraps
          }}
        >
          <ResumePDFText bold={true}>
            {`Interests:`} <ResumePDFText>{interests}</ResumePDFText>
          </ResumePDFText>
        </View>
      ) : null}

      {languages != "" && !hideLanguages ? (
        <View
          style={{
            ...styles.flexRow,
            marginTop: spacing["1.5"],
            flexWrap: "wrap", // ensure the text wraps
          }}
        >
          <ResumePDFText bold={true}>
            {`Languages:`} <ResumePDFText>{languages}</ResumePDFText>
          </ResumePDFText>
        </View>
      ) : null}
    </ResumePDFSection>
  );
};

export default memo(ResumeTalent);

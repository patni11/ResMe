import { ResumePDFText, ResumePDFSection } from "./common";
import { styles, spacing } from "./styles";
import { State } from "@/store/talentsInfo";
import { DEFAULT_THEME_COLOR } from "./constants";
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
            gap: spacing["1"],
          }}
        >
          <ResumePDFText bold={true}>{`Skills:`}</ResumePDFText>
          <ResumePDFText>{skills}</ResumePDFText>
        </View>
      ) : null}

      {interests != "" && !hideInterests ? (
        <View
          style={{
            ...styles.flexRow,
            marginTop: spacing["1.5"],
            gap: spacing["1"],
          }}
        >
          <ResumePDFText bold={true}>{`Interests:`}</ResumePDFText>
          <ResumePDFText>{interests}</ResumePDFText>
        </View>
      ) : null}

      {languages != "" && !hideLanguages ? (
        <View
          style={{
            ...styles.flexRow,
            marginTop: spacing["1.5"],
            gap: spacing["1"],
          }}
        >
          <ResumePDFText bold={true}>{`Languages:`}</ResumePDFText>
          <ResumePDFText>{languages}</ResumePDFText>
        </View>
      ) : null}
    </ResumePDFSection>
  );
};

export default memo(ResumeTalent);

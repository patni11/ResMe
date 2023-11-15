import { View } from "@react-pdf/renderer";
import { styles, spacing } from "./styles";
import { ResumePDFSection, ResumePDFText } from "./common";
import { State } from "@/store/resumeHeaderInfo";
import { memo } from "react";
//import type { ResumeProfile } from "lib/redux/types";

interface ResumeHeaderProps {
  headerData: State;
}

const ResumeHeader: React.FC<ResumeHeaderProps> = ({ headerData }) => {
  const { headerInfo, hideLocation, hiddenContacts, hiddenLinks } = headerData;

  const { displayName } = headerInfo;
  const contactInfo = headerInfo.contactInfo
    ? headerInfo.contactInfo
    : [{ contact: "" }];
  const location = headerInfo?.location ? headerInfo.location : "";
  const links = headerInfo.links
    ? headerInfo.links
    : [{ linkName: "", link: "" }];

  return (
    <ResumePDFSection style={{ marginTop: spacing[2] }}>
      <ResumePDFText
        bold={true}
        style={{ fontSize: "24pt", textAlign: "center" }}
      >
        {displayName.toUpperCase()}
      </ResumePDFText>

      <View
        style={{
          ...styles.flexRow,
          flexWrap: "wrap",
          textAlign: "center",
          marginTop: spacing["0.5"],
          alignSelf: "center",
          gap: spacing["1"],
        }}
      >
        {!hideLocation && location != "" ? (
          <ResumePDFText style={{ marginHorizontal: spacing["0.5"] }}>
            {location} |{" "}
          </ResumePDFText>
        ) : null}

        {contactInfo.map((info: any, index: any) => {
          const contactKey = info.contact;
          // Check if the contact is hidden
          if (hiddenContacts[index][contactKey]) return null; // Skip rendering if hidden
          return (
            <View
              key={contactKey}
              style={{
                ...styles.flexRow,
                alignItems: "center",
                gap: spacing["1"],
              }}
            >
              <ResumePDFText>{` ${contactKey} | `}</ResumePDFText>
            </View>
          );
        })}

        {links.map((link: any, index: any) => {
          const linkKey = link.linkName;
          if (hiddenLinks[index][linkKey]) return null;
          const linkText =
            ` ${link.link}` + `${index != links.length - 1 ? ` | ` : ""}`;
          return (
            <View
              key={index}
              style={{
                ...styles.flexRow,
                alignItems: "center",
                gap: spacing["1"],
              }}
            >
              <ResumePDFText>{linkText}</ResumePDFText>
            </View>
          );
        })}
      </View>
    </ResumePDFSection>
  );
};

export default memo(ResumeHeader);

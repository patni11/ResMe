import { View } from "@react-pdf/renderer";
import { styles, spacing } from "./styles";
import { ResumePDFSection, ResumePDFText } from "../../PDFComponents/common";
import { State } from "@/store/resumeHeaderInfo";
import { memo } from "react";
//import type { ResumeProfile } from "lib/redux/types";

interface ResumeHeaderProps {
  headerData: State;
}

const ResumeHeader: React.FC<ResumeHeaderProps> = ({ headerData }) => {
  const { headerInfo, hideLocation, hiddenContacts, hiddenLinks } = headerData;

  const { displayName } = headerInfo;
  const bio = headerInfo.bio || "";
  const contactInfo = headerInfo.contactInfo
    ? headerInfo.contactInfo
    : [{ contactName: "", contact: "" }];

  const contacts = contactInfo
    .filter((info, index) => !hiddenContacts[info.contactName])
    .map((info) => info.contact)
    .join(" | ");

  const linksInfo = headerInfo.links
    ? headerInfo.links
    : [{ linkName: "", link: "" }];

  const links = linksInfo
    .filter((info, index) => !hiddenLinks[info.linkName])
    .map((info) => info.link)
    .join(" | ");

  const location =
    headerInfo?.location && !hideLocation ? headerInfo.location : "";

  const contactsAndLinks = [contacts, links, location]
    .filter(Boolean)
    .join(" | ");

  return (
    <View>
      <ResumePDFSection>
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
            justifyContent: "center",
            marginTop: spacing["0.5"],
            gap: spacing["1"],
          }}
        >
          <ResumePDFText style={{ marginHorizontal: spacing["0.5"] }}>
            {contactsAndLinks}
          </ResumePDFText>
        </View>
      </ResumePDFSection>
      {bio === "" ? null : (
        <View
          style={{
            ...styles.flexCol,
            marginTop: "0.5",
            marginBottom: "0.5",
          }}
        >
          <ResumePDFText bold={true}>Professional Summary</ResumePDFText>
          <ResumePDFText>{bio}</ResumePDFText>
        </View>
      )}
    </View>
  );
};

export default memo(ResumeHeader);

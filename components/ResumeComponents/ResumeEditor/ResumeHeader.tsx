"use client";
import { createResumeHeaderInfo } from "@/store/resumeHeaderInfo";
import ResumeComponentContainer from "./ResumeComponentContainer";

//import ResumeComponentContainer from "./ResumeComponentContainer";

interface ResumeHeaderProps {
  resumeHeaderID: string;
}

const ResumeHeader: React.FC<ResumeHeaderProps> = ({ resumeHeaderID }) => {
  const useResumeHeaderInfo = createResumeHeaderInfo(resumeHeaderID);
  const { headerInfo, hideLocation, hiddenContacts, hiddenLinks } =
    useResumeHeaderInfo();

  const { displayName } = headerInfo;
  const contactInfo = headerInfo.contactInfo
    ? headerInfo.contactInfo
    : [{ contact: "" }];
  const location = headerInfo?.location ? headerInfo.location : "";
  const links = headerInfo.links
    ? headerInfo.links
    : [{ linkName: "", link: "" }];

  return (
    <ResumeComponentContainer>
      <div className="flex flex-col items-center mb-4">
        <h1 className="text-2xl font-semibold">
          {" "}
          {displayName.toUpperCase()}{" "}
        </h1>
        <div className="flex items-center text-xs font-serif">
          {!hideLocation && location != "" ? (
            <p>
              {location} <span>{` | `}</span>{" "}
            </p>
          ) : null}

          {contactInfo.map((info: any, index: any) => {
            const contactKey = info.contact;
            // Check if the contact is hidden
            if (hiddenContacts[index][contactKey]) return null; // Skip rendering if hidden
            return (
              <p key={contactKey}>
                {` ${contactKey}`} <span>{` | `}</span>
              </p>
            );
          })}

          {links.map((link: any, index: any) => {
            const linkKey = link.linkName;
            if (hiddenLinks[index][linkKey]) return null;
            return (
              <p key={index}>
                {` ${link.link}`}{" "}
                {index != links.length - 1 ? <span>{` | `}</span> : null}
              </p>
            );
          })}
        </div>
      </div>
    </ResumeComponentContainer>
  );
};

export default ResumeHeader;

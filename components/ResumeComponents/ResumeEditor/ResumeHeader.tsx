"use client";
import { useResumeHeaderInfo } from "@/store/resumeHeaderInfo";

//import ResumeComponentContainer from "./ResumeComponentContainer";

export default function ResumeHeader() {
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
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-semibold"> {displayName} </h1>
      <div className="flex items-center text-xs">
        {contactInfo.map((info, index) => {
          const contactKey = info.contact;
          // Check if the contact is hidden
          if (hiddenContacts[index][contactKey]) return null; // Skip rendering if hidden
          return <p key={contactKey}>{contactKey}</p>;
        })}
        {!hideLocation ? <p>{location}</p> : ""}

        {links.map((link, index) => {
          const linkKey = link.linkName;
          if (hiddenLinks[index][linkKey]) return null;
          return <p key={index}> {link.link}</p>;
        })}
      </div>
    </div>
  );
}

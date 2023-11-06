"use client";
import { useEffect } from "react";
import { FormCardWrapper } from "./FormCardWrapper";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { HideButtons } from "@/components/UIButtons/HideButtons";
import { createResumeHeaderInfo } from "@/store/resumeHeaderInfo";
import { useSession } from "next-auth/react";
import { memo } from "react";
interface ResumeHeaderProps {
  resumeHeaderID: string;
  index: number;
  moveUp: (index: number) => void;
  moveDown: (index: number) => void;
}

const ResumeHeader: React.FC<ResumeHeaderProps> = ({
  resumeHeaderID,
  index,
  moveUp,
  moveDown,
}) => {
  const useResumeHeaderInfo = createResumeHeaderInfo(resumeHeaderID);
  const {
    headerInfo,
    hideLocation,
    hiddenContacts,
    hiddenLinks,

    setHideLocation,
    updateDisplayName,
    setHiddenLinks,
    setHiddenContacts,
    error,
    isLoading,
    fetchHeaderInfo,
  } = useResumeHeaderInfo();

  const session = useSession();
  const email = session.data?.user?.email;

  useEffect(() => {
    let resumeHeaderLocalStorage = localStorage.getItem(resumeHeaderID);
    if (!resumeHeaderLocalStorage) {
      fetchHeaderInfo();
    }
  }, [fetchHeaderInfo]);

  const { displayName } = headerInfo;
  const contactInfo = headerInfo.contactInfo
    ? headerInfo.contactInfo
    : [{ contact: "" }];
  const location = headerInfo?.location ? headerInfo.location : "";
  const links = headerInfo.links
    ? headerInfo.links
    : [{ linkName: "", link: "" }];

  return (
    <FormCardWrapper
      cardTitle="Header"
      refreshFunction={() => fetchHeaderInfo()}
      isLoading={isLoading}
      index={index}
      moveUp={moveUp}
      moveDown={moveDown}
    >
      <Label>Your Name</Label>
      <Input
        placeholder="Enter your name"
        value={displayName}
        onChange={(e) => {
          updateDisplayName(e.currentTarget.value);
        }}
      ></Input>

      <div className="flex justify-between mt-2 whitespace-normal flex-wrap">
        {location !== "" ? (
          <HideButtons hide={hideLocation} setHide={() => setHideLocation()}>
            <span>Location</span>
          </HideButtons>
        ) : (
          <div></div>
        )}

        {links && links.length > 0
          ? links.map((link: any, index: any) => (
              <HideButtons
                key={index}
                hide={hiddenLinks[index] && hiddenLinks[index][link.linkName]}
                setHide={() => setHiddenLinks(link.linkName)}
              >
                <span>{link.linkName}</span>
              </HideButtons>
            ))
          : null}

        {contactInfo && contactInfo.length > 0
          ? contactInfo.map((contact: any, index: any) => (
              <HideButtons
                key={index}
                hide={hiddenContacts[index][contact.contact]}
                setHide={() => setHiddenContacts(contact.contact)}
              >
                <span>{contact.contact}</span>
              </HideButtons>
            ))
          : null}
      </div>
    </FormCardWrapper>
  );
};

export default memo(ResumeHeader);

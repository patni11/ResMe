"use client";
import { FC, useEffect } from "react";
import { FormCardWrapper } from "./FormCardWrapper";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserInfo } from "@/app/(mainApp)/userInfo/pageType";
import { HideButtons } from "@/components/UIButtons/HideButtons";
import { useResumeHeaderInfo } from "@/store/resumeHeaderInfo";
import { useSession } from "next-auth/react";

export const ResumeHeader: FC<ResumeHeaderProps> = () => {
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
    let resumeHeaderLocalStorage = localStorage.getItem(
      "resumeHeaderLocalStorage"
    );
    if (!resumeHeaderLocalStorage) {
      fetchHeaderInfo(email ? email : "");
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
      refreshFunction={() => fetchHeaderInfo(email ? email : "")}
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
        {location ? (
          <HideButtons hide={hideLocation} setHide={() => setHideLocation()}>
            <span>Location</span>
          </HideButtons>
        ) : (
          <div></div>
        )}

        {links?.map((link, index) => (
          <HideButtons
            key={index}
            hide={hiddenLinks[index][link.linkName]}
            setHide={() => setHiddenLinks(link.linkName)}
          >
            <span>{link.linkName}</span>
          </HideButtons>
        ))}

        {contactInfo?.map((contact, index) => (
          <HideButtons
            key={index}
            hide={hiddenContacts[index][contact.contact]}
            setHide={() => setHiddenContacts(contact.contact)}
          >
            <span>{contact.contact}</span>
          </HideButtons>
        ))}
      </div>
    </FormCardWrapper>
  );
};

type ResumeHeaderProps = {
  userDetails: UserInfo;
};

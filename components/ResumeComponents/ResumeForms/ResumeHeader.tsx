"use client";
import { FC, useState } from "react";
import { FormCardWrapper } from "./FormCardWrapper";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserInfo } from "@/app/(mainApp)/userInfo/pageType";
import { HideButtons } from "@/components/UIButtons/HideButtons";
interface ResumeHeader {
  userDetails: UserInfo;
}

export const ResumeHeader: FC<ResumeHeaderProps> = ({ userDetails }) => {
  const [hideLocation, setHideLocation] = useState(false);
  const [hiddenLinks, setHiddenLinks] = useState<{ [key: string]: boolean }>(
    {}
  );
  const [hiddenContacts, setHiddenContacts] = useState<{
    [key: string]: boolean;
  }>({});

  const toggleLinkVisibility = (linkName: string) => {
    setHiddenLinks((prev) => ({ ...prev, [linkName]: !prev[linkName] }));
  };

  const toggleContactVisibility = (contact: string) => {
    setHiddenContacts((prev) => ({ ...prev, [contact]: !prev[contact] }));
  };

  return (
    <FormCardWrapper cardTitle="Header">
      <Label>Your Name</Label>
      <Input
        placeholder="Enter your name"
        value={userDetails?.displayName || ""}
      ></Input>

      <div className="flex justify-between mt-2 whitespace-normal flex-wrap">
        {userDetails.location ? (
          <HideButtons
            hide={hideLocation}
            setHide={() => setHideLocation(!hideLocation)}
          >
            <span>{hideLocation ? "Unhide" : "Hide"} Location</span>
          </HideButtons>
        ) : (
          <div></div>
        )}

        {userDetails.links?.map((link, index) => (
          <HideButtons
            key={index}
            hide={!!hiddenLinks[link.linkName]}
            setHide={() => toggleLinkVisibility(link.linkName)}
          >
            <span>
              {hiddenLinks[link.linkName] ? "Unhide" : "Hide"} {link.linkName}
            </span>
          </HideButtons>
        ))}

        {userDetails.contactInfo?.map((contact, index) => (
          <HideButtons
            key={index}
            hide={!!hiddenContacts[contact.contact]}
            setHide={() => toggleContactVisibility(contact.contact)}
          >
            <span>
              {hiddenContacts[contact.contact] ? "Unhide" : "Hide"}{" "}
              {contact.contact}
            </span>
          </HideButtons>
        ))}
      </div>
    </FormCardWrapper>
  );
};

type ResumeHeaderProps = {
  userDetails: UserInfo;
};

"use client";
import { FormCardWrapper } from "./FormCardWrapper";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { HideButtons } from "@/components/UIButtons/HideButtons";
import { createResumeHeaderInfo } from "@/store/resumeHeaderInfo";
//import { useSession } from "next-auth/react";
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
    isLoading,
    updateBio,
    fetchDefaultHeader,
    //  fetchHeader,
  } = useResumeHeaderInfo();

  //const session = useSession();
  //const email = session.data?.user?.email;

  const { displayName } = headerInfo;
  const bio = headerInfo.bio;
  const contactInfo = headerInfo.contactInfo
    ? headerInfo.contactInfo
    : [{ contactName: "", contact: "" }];
  const location = headerInfo?.location ? headerInfo.location : "";
  const links = headerInfo.links
    ? headerInfo.links
    : [{ linkName: "", link: "" }];

  return (
    <FormCardWrapper
      cardTitle="Header"
      refreshFunction={() => fetchDefaultHeader()}
      isLoading={isLoading}
      //    refreshSection={() => fetchHeader()}
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

      <div className="my-2">
        <Label>Your Summary</Label>
        <Textarea
          placeholder="Tell us a bit about your contributions in different lines"
          value={bio}
          onChange={(e) => {
            updateBio(e.currentTarget.value);
          }}
          className="h-14 md:h-24"
        />
      </div>

      <div className="flex justify-between mt-2 whitespace-normal flex-wrap">
        {location !== "" ? (
          <HideButtons hide={hideLocation} setHide={() => setHideLocation()}>
            <span>Location</span>
          </HideButtons>
        ) : (
          <div></div>
        )}

        {links && links.length > 0
          ? links.map((link: any, index: any) => {
              if (link.linkName === "") {
                return null;
              }
              return (
                <HideButtons
                  key={index}
                  hide={hiddenLinks ? hiddenLinks[link.linkName] : false}
                  setHide={() => setHiddenLinks(link.linkName)}
                >
                  <span>{link.linkName}</span>
                </HideButtons>
              );
            })
          : null}

        {contactInfo && contactInfo.length > 0
          ? contactInfo.map((contact: any, index: any) => {
              if (contact.contactName === "") {
                return null;
              }
              return (
                <HideButtons
                  key={index}
                  hide={
                    hiddenContacts ? hiddenContacts[contact.contactName] : false
                  }
                  setHide={() => setHiddenContacts(contact.contactName)}
                >
                  <span>{contact.contactName}</span>
                </HideButtons>
              );
            })
          : null}
      </div>
    </FormCardWrapper>
  );
};

export default memo(ResumeHeader);

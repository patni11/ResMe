import { create } from "zustand";
import { UserInfo } from "@/app/(mainApp)/userInfo/pageType";
import { fetchResumeHeaderInfo } from "@/lib/actions/resumeHeaderInfo.actions";

type State = {
  headerInfo: UserInfo;
  hideLocation: boolean;
  hiddenContacts: any;
  hiddenLinks: any;
};

type Actions = {
  updateDisplayName: (newDisplayName: string) => void;
  setHideLocation: () => void;
  setHiddenLinks: (key: string) => void;
  setHiddenContacts: (key: string) => void;
};

export const useResumeHeaderInfo = create<State & Actions>((set) => ({
  headerInfo: {
    displayName: "Shubh Patni",
    contactInfo: [
      { contact: "shubhpatni2002@gmail.com" },
      { contact: "+91 7742361132" },
    ],
    location: "Boston, MA",
    links: [{ linkName: "website", link: "shubhpatni.com" }],
    email: "", //used to identify user
  },
  fetchHeaderInfo: async (email: string) => {
    const response: UserInfo = await fetchResumeHeaderInfo(
      "shubhpatni2002@gmail.com"
    );
    const hidContacts =
      response.contactInfo?.map((contact) => ({ [contact.contact]: false })) ||
      [];
    const hidLinks =
      response.links?.map((link) => ({ [link.linkName]: false })) || [];

    set({
      headerInfo: response,
      hiddenContacts: hidContacts,
      hiddenLinks: hidLinks,
      hideLocation: false,
    });
  },
  hideLocation: false,
  hiddenContacts: [
    { "shubhpatni2002@gmail.com": false },
    { "+91 7742361132": false },
  ] as Array<{ [key: string]: boolean }>,

  hiddenLinks: [{ website: false }] as Array<{ [key: string]: boolean }>,
  updateDisplayName: (newDisplayName: string) => {
    set((state) => {
      return {
        headerInfo: { ...state.headerInfo, displayName: newDisplayName },
      };
    });
  },
  setHideLocation: () => {
    set((state) => ({ hideLocation: !state.hideLocation }));
  },
  setHiddenContacts: (key: string) => {
    set((state) => ({
      hiddenContacts: state.hiddenContacts.map((contact: any) => {
        // Check if the contact has the key you're looking for
        if (contact[key] !== undefined) {
          // Return a new object with the key's value toggled
          return { [key]: !contact[key] };
        }
        // Otherwise, return the contact unchanged
        return contact;
      }),
    }));
  },
  setHiddenLinks: (key: string) => {
    set((state) => ({
      hiddenLinks: state.hiddenLinks.map((link: any) => {
        // Check if the contact has the key you're looking for
        if (link[key] !== undefined) {
          // Return a new object with the key's value toggled
          return { [key]: !link[key] };
        }
        // Otherwise, return the contact unchanged
        return link;
      }),
    }));
  },
}));

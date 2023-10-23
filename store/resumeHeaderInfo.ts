import { create } from "zustand";
import { UserInfo } from "@/app/(mainApp)/userInfo/pageType";
import { persist } from "zustand/middleware";
//import { fetchResumeHeaderInfo } from "@/lib/actions/resumeHeaderInfo.actions";

type State = {
  headerInfo: UserInfo;
  hideLocation: boolean;
  hiddenContacts: any;
  hiddenLinks: any;
  isLoading: boolean;
  error: any;
};

type Actions = {
  updateDisplayName: (newDisplayName: string) => void;
  setHideLocation: () => void;
  setHiddenLinks: (key: string) => void;
  setHiddenContacts: (key: string) => void;
  fetchHeaderInfo: () => Promise<void>;
};

const INITIAL_STATE: State = {
  headerInfo: {
    displayName: "",
    contactInfo: [{ contact: "" }],
    location: "",
    links: [{ linkName: "", link: "" }],
    email: "",
  },
  hideLocation: false,
  hiddenContacts: [{ key: false }],
  hiddenLinks: [{ key: false }],
  isLoading: false,
  error: null,
};

async function getData() {
  try {
    const res = await fetch(`/api/resumeHeaderInfo`);
    console.log("Fetched Data", res);
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    return res.json();
  } catch (e) {
    console.log("error loading topic in zustand:", e);
  }
}

export const useResumeHeaderInfo = create(
  persist<State & Actions>(
    (set, get) => ({
      headerInfo: INITIAL_STATE.headerInfo,
      error: INITIAL_STATE.error,
      isLoading: INITIAL_STATE.isLoading,
      fetchHeaderInfo: async () => {
        try {
          const headerInfo: UserInfo = (await getData()).headerInfo;

          console.log("Header Info", headerInfo);
          const hidContacts =
            headerInfo.contactInfo?.map((contact) => ({
              [contact.contact]: false,
            })) || [];
          const hidLinks =
            headerInfo.links?.map((link) => ({ [link.linkName]: false })) || [];

          set({
            headerInfo: headerInfo,
            hiddenContacts: hidContacts,
            hiddenLinks: hidLinks,
            hideLocation: false,
            isLoading: false,
          });
        } catch (error) {
          set({ error, isLoading: false });
        }
      },
      hideLocation: INITIAL_STATE.hideLocation,
      hiddenContacts: INITIAL_STATE.hiddenContacts as Array<{
        [key: string]: boolean;
      }>,

      hiddenLinks: INITIAL_STATE.hiddenLinks as Array<{
        [key: string]: boolean;
      }>,
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
    }),
    {
      name: "resumeHeaderLocalStorage",
    }
  )
);

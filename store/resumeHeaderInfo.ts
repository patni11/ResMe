// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
"use client";
import { create } from "zustand";
import { UserInfo } from "@/app/(mainApp)/userInfo/pageType";
import { persist } from "zustand/middleware";
import { getCleanedHeaderData } from "@/lib/apiFunctions";
//import { fetchResumeHeaderInfo } from "@/lib/actions/resumeHeaderInfo.actions";

export type State = {
  headerInfo: UserInfo;
  hideLocation: boolean;
  hiddenContacts: { [key: string]: boolean };
  hiddenLinks: { [key: string]: boolean };
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

const storeCache: Record<string, any> = {};

export const createResumeHeaderInfo = (resumeHeaderID: string) => {
  if (storeCache[resumeHeaderID]) {
    return storeCache[resumeHeaderID];
  }

  let INITIAL_STATE = {
    headerInfo: {
      displayName: "",
      contactInfo: [],
      location: "",
      links: [],
      email: "",
    },
    hideLocation: false,
    hiddenContacts: {},
    hiddenLinks: {},
    isLoading: false,
    error: null,
  };

  if (typeof window !== "undefined") {
    const savedState = localStorage.getItem(resumeHeaderID);
    if (savedState) {
      INITIAL_STATE = JSON.parse(savedState);
    }
  }

  const useResumeHeaderInfo = create(
    persist<State & Actions>(
      (set, get) => ({
        ...INITIAL_STATE,
        isLoading: false,
        error: null,
        fetchHeaderInfo: async () => {
          set({ isLoading: true });
          try {
            const data = await getCleanedHeaderData();
            set({ ...data, isLoading: false });
          } catch (error) {
            set({ error, isLoading: false });
          }
        },
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
        // setHiddenContacts: (key: string) => {
        //   set((state) => ({
        //     hiddenContacts: state.hiddenContacts.map((contact: any) => {
        //       // Check if the contact has the key you're looking for
        //       if (contact[key] !== undefined) {
        //         // Return a new object with the key's value toggled
        //         return { [key]: !contact[key] };
        //       }
        //       // Otherwise, return the contact unchanged
        //       return contact;
        //     }),
        //   }));
        // },
        setHiddenContacts: (key: string) => {
          set((state) => ({
            hiddenContacts: {
              ...state.hiddenContacts,
              [key]: !state.hiddenContacts[key],
            },
          }));
        },

        // setHiddenLinks: (key: string) => {
        //   set((state) => ({
        //     hiddenLinks: state.hiddenLinks.map((link: any) => {
        //       // Check if the contact has the key you're looking for
        //       if (link[key] !== undefined) {
        //         // Return a new object with the key's value toggled
        //         return { [key]: !link[key] };
        //       }
        //       // Otherwise, return the contact unchanged
        //       return link;
        //     }),
        //   }));
        // },
        setHiddenLinks: (key: string) => {
          set((state) => ({
            hiddenLinks: {
              ...state.hiddenLinks,
              [key]: !state.hiddenLinks[key],
            },
          }));
        },
      }),
      {
        name: resumeHeaderID,
      }
    )
  );

  storeCache[resumeHeaderID] = useResumeHeaderInfo;
  return () => useResumeHeaderInfo();
};

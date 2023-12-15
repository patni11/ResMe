"use client";
import { create } from "zustand";
import {
  CoverLetterSettings,
  initialCoverLetterSettings,
} from "@/lib/types/coverLetter/types";
import { persist } from "zustand/middleware";

//import { fetchResumeHeaderInfo } from "@/lib/actions/resumeHeaderInfo.actions";

export type State = CoverLetterSettings & {
  isLoading: boolean;
  error: any;
};

type Actions = {
  changeSettings: ({
    field,
    value,
  }: {
    field: keyof CoverLetterSettings;
    value: string; //change to currect type
  }) => void;
};

const storeCache: Record<string, any> = {};

export const createSettings = (coverLetterID: string) => {
  if (storeCache[coverLetterID]) {
    return storeCache[coverLetterID];
  }

  let INITIAL_STATE = initialCoverLetterSettings;

  if (typeof window !== "undefined") {
    const savedState = JSON.parse(localStorage.getItem(coverLetterID));
    if (savedState) {
      INITIAL_STATE = {
        ...INITIAL_STATE,
        ...savedState,
      };
    }
  }

  const useSettings = create(
    persist<State & Actions>(
      (set, get) => ({
        ...INITIAL_STATE,
        isLoading: false,
        error: null,
        changeSettings({ field, value }) {
          console.log("Changing field", field, value);
          set((state) => ({
            ...state,
            [field]: value,
          }));
        },
      }),
      {
        name: coverLetterID,
      }
    )
  );

  storeCache[coverLetterID] = useSettings;
  return () => useSettings();
};

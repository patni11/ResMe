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

export const createCoverLetterSettings = (coverLetterID: string) => {
  if (storeCache[coverLetterID]) {
    return storeCache[coverLetterID];
  }

  let INITIAL_STATE = initialCoverLetterSettings;

  if (typeof window !== "undefined") {
    // @ts-ignore
    const savedState = JSON.parse(localStorage.getItem(coverLetterID));
    if (savedState) {
      INITIAL_STATE = {
        ...INITIAL_STATE,
        ...savedState,
      };
    }
  }

  const useCoverLetterSettings = create(
    persist<State & Actions>(
      (set, get) => ({
        ...INITIAL_STATE,
        isLoading: false,
        error: null,
        changeSettings({ field, value }) {
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

  storeCache[coverLetterID] = useCoverLetterSettings;
  return () => useCoverLetterSettings();
};

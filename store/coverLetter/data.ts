"use client";
import { create } from "zustand";
import {
  CoverLetterData,
  initialCoverLetterData,
} from "@/lib/types/coverLetter/types";
import { persist } from "zustand/middleware";
import { fetchResumeHeaderInfo } from "@/lib/actions/resumeHeaderInfo.actions";
// import { fetchResumeHeaderInfo } from "@/lib/actions/resumeHeaderInfo.actions";
// import { useSession } from "next-auth/react" TODO: make it automated, user shouldn't have to enter their name, email etc

//import { fetchResumeHeaderInfo } from "@/lib/actions/resumeHeaderInfo.actions";

export type State = CoverLetterData & {
  isLoading: boolean;
  error: any;
};

type Actions = {
  changeData: ({
    field,
    value,
  }: {
    field: keyof CoverLetterData;
    value: string; //change to currect type
  }) => void;
};

const storeCache: Record<string, any> = {};

export const createCoverLetterData = (coverLetterID: string) => {
  if (storeCache[coverLetterID]) {
    return storeCache[coverLetterID];
  }
  // const { data: session, status } = useSession()

  let INITIAL_STATE = initialCoverLetterData;

  if (typeof window !== "undefined") {
    const savedState = localStorage.getItem(coverLetterID)
      ? // @ts-ignore
        JSON.parse(localStorage.getItem(coverLetterID))
      : null;

    if (savedState) {
      INITIAL_STATE = {
        ...INITIAL_STATE,
        ...savedState,
      };
    }
  }

  const useCoverLetterData = create(
    persist<State & Actions>(
      (set, get) => ({
        ...INITIAL_STATE,
        isLoading: false,
        error: null,
        changeData({ field, value }) {
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

  storeCache[coverLetterID] = useCoverLetterData;
  return () => useCoverLetterData();
};

"use client";
import { create } from "zustand";
import {
  CoverLetterData,
  initialCoverLetterData,
} from "@/lib/types/coverLetter/types";
import { persist } from "zustand/middleware";
import { fetchResumeHeaderInfo } from "@/lib/actions/resumeHeaderInfo.actions";

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
  let INITIAL_STATE = initialCoverLetterData;

  async function initializeCoverLetterData() {
    const headerInfo = await fetchResumeHeaderInfo();
    INITIAL_STATE.userData.name = headerInfo?.displayName || "";
    headerInfo?.contactInfo?.forEach((contactInfo) => {
      if (contactInfo.contactName == "Email") {
        INITIAL_STATE.userData.email = `Email: ${contactInfo.contact}`;
      }

      if (contactInfo.contactName == "Phone") {
        INITIAL_STATE.userData.phone = `Phone: ${contactInfo.contact}`;
      }
    });

    INITIAL_STATE.userData.address = `Location: ${headerInfo?.location || ""}`;
  }
  initializeCoverLetterData();

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

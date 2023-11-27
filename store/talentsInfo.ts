// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { getCleanedTalentsData } from "@/lib/apiFunctions";
import { fetchResumeSection } from "@/lib/actions/resumes.action";
//import { fetchResumeHeaderInfo } from "@/lib/actions/resumeHeaderInfo.actions";
export type State = {
  skills: string;
  languages: string;
  interests: string;
  hideSkills: boolean;
  hideLanguages: boolean;
  hideInterests: boolean;
  isLoading: boolean;
  error: any;
};

type Actions = {
  fetchDefaultTalent: () => Promise<void>;
  setHideSkills: () => void;
  setSkills: (newSkills: string) => void;
  setInterests: (newInterests: string) => void;
  setLanguages: (newLanguages: string) => void;
  setHideLanguages: () => void;
  setHideInterests: () => void;
  fetchTalents: () => Promise<void>;
};

const storeCache: Record<string, any> = {};

export const createTalentsInfo = (talentsID: string) => {
  if (storeCache[talentsID]) {
    return storeCache[talentsID];
  }

  let INITIAL_STATE = {
    skills: "",
    languages: "",
    interests: "",
    hideSkills: false,
    hideLanguages: false,
    hideInterests: false,
    isLoading: false,
    error: null,
  };

  if (typeof window !== "undefined") {
    const savedState = JSON.parse(localStorage.getItem(talentsID));
    if (savedState) {
      INITIAL_STATE = {
        ...INITIAL_STATE,
        ...savedState,
      };
    }
  }

  const useTalentsInfo = create(
    persist<State & Actions>(
      (set, get) => ({
        ...INITIAL_STATE,
        isLoading: false,
        error: null,
        fetchDefaultTalent: async () => {
          set({ isLoading: true });
          try {
            // const skills: string[] =
            //   (await getData()).skills || INITIAL_STATE.skills;

            const talent = await getCleanedTalentsData();

            set({ ...talent, isLoading: false });
          } catch (error) {
            set({ error, isLoading: false });
          }
        },
        fetchTalents: async () => {
          set({ isLoading: true });
          const id = talentsID.split("-").slice(2).join("-");
          try {
            const data = await fetchResumeSection(
              id,
              "skills languages interests"
            );
            set({ ...data, isLoading: false });
          } catch (error) {
            set({ error, isLoading: false });
          }
        },
        setHideSkills: () => {
          set((state) => {
            return {
              hideSkills: !state.hideSkills,
            };
          });
        },
        setSkills: (newSkills: string) => {
          set((state) => {
            return {
              skills: newSkills,
            };
          });
        },
        setHideLanguages: () => {
          set((state) => {
            return {
              hideLanguages: !state.hideLanguages,
            };
          });
        },
        setLanguages: (newLanguages: string) => {
          set((state) => {
            return {
              languages: newLanguages,
            };
          });
        },
        setHideInterests: () => {
          set((state) => {
            return {
              hideInterests: !state.hideInterests,
            };
          });
        },
        setInterests: (newInterests: string) => {
          set((state) => {
            return {
              interests: newInterests,
            };
          });
        },
      }),
      {
        name: talentsID,
      }
    )
  );

  storeCache[talentsID] = useTalentsInfo;
  return () => useTalentsInfo();
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { create } from "zustand";
import { persist } from "zustand/middleware";
//import { fetchResumeHeaderInfo } from "@/lib/actions/resumeHeaderInfo.actions";
type State = {
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
  fetchAll: () => void;
  setHideSkills: () => void;
  setSkills: (newSkills: string) => void;
  setInterests: (newInterests: string) => void;
  setLanguages: (newLanguages: string) => void;
  setHideLanguages: () => void;
  setHideInterests: () => void;
};

const INITIAL_STATE: State = {
  skills: "",
  languages: "",
  interests: "",
  hideSkills: false,
  hideLanguages: false,
  hideInterests: false,
  isLoading: false,
  error: null,
};

async function getData() {
  try {
    const res = await fetch(`/api/skills`);

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    return res.json();
  } catch (e) {
    console.log("error loading topic in zustand:", e);
  }
}

const storeCache: Record<string, any> = {};

export const createTalentsInfo = (talentsID: string) => {
  if (storeCache[talentsID]) {
    return storeCache[talentsID];
  }

  const useTalentsInfo = create(
    persist<State & Actions>(
      (set, get) => ({
        ...INITIAL_STATE, // Spread the initial state
        fetchAll: async () => {
          set({ isLoading: true });
          try {
            // const skills: string[] =
            //   (await getData()).skills || INITIAL_STATE.skills;

            const talent: {
              skills: string[];
              languages: string[];
              interests: string[];
            } = (await getData()) || [];

            set({
              skills: talent.skills.join(", "),
              interests: talent.interests.join(", "),
              languages: talent.languages.join(", "),
              isLoading: false,
            });
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

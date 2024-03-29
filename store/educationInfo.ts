// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { create } from "zustand";
import { EducationStore } from "@/lib/types/types";
import { persist } from "zustand/middleware";
import { getCleanedEducationData } from "@/lib/apiFunctions";
import { fetchResumeSection } from "@/lib/actions/resumes.action";

export type State = EducationStore & {
  isLoading: boolean;
  error: any;
};

type Actions = {
  updateRelevantCourseWork: (coursework: string) => void;
  setHiddenEducation: (key: string) => void;
  setHiddenGPAs: (key: string) => void;
  setHiddenDates: (key: string) => void;
  fetchDefaultEducations: () => Promise<void>;
  setHideAll: () => void;
  fetchEducations: () => Promise<void>;
};

const storeCache: Record<string, any> = {};

export const createEducationInfo = (educationHeaderID: string) => {
  if (storeCache[educationHeaderID]) {
    return storeCache[educationHeaderID];
  }

  let INITIAL_STATE = {
    educations: [], // should be []
    hiddenGPAs: null,
    hiddenEducations: null, //should be null
    hiddenDates: null,
    hideAll: false,
    relevantCourseWork: "",
    isLoading: false,
    error: null,
  };

  if (typeof window !== "undefined") {
    const savedState = JSON.parse(localStorage.getItem(educationHeaderID));
    if (savedState) {
      INITIAL_STATE = {
        ...INITIAL_STATE,
        ...savedState,
      };
    }
  }
  const useEducationsInfo = create(
    persist<State & Actions>(
      (set, get) => ({
        ...INITIAL_STATE,
        isLoading: false,
        error: null,
        fetchDefaultEducations: async () => {
          set({ isLoading: true });
          try {
            const educations = await getCleanedEducationData();

            set({ ...educations, isLoading: false });
          } catch (error) {
            set({ error, isLoading: false });
          }
        },
        fetchEducations: async () => {
          set({ isLoading: true });
          const id = educationHeaderID.split("-").slice(2).join("-");
          try {
            const data = await fetchResumeSection(id, "educations");
            set({ ...data.educations, isLoading: false });
          } catch (error) {
            set({ error, isLoading: false });
          }
        },
        updateRelevantCourseWork: (coursework: string) => {
          set(() => {
            return {
              relevantCourseWork: coursework,
            };
          });
        },

        setHiddenEducation: (key: string) => {
          set((state) => {
            if (!state.hiddenEducations) return { hiddenEducations: null };

            return {
              hiddenEducations: {
                ...state.hiddenEducations,
                [key]: !state.hiddenEducations[key],
              },
            };
          });
        },
        setHiddenGPAs: (key: string) => {
          set((state) => {
            if (!state.hiddenGPAs) return { hiddenGPAs: null };

            return {
              hiddenGPAs: {
                ...state.hiddenGPAs,
                [key]: !state.hiddenGPAs[key],
              },
            };
          });
        },
        setHiddenDates: (key: string) => {
          set((state) => {
            if (!state.hiddenDates) return { hiddenDates: null };

            return {
              hiddenDates: {
                ...state.hiddenDates,
                [key]: !state.hiddenDates[key],
              },
            };
          });
        },
        setHideAll: () => {
          set((state) => {
            return {
              hideAll: !state.hideAll,
            };
          });
        },
      }),
      {
        name: educationHeaderID,
      }
    )
  );

  storeCache[educationHeaderID] = useEducationsInfo;
  return () => useEducationsInfo();
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { create } from "zustand";
import { EducationType } from "@/app/(mainApp)/education/pageTypes";
import { persist } from "zustand/middleware";
import { getCleanedEducationData } from "@/lib/apiFunctions";
//import { fetchResumeHeaderInfo } from "@/lib/actions/resumeHeaderInfo.actions";

export type State = {
  educations: EducationType[] | [];
  hiddenEducations: { [key: string]: boolean } | null;
  hiddenGPAs: { [key: string]: boolean } | null;
  hiddenDates: { [key: string]: boolean } | null;
  hideAll: boolean;
  relevantCourseWork: string;
  isLoading: boolean;
  error: any;
};

type Actions = {
  updateRelevantCourseWork: (coursework: string) => void;
  setHiddenEducation: (key: string) => void;
  setHiddenGPAs: (key: string) => void;
  setHiddenDates: (key: string) => void;
  fetchEducations: () => void;
  setHideAll: () => void;
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
    const savedState = localStorage.getItem(educationHeaderID);
    if (savedState) {
      INITIAL_STATE = JSON.parse(savedState);
    }
  }
  const useEducationsInfo = create(
    persist<State & Actions>(
      (set, get) => ({
        ...INITIAL_STATE,
        isLoading: false,
        error: null,
        fetchEducations: async () => {
          set({ isLoading: true });
          try {
            const educations = await getCleanedEducationData();

            set({ ...educations, isLoading: false });
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

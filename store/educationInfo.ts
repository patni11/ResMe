// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { create } from "zustand";
import { EducationType } from "@/app/(mainApp)/education/pageTypes";
import { persist } from "zustand/middleware";
//import { fetchResumeHeaderInfo } from "@/lib/actions/resumeHeaderInfo.actions";

type State = {
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
  //updateDisplayName: (newDisplayName: string) => void;
  //setHideLocation: () => void;
  //setHiddenGPAs: (key: string) => void;
  //fetchHeaderInfo: (email: string) => Promise<void>;
};

// const generateSetHidden = (
//   stateKey: keyof Omit<
//     State,
//     "educations" | "relevantCourseWork" | "isLoading" | "error"
//   >
// ) => {
//   return (key: string) => (set: any, get: any) => {
//     const state = get();
//     console.log("State:", state[stateKey]);
//     if (!state[stateKey]) return { [stateKey]: null };

//     return {
//       [stateKey]: {
//         ...state[stateKey],
//         [key]: !state[stateKey][key],
//       },
//     };
//   };
// };

const INITIAL_STATE: State = {
  educations: [], // should be []
  hiddenGPAs: null,
  hiddenEducations: null, //should be null
  hiddenDates: null,
  hideAll: false,
  relevantCourseWork: "",
  isLoading: false,
  error: null,
};

async function getData() {
  try {
    const res = await fetch(`/api/educationsInfo`);

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    return res.json();
  } catch (e) {
    console.log("error loading topic in zustand:", e);
  }
}

const storeCache: Record<string, any> = {};

export const createEducationInfo = (educationHeaderID: string) => {
  if (storeCache[educationHeaderID]) {
    return storeCache[educationHeaderID];
  }

  const useEducationsInfo = create(
    persist<State & Actions>(
      (set, get) => ({
        ...INITIAL_STATE, // Spread the initial state
        fetchEducations: async () => {
          set({ isLoading: true });
          try {
            const educations: EducationType[] | null =
              (await getData()).educations || INITIAL_STATE.educations;

            const hiddenGPAs = educations
              ? educations.reduce((acc, education) => {
                  acc[education._id] = false;
                  return acc;
                }, {} as { [key: string]: boolean })
              : null;

            const hiddenEducations = educations
              ? educations.reduce((acc, education) => {
                  acc[education._id] = false;
                  return acc;
                }, {} as { [key: string]: boolean })
              : null;

            const hiddenDates = educations
              ? educations.reduce((acc, education) => {
                  acc[education._id] = false;
                  return acc;
                }, {} as { [key: string]: boolean })
              : null;

            set({
              educations: educations ? educations : [],
              hiddenDates: hiddenDates,
              hiddenEducations: hiddenEducations,
              hiddenGPAs: hiddenGPAs,
              isLoading: false,
            });
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

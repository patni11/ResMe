// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { create } from "zustand";
import { Experience } from "@/app/(mainApp)/experience/pageTypes";
import { persist } from "zustand/middleware";
//import { fetchResumeHeaderInfo } from "@/lib/actions/resumeHeaderInfo.actions";

type State = {
  experiences:
    | {
        _id: string;
        company: string;
        location: string;
        positionTitle: string;
        experienceType: string;
        startDate: Date;
        endDate: Date | "working";
        description: string[];
      }[]
    | [];
  hiddenExperiences: { [key: string]: boolean } | null;
  hideAll: boolean;
  isLoading: boolean;
  error: any;
};

type Actions = {
  setHiddenExperience: (key: string) => void;
  fetchExperiences: () => void;
  updateDescriptions: (
    key: string,
    idx: number,
    newDescription: string
  ) => void;
  deleteDescription: (key: string, idx: number) => void;
  addDescription: (key: string) => void;
  setHideAll: () => void;
  moveExpUp: (index: number) => void;
  moveExpDown: (index: number) => void;
};

const INITIAL_STATE: State = {
  experiences: [], // should be []
  hiddenExperiences: {}, //should be null
  hideAll: false,
  isLoading: false,
  error: null,
};

const storeCache: Record<string, any> = {};

async function getData() {
  try {
    const res = await fetch(`/api/experiencesInfo`);

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    return res.json();
  } catch (e) {
    console.log("error loading topic in zustand:", e);
  }
}

export const createExperienceInfo = (experienceID: string) => {
  if (storeCache[experienceID]) {
    return storeCache[experienceID];
  }

  const useExperiencesInfo = create(
    persist<State & Actions>(
      (set, get) => ({
        ...INITIAL_STATE, // Spread the initial state
        fetchExperiences: async () => {
          set({ isLoading: true });
          try {
            const experiences: Experience[] | [] =
              (await getData()).experiences || INITIAL_STATE.experiences;

            const hiddenExperiences = experiences
              ? experiences.reduce((acc, experience) => {
                  acc[experience._id] = false;
                  return acc;
                }, {} as { [key: string]: boolean })
              : null;

            set({
              experiences: experiences,

              hiddenExperiences: hiddenExperiences,

              isLoading: false,
            });
          } catch (error) {
            set({ error, isLoading: false });
          }
        },
        moveExpUp: (index: number) => {
          if (index === 0) return;
          set((state) => {
            const newExperiences = [...state.experiences];
            [newExperiences[index], newExperiences[index - 1]] = [
              newExperiences[index - 1],
              newExperiences[index],
            ];
            return { experiences: newExperiences }; // make sure to return the new state
          });
        },
        moveExpDown: (index) => {
          const experiences = get().experiences;
          if (index === experiences.length - 1) return;
          set((state) => {
            const newExperiences = [...state.experiences];
            // Swap the current item with the one below it
            [newExperiences[index], newExperiences[index + 1]] = [
              newExperiences[index + 1],
              newExperiences[index],
            ];
            return { experiences: newExperiences }; // make sure to return the new state
          });
        },
        updateDescriptions: (
          key: string,
          idx: number,
          newDescription: string
        ) => {
          set((state) => {
            return {
              experiences: state.experiences.map((experience) => {
                if (experience._id === key) {
                  const updatedDescriptionArray = [...experience.description];
                  updatedDescriptionArray[idx] = newDescription;
                  return {
                    ...experience,
                    description: updatedDescriptionArray,
                  };
                }
                return experience;
              }),
            };
          });
        },
        deleteDescription: (key: string, idx: number) => {
          set((state) => {
            return {
              experiences: state.experiences.map((experience) => {
                if (experience._id === key) {
                  const updatedDescriptionArray = [...experience.description];
                  updatedDescriptionArray.splice(idx, 1);
                  return {
                    ...experience,
                    description: updatedDescriptionArray,
                  };
                }
                return experience;
              }),
            };
          });
        },
        addDescription: (key: string) => {
          set((state) => {
            const updatedExperience = state.experiences.map((experience) => {
              if (experience._id === key) {
                return {
                  ...experience,
                  description: [...experience.description, ""],
                };
              }
              return experience;
            });
            return { experiences: updatedExperience };
          });
        },

        setHiddenExperience: (key: string) => {
          set((state) => {
            if (!state.hiddenExperiences) return { hiddenExperiences: null };

            return {
              hiddenExperiences: {
                ...state.hiddenExperiences,
                [key]: !state.hiddenExperiences[key],
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
        name: experienceID,
      }
    )
  );

  storeCache[experienceID] = useExperiencesInfo;
  return () => useExperiencesInfo();
};

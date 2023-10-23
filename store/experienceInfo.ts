import { create } from "zustand";
import { Experience } from "@/app/(mainApp)/experience/pageTypes";
import { persist } from "zustand/middleware";
//import { fetchResumeHeaderInfo } from "@/lib/actions/resumeHeaderInfo.actions";

type State = {
  experiences: Experience[] | [];
  hiddenExperiences: { [key: string]: boolean } | null;
  hideAll: boolean;
  descriptions: { [key: string]: string } | null;
  isLoading: boolean;
  error: any;
};

type Actions = {
  setHiddenExperience: (key: string) => void;
  fetchExperiences: () => void;
  updateDescriptions: (key: string, newDescription: string) => void;
  setHideAll: () => void;
};

const ExampleExperiences = [
  {
    _id: "fd7aabe8-c0f7-41da-b78e-c0866b42d4b2",
    company: "DAO Maker",
    location: "Remote",
    positionTitle: "Researcher",
    experienceType: "Intern",
    startDate: new Date(),
    endDate: new Date(),
    description: `Spearheaded the creation of Norswap, the proprietary exchange platform for Nordek Chain
    Proficiently designed and implemented the Frontend, Backend, API endpoints, and seamlessly integrated Smart Contracts within Norswap`,
  },
  {
    _id: "c0f7-41da-b78e-c0866b42d4b2",
    company: "DAO Maker",
    location: "Remote",
    positionTitle: "Researcher",
    experienceType: "Intern",
    startDate: new Date(),
    endDate: new Date(),
    description: `Spearheaded the creation of Norswap, the proprietary exchange platform for Nordek Chain
    Proficiently designed and implemented the Frontend, Backend, API endpoints, and seamlessly integrated Smart Contracts within Norswap`,
  },
];

const INITIAL_STATE: State = {
  experiences: ExampleExperiences, // should be []
  hiddenExperiences: {
    "fd7aabe8-c0f7-41da-b78e-c0866b42d4b2": false,
    "c0f7-41da-b78e-c0866b42d4b2": true,
  }, //should be null
  hideAll: false,
  descriptions: {
    "fd7aabe8-c0f7-41da-b78e-c0866b42d4b2": ExampleExperiences[0].description,
    "c0f7-41da-b78e-c0866b42d4b2": ExampleExperiences[1].description,
  },
  isLoading: false,
  error: null,
};

async function getData() {
  try {
    const res = await fetch(`/api/experiencesInfo`);
    console.log("Fetched Data", res);
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    return res.json();
  } catch (e) {
    console.log("error loading topic in zustand:", e);
  }
}

export const useExperiencesInfo = create(
  persist<State & Actions>(
    (set, get) => ({
      ...INITIAL_STATE, // Spread the initial state
      fetchExperiences: async () => {
        try {
          const experiences: Experience[] | null =
            (await getData()).experiences || INITIAL_STATE.experiences;

          console.log("Experiences Info", experiences);

          const hiddenExperiences = experiences
            ? experiences.reduce((acc, experience) => {
                acc[experience._id] = false;
                return acc;
              }, {} as { [key: string]: boolean })
            : null;

          set({
            experiences: experiences ? experiences : [],

            hiddenExperiences: hiddenExperiences,

            isLoading: false,
          });
        } catch (error) {
          set({ error, isLoading: false });
        }
      },
      updateDescriptions: (key: string, newDescription: string) => {
        set((state) => {
          return {
            experiences: state.experiences.map((experience) =>
              experience._id === key
                ? { ...experience, description: newDescription }
                : experience
            ),
          };
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
      name: "experiencesLocalStorage",
    }
  )
);

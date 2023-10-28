import { create } from "zustand";
import { persist } from "zustand/middleware";
//import { fetchResumeHeaderInfo } from "@/lib/actions/resumeHeaderInfo.actions";

type State = {
  skills: string;
  hideAll: boolean;
  isLoading: boolean;
  error: any;
};

type Actions = {
  fetchSkills: () => void;
  setHideAll: () => void;
  setSkills: (newSkills: string) => void;
};

const INITIAL_STATE: State = {
  skills: "", // should be []
  hideAll: false,
  isLoading: false,
  error: null,
};

async function getData() {
  try {
    const res = await fetch(`/api/skills`);
    console.log("Fetched Data", res);
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    return res.json();
  } catch (e) {
    console.log("error loading topic in zustand:", e);
  }
}

export const useSkillsInfo = create(
  persist<State & Actions>(
    (set, get) => ({
      ...INITIAL_STATE, // Spread the initial state
      fetchSkills: async () => {
        try {
          const skills: string[] =
            (await getData()).skills || INITIAL_STATE.skills;

          console.log("Skills", skills);
          set({
            skills: skills.join(", "),
            isLoading: false,
          });
        } catch (error) {
          set({ error, isLoading: false });
        }
      },

      setHideAll: () => {
        set((state) => {
          return {
            hideAll: !state.hideAll,
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
    }),
    {
      name: "projectsLocalStorage",
    }
  )
);

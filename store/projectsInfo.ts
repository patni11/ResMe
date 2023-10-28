import { create } from "zustand";
import { Project } from "@/app/(mainApp)/projects/pageTypes";
import { persist } from "zustand/middleware";
//import { fetchResumeHeaderInfo } from "@/lib/actions/resumeHeaderInfo.actions";

type State = {
  projects: Project[] | [];
  hiddenProjects: { [key: string]: boolean } | null;
  hideAll: boolean;
  descriptions: { [key: string]: string } | null;
  isLoading: boolean;
  error: any;
};

type Actions = {
  setHiddenProject: (key: string) => void;
  fetchProjects: () => void;
  updateDescriptions: (key: string, newDescription: string) => void;
  setHideAll: () => void;
};

const ExampleProjects = [
  {
    _id: "b958ea1e-7c08-4008-910f-f3a07a97b51b",
    description:
      "Designed and deployed a personal website using Next.js, TypeScript, and hosted on Vercel, showcasing an extensive collection of over 100 articles and a myriad of personal projects.\nCrafted an intuitive user experience, ensuring seamless navigation and optimal engagement for visitors exploring my professional journey and insights.\n",
    location: "",
    positionTitle: "",
    projectName: "Portfolio Website",
  },
  {
    _id: "7c08-4008-910f-f3a07a97b51b",
    description:
      "Designed and deployed a personal website using Next.js, TypeScript, and hosted on Vercel, showcasing an extensive collection of over 100 articles and a myriad of personal projects.\nCrafted an intuitive user experience, ensuring seamless navigation and optimal engagement for visitors exploring my professional journey and insights.\n",
    location: "",
    positionTitle: "",
    projectName: "Portfolio Website",
    startDate: new Date(),
    endDate: new Date(),
  },
];

const INITIAL_STATE: State = {
  projects: ExampleProjects, // should be []
  hiddenProjects: {
    "b958ea1e-7c08-4008-910f-f3a07a97b51b": false,
    "7c08-4008-910f-f3a07a97b51b": true,
  }, //should be null
  hideAll: false,
  descriptions: {
    "b958ea1e-7c08-4008-910f-f3a07a97b51b": ExampleProjects[0].description,
    "7c08-4008-910f-f3a07a97b51b": ExampleProjects[1].description,
  },
  isLoading: false,
  error: null,
};

async function getData() {
  try {
    const res = await fetch(`/api/projectsInfo`);
    console.log("Fetched Data", res);
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    return res.json();
  } catch (e) {
    console.log("error loading topic in zustand:", e);
  }
}

export const useProjectsInfo = create(
  persist<State & Actions>(
    (set, get) => ({
      ...INITIAL_STATE, // Spread the initial state
      fetchProjects: async () => {
        try {
          const projects: Project[] | null =
            (await getData()).projects || INITIAL_STATE.projects;

          console.log("Projects Info", projects);

          const hiddenProjects = projects
            ? projects.reduce((acc, project) => {
                acc[project._id] = false;
                return acc;
              }, {} as { [key: string]: boolean })
            : null;

          set({
            projects: projects ? projects : [],

            hiddenProjects: hiddenProjects,

            isLoading: false,
          });
        } catch (error) {
          set({ error, isLoading: false });
        }
      },
      updateDescriptions: (key: string, newDescription: string) => {
        set((state) => {
          return {
            projects: state.projects.map((project) =>
              project._id === key
                ? { ...project, description: newDescription }
                : project
            ),
          };
        });
      },

      setHiddenProject: (key: string) => {
        set((state) => {
          if (!state.hiddenProjects) return { hiddenProjects: null };

          return {
            hiddenProjects: {
              ...state.hiddenProjects,
              [key]: !state.hiddenProjects[key],
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
      name: "projectsLocalStorage",
    }
  )
);

import { create } from "zustand";
import { Project } from "@/app/(mainApp)/projects/pageTypes";
import { persist } from "zustand/middleware";
//import { fetchResumeHeaderInfo } from "@/lib/actions/resumeHeaderInfo.actions";

type State = {
  projects:
    | {
        projectName: string;
        location?: string;
        positionTitle?: string;
        startDate?: Date;
        endDate?: Date;
        description: string[];
        _id: string;
      }[]
    | [];
  hiddenProjects: { [key: string]: boolean } | null;
  hiddenLocation: { [key: string]: boolean } | null;
  hiddenDates: { [key: string]: boolean } | null;
  hiddenPosition: { [key: string]: boolean } | null;
  hideAll: boolean;
  // descriptions: { [key: string]: string } | null;
  isLoading: boolean;
  error: any;
};

type Actions = {
  setHiddenProject: (key: string) => void;
  setHiddenDates: (key: string) => void;
  setHiddenLocation: (key: string) => void;
  setHiddenPosition: (key: string) => void;
  fetchProjects: () => void;
  updateDescriptions: (
    key: string,
    idx: number,
    newDescription: string
  ) => void;
  deleteDescription: (key: string, idx: number) => void;
  setHideAll: () => void;
  addDescription: (key: string) => void;
};

const INITIAL_STATE: State = {
  projects: [], // should be []
  hiddenProjects: {}, //should be null
  hiddenLocation: {},
  hiddenDates: {},
  hiddenPosition: {},
  hideAll: false,
  isLoading: false,
  error: null,
};

const storeCache: Record<string, any> = {};

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

export const createProjectsSection = (projectId: string) => {
  if (storeCache[projectId]) {
    return storeCache[projectId];
  }

  const useProjectsInfo = create(
    persist<State & Actions>(
      (set, get) => ({
        ...INITIAL_STATE, // Spread the initial state
        fetchProjects: async () => {
          try {
            const projects: Project[] | [] =
              (await getData()).projects || INITIAL_STATE.projects;

            const hiddenProjects = projects
              ? projects.reduce((acc, project) => {
                  acc[project._id] = false;
                  return acc;
                }, {} as { [key: string]: boolean })
              : null;

            const hiddenDates = projects
              ? projects.reduce((acc, project) => {
                  acc[project._id] = false;
                  return acc;
                }, {} as { [key: string]: boolean })
              : null;

            const hiddenLocation = projects
              ? projects.reduce((acc, project) => {
                  acc[project._id] = false;
                  return acc;
                }, {} as { [key: string]: boolean })
              : null;

            const hiddenPosition = projects
              ? projects.reduce((acc, project) => {
                  acc[project._id] = false;
                  return acc;
                }, {} as { [key: string]: boolean })
              : null;

            console.log("Projects Info", projects);

            set({
              projects: projects,

              hiddenProjects: hiddenProjects,
              hiddenDates: hiddenDates,
              hiddenLocation: hiddenLocation,
              hiddenPosition: hiddenPosition,

              isLoading: false,
            });
          } catch (error) {
            set({ error, isLoading: false });
          }
        },
        updateDescriptions: (
          key: string,
          idx: number,
          newDescription: string
        ) => {
          set((state) => {
            return {
              projects: state.projects.map((project) => {
                if (project._id === key) {
                  const updatedDescriptionArray = [...project.description];
                  updatedDescriptionArray[idx] = newDescription;
                  return { ...project, description: updatedDescriptionArray };
                }
                return project;
              }),
            };
          });
        },
        deleteDescription: (key: string, idx: number) => {
          set((state) => {
            return {
              projects: state.projects.map((project) => {
                if (project._id === key) {
                  const updatedDescriptionArray = [...project.description];
                  updatedDescriptionArray.splice(idx, 1);
                  return { ...project, description: updatedDescriptionArray };
                }
                return project;
              }),
            };
          });
        },
        addDescription: (key: string) => {
          set((state) => {
            const updatedProjects = state.projects.map((project) => {
              if (project._id === key) {
                return {
                  ...project,
                  description: [...project.description, ""],
                };
              }
              return project;
            });
            return { projects: updatedProjects };
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
        setHiddenLocation: (key: string) => {
          set((state) => {
            if (!state.hiddenLocation) return { hiddenLocation: null };

            return {
              hiddenLocation: {
                ...state.hiddenLocation,
                [key]: !state.hiddenLocation[key],
              },
            };
          });
        },
        setHiddenPosition: (key: string) => {
          set((state) => {
            if (!state.hiddenPosition) return { hiddenPosition: null };

            return {
              hiddenPosition: {
                ...state.hiddenPosition,
                [key]: !state.hiddenPosition[key],
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
        name: projectId,
      }
    )
  );

  storeCache[projectId] = useProjectsInfo;
  return () => useProjectsInfo();
};

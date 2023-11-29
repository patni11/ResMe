// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { getCleanedProjectData } from "@/lib/apiFunctions";
import { fetchResumeSection } from "@/lib/actions/resumes.action";
import { ProjectStore } from "@/lib/types";
//import { fetchResumeHeaderInfo } from "@/lib/actions/resumeHeaderInfo.actions";

export type State = ProjectStore & {
  isLoading: boolean;
  error: any;
};

type Actions = {
  setHiddenProject: (key: string) => void;
  setHiddenDates: (key: string) => void;
  setHiddenLocation: (key: string) => void;
  setHiddenPosition: (key: string) => void;
  fetchDefaultProjects: () => Promise<void>;
  fetchProjects: () => Promise<void>;
  updateDescriptions: (
    key: string,
    idx: number,
    newDescription: string
  ) => void;
  deleteDescription: (key: string, idx: number) => void;
  setHideAll: () => void;
  addDescription: (key: string) => void;
  moveProjUp: (index: number) => void;
  moveProjDown: (index: number) => void;
};

const storeCache: Record<string, any> = {};

export const createProjectsSection = (projectId: string) => {
  if (storeCache[projectId]) {
    return storeCache[projectId];
  }

  let INITIAL_STATE = {
    projects: [], // should be []
    hiddenProjects: {}, //should be null
    hiddenLocation: {},
    hiddenDates: {},
    hiddenPosition: {},
    hideAll: false,
    isLoading: false,
    error: null,
  };

  if (typeof window !== "undefined") {
    const savedState = JSON.parse(localStorage.getItem(projectId));
    if (savedState) {
      INITIAL_STATE = {
        ...INITIAL_STATE,
        ...savedState,
      };
    }
  }

  const useProjectsInfo = create(
    persist<State & Actions>(
      (set, get) => ({
        ...INITIAL_STATE,
        isLoading: false,
        error: null,
        fetchDefaultProjects: async () => {
          set({ isLoading: true });
          try {
            const projects = await getCleanedProjectData();

            set({ ...projects, isLoading: false });
          } catch (error) {
            set({ error, isLoading: false });
          }
        },
        fetchProjects: async () => {
          set({ isLoading: true });
          const id = projectId.split("-").slice(2).join("-");
          try {
            const data = await fetchResumeSection(id, "projects");
            set({ ...data.projects, isLoading: false });
          } catch (error) {
            set({ error, isLoading: false });
          }
        },
        moveProjUp: (index: number) => {
          if (index === 0) return;
          set((state) => {
            const newProjects = [...state.projects];
            [newProjects[index], newProjects[index - 1]] = [
              newProjects[index - 1],
              newProjects[index],
            ];
            return { projects: newProjects }; // make sure to return the new state
          });
        },
        moveProjDown: (index) => {
          const projects = get().projects;
          if (index === projects.length - 1) return;
          set((state) => {
            const newProjects = [...state.projects];
            // Swap the current item with the one below it
            [newProjects[index], newProjects[index + 1]] = [
              newProjects[index + 1],
              newProjects[index],
            ];
            return { projects: newProjects }; // make sure to return the new state
          });
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

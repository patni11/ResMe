"use client";
import { create } from "zustand";
import {
  Layout,
  Sidebar,
  initialLayoutState,
} from "@/lib/types/coverLetter/types";

//import { fetchResumeHeaderInfo } from "@/lib/actions/resumeHeaderInfo.actions";

export type State = Layout & {
  isLoading: boolean;
  error: any;
};

type Actions = {
  toggleSidebar: (bar: Sidebar) => void;
  toggleEditing: () => void;
};

export const useSettings = create<State & Actions>((set, get) => ({
  ...initialLayoutState,
  isLoading: false,
  error: null,
  toggleSidebar: (bar) => {
    set((state) => ({
      ...state,
      sidebar: {
        ...state.sidebar,
        [bar]: {
          open: !state.sidebar[bar].open,
        },
      },
    }));
  },
  toggleEditing: () => {
    set((state) => {
      return {
        ...state,
        isEditing: !state.isEditing,
      };
    });
  },
}));

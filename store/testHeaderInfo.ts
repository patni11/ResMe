import { create } from "zustand";
import { persist } from "zustand/middleware";

type State = {
  displayName: string;
};

type Actions = {
  updateDisplayName: (newDisplayName: string) => void;
};

const storeCache: Record<string, any> = {};

export const testResumeInfo = (
  displayName: string = "",
  resumeId: string = "testResumeInfoLocalStorage"
) => {
  // Return the store from cache if it already exists
  if (storeCache[resumeId]) {
    return storeCache[resumeId];
  }

  // Store creation
  const store = create(
    persist<State & Actions>(
      (set, get) => ({
        displayName: displayName,
        updateDisplayName: (newDisplayName: string) => {
          set((state) => {
            return {
              displayName: newDisplayName,
            };
          });
        },
      }),
      {
        name: resumeId,
      }
    )
  );

  storeCache[resumeId] = store;
  return () => store();
};

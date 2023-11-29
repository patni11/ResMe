import { createContext, useContext } from "react";
type PreviewData = {
  email: string;
  resumeId: string;
  isSubscribed: boolean;
  name: string;
};
export const ResumeDataProvider = createContext<PreviewData | undefined>(
  undefined
);

export function useResumeDataContext() {
  const resumeData = useContext(ResumeDataProvider);
  if (resumeData == undefined) {
    throw new Error("Must be used with ResumeDataProvider");
  }
  return resumeData;
}

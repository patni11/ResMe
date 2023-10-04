export type Project = {
  projectName: string;
  location?: string;
  positionTitle?: string;
  startDate?: Date;
  endDate?: Date | "working";
  description: string;
  id: string;
};

export type Experience = {
  company: string;
  location: string;
  positionTitle: string;
  experienceType: string;
  startDate: Date;
  endDate: Date | "working";
  description: string;
  id: string;
};

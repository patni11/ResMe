export type Experience = {
  _id: string;
  company: string;
  location: string;
  positionTitle: string;
  experienceType: string;
  startDate: Date;
  endDate: Date | "working";
  description: string;
};

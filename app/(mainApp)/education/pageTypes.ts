//import { AddEducationFormType } from "./EducationDialogContent";

// export interface Education extends AddEducationFormType {
//   error?: string | null;
// }

export type EducationType = {
  _id: string;
  schoolName: string;
  major: string;
  degreeType: string;
  gpa?: Number;
  startDate: Date;
  endDate: Date;
};

export interface Certificate {
  certificateName: string;
  organization: string;
  issueDate?: Date;
  _id: string;
}

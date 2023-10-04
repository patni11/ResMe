import { AddEducationFormType } from "./EducationDialogContent";

export interface Education extends AddEducationFormType {
  error?: string | null;
}

export interface Certificate {
  certificateName: string;
  organization: string;
  issueDate: Date;
  certificateId: string;
  error?: string | null;
}

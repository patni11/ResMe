export interface Education {
  schoolName: string;
  major: string;
  degreeType: string;
  gpa: number;
  startDate: Date;
  endDate: Date;
  id: string;
  error?: string | null;
}

export interface Certificate {
  certificateName: string;
  organization: string;
  issueDate: Date;
  certificateId: string;
  error?: string | null;
}

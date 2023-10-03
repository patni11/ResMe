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

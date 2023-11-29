export interface EducationType {
  _id: string;
  schoolName: string;
  major: string;
  degreeType: string;
  gpa?: Number;
  startDate: Date;
  endDate: Date;
}

export interface EducationStore {
  educations: EducationType[];
  hiddenEducations: Map<string, boolean>;
  hiddenGPAs: Map<string, boolean>;
  hiddenDates: Map<string, boolean>;
  hideAll: boolean;
  relevantCourseWork: string;
}

export interface Certificate {
  certificateName: string;
  organization: string;
  issueDate?: Date;
  _id: string;
}

export interface CertificateStore {
  certificates: Certificate[];
  hiddenCertificates: Map<string, boolean>;
  hideAll: boolean;
}

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

export interface ExperienceStore {
  experiences: Experience[];
  hiddenExperiences: Map<string, boolean>;
  hideAll: boolean;
}

export type Project = {
  projectName: string;
  location?: string;
  positionTitle?: string;
  startDate?: Date;
  endDate?: Date;
  description: string;
  _id: string;
};

export interface ProjectStore {
  projects: Project[];
  hiddenProjects: Map<string, boolean>;
  hiddenLocation: Map<string, boolean>;
  hiddenDates: Map<string, boolean>;
  hiddenPosition: Map<string, boolean>;
  hideAll: boolean;
}

export type UserInfo = {
  displayName: string;
  contactInfo?: { contactName: string; contact: string }[];
  location?: string;
  links?: { linkName: string; link: string }[];
  email: string; //used to identify user
};

export interface HeaderStore {
  headerInfo: UserInfo;
  hideLocation: boolean;
  hiddenContacts: Map<string, boolean>;
  hiddenLinks: Map<string, boolean>;
}

export type User = {
  email: string;
  isOnboarded: boolean;
  password: string;
  stripeCustomerId?: string; // '?' denotes an optional field
  stripeSubscriptionId?: string;
  stripePriceId?: string;
  stripeCurrentPeriodEnd?: Date;
  resumeCount?: number;
  resumes?: string[]; // Array of strings, assuming these are IDs referencing "Resume"
  skills?: string[];
  languages?: string[];
  interests?: string[];
  AICalls?: number;
  createdAt?: Date; // Assuming timestamps true adds createdAt
  updatedAt?: Date; // Assuming timestamps true adds updatedAt
};

export interface ResumeType {
  _id: string;
  email: string;
  resumeName: string;
  skills: string[];
  languages: string[];
  interests: string[];

  educations: EducationStore;

  certificates: CertificateStore;

  experiences: ExperienceStore;

  projects: ProjectStore;

  headerInfo: HeaderStore;

  pdfLink: string;
}

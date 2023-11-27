export interface EducationType {
  _id: string;
  schoolName: string;
  major: string;
  degreeType: string;
  gpa?: Number;
  startDate: Date;
  endDate: Date;
}

export interface Certificate {
  certificateName: string;
  organization: string;
  issueDate?: Date;
  _id: string;
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

export type Project = {
  projectName: string;
  location?: string;
  positionTitle?: string;
  startDate?: Date;
  endDate?: Date;
  description: string;
  _id: string;
};

export type UserInfo = {
  displayName: string;
  contactInfo?: { contactName: string; contact: string }[];
  location?: string;
  links?: { linkName: string; link: string }[];
  email: string; //used to identify user
};

export interface ResumeType {
  _id: string;
  email: string;
  resumeName: string;
  skills: string[];
  languages: string[];
  interests: string[];

  educations: {
    educations: EducationType[];
    hiddenEducations: Map<string, boolean>;
    hiddenGPAs: Map<string, boolean>;
    hiddenDates: Map<string, boolean>;
    hideAll: boolean;
    relevantCourseWork: string;
  };

  certificates: {
    certificates: Certificate[];
    hiddenCertificates: Map<string, boolean>;
    hideAll: boolean;
  };

  experiences: {
    experiences: Experience[];
    hiddenExperiences: Map<string, boolean>;
    hideAll: boolean;
  };

  projects: {
    projects: Project[];
    hiddenProjects: Map<string, boolean>;
    hiddenLocation: Map<string, boolean>;
    hiddenDates: Map<string, boolean>;
    hiddenPosition: Map<string, boolean>;
    hideAll: boolean;
  };

  headerInfo: {
    headerInfo: UserInfo;
    hideLocation: boolean;
    hiddenContacts: Map<string, boolean>;
    hiddenLinks: Map<string, boolean>;
  };

  pdfLink: string;
}

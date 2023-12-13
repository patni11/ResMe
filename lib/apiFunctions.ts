import { Certificate, EducationType } from "@/lib/types/types";
import { Experience } from "@/lib/types/types";
import { Project } from "@/lib/types/types";
import { UserInfo } from "@/lib/types/types";

export async function getHeaderData() {
  try {
    const res = await fetch(`/api/resumeHeaderInfo`);

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    return res.json();
  } catch (e) {
    console.log("error loading topic in zustand:", e);
  }
}

export async function getCleanedHeaderData() {
  const headerInfo: UserInfo = (await getHeaderData()).headerInfo;
  const hiddenContacts: { [key: string]: boolean } = {};
  const hiddenLinks: { [key: string]: boolean } = {};

  // const defaultValues: UserInfo = {
  //   displayName: headerInfo ? headerInfo?.displayName : "",
  //   contactInfo:
  //     headerInfo && headerInfo.contactInfo
  //       ? JSON.parse(JSON.stringify(headerInfo?.contactInfo))
  //       : [{ contactName: "", contact: "" }],
  //   location: headerInfo && headerInfo?.location ? headerInfo.location : "",
  //   links:
  //     headerInfo && headerInfo.links
  //       ? JSON.parse(JSON.stringify(headerInfo?.links))
  //       : [{ linkName: "", link: "" }],
  //   _id: headerInfo.email,
  // };

  // Populate the objects
  headerInfo.contactInfo?.forEach((contact) => {
    hiddenContacts[contact.contactName] = false;
  });

  headerInfo.links?.forEach((link) => {
    hiddenLinks[link.linkName] = false;
  });

  return {
    headerInfo: headerInfo,
    hiddenContacts,
    hiddenLinks,
    hideLocation: false,
  };
}

// export async function getCleanedHeaderData() {
//   const headerInfo: UserInfo = (await getHeaderData()).headerInfo;
//   const hiddenContactsMap = new Map<string, boolean>();
//   const hiddenLinksMap = new Map<string, boolean>();

//   // Populate the maps
//   headerInfo.contactInfo?.forEach((contact) => {
//     hiddenContactsMap.set(contact.contact, false);
//   });

//   headerInfo.links?.forEach((link) => {
//     hiddenLinksMap.set(link.linkName, false);
//   });

//   // Assuming headerInfo also needs to be converted
//   // Modify headerInfo to include these maps instead of plain objects
//   return {
//     headerInfo,
//     hiddenContacts: hiddenContactsMap,
//     hiddenLinks: hiddenLinksMap,
//     hideLocation: false,
//   };
// }

export async function getEducationData() {
  try {
    const res = await fetch(`/api/educationsInfo`);

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    return res.json();
  } catch (e) {
    console.log("error loading topic in zustand:", e);
  }
}
export async function getCleanedEducationData() {
  const educations: EducationType[] | null =
    (await getEducationData()).educations || [];

  const hiddenGPAs = educations
    ? educations.reduce((acc, education) => {
        acc[education._id] = false;
        return acc;
      }, {} as { [key: string]: boolean })
    : null;

  const hiddenEducations = educations
    ? educations.reduce((acc, education) => {
        acc[education._id] = false;
        return acc;
      }, {} as { [key: string]: boolean })
    : null;

  const hiddenDates = educations
    ? educations.reduce((acc, education) => {
        acc[education._id] = false;
        return acc;
      }, {} as { [key: string]: boolean })
    : null;

  return {
    educations: educations ? educations : [],
    hiddenDates: hiddenDates,
    hiddenEducations: hiddenEducations,
    hiddenGPAs: hiddenGPAs,
    relevantCourseWork: "",
    hideAll: false,
  };
}

export async function getCertificateData() {
  try {
    const res = await fetch(`/api/certificatesInfo`);

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    return res.json();
  } catch (e) {
    console.log("error loading topic in zustand:", e);
  }
}

export async function getCleanedCertificateData() {
  const certificates: Certificate[] | null =
    (await getCertificateData()).certificates || [];

  const hiddenCertificates = certificates
    ? certificates.reduce((acc, certificate) => {
        acc[certificate._id] = false;
        return acc;
      }, {} as { [key: string]: boolean })
    : null;

  return {
    certificates: certificates ? certificates : [],
    hiddenCertificates: hiddenCertificates,
    hideAll: false,
  };
}

export async function getExperienceData() {
  try {
    const res = await fetch(`/api/experiencesInfo`);

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    return res.json();
  } catch (e) {
    console.log("error loading topic in zustand:", e);
  }
}

export async function getCleanedExperienceData() {
  const experiences: Experience[] | [] =
    (await getExperienceData()).experiences || [];

  const hiddenExperiences = experiences
    ? experiences.reduce((acc, experience) => {
        acc[experience._id] = false;
        return acc;
      }, {} as { [key: string]: boolean })
    : null;

  return {
    experiences: experiences,

    hiddenExperiences: hiddenExperiences,

    hideAll: false,
  };
}

export async function getProjectData() {
  try {
    const res = await fetch(`/api/projectsInfo`);

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    return res.json();
  } catch (e) {
    console.log("error loading topic in zustand:", e);
  }
}

export async function getCleanedProjectData() {
  const projects: Project[] | [] = (await getProjectData()).projects || [];

  const hiddenProjects = projects
    ? projects.reduce((acc, project) => {
        acc[project._id] = false;
        return acc;
      }, {} as { [key: string]: boolean })
    : null;

  const hiddenDates = projects
    ? projects.reduce((acc, project) => {
        acc[project._id] = false;
        return acc;
      }, {} as { [key: string]: boolean })
    : null;

  const hiddenLocation = projects
    ? projects.reduce((acc, project) => {
        acc[project._id] = false;
        return acc;
      }, {} as { [key: string]: boolean })
    : null;

  const hiddenPosition = projects
    ? projects.reduce((acc, project) => {
        acc[project._id] = false;
        return acc;
      }, {} as { [key: string]: boolean })
    : null;

  return {
    projects: projects,

    hiddenProjects: hiddenProjects,
    hiddenDates: hiddenDates,
    hiddenLocation: hiddenLocation,
    hiddenPosition: hiddenPosition,

    hideAll: false,
  };
}

export async function getTalentsData() {
  try {
    const res = await fetch(`/api/skills`);

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    return res.json();
  } catch (e) {
    console.log("error loading topic in zustand:", e);
  }
}

export async function getCleanedTalentsData() {
  const talent: {
    skills: string[];
    languages: string[];
    interests: string[];
  } = (await getTalentsData()) || [];

  const skills = talent.skills ? talent.skills.join(", ") : "";
  const interests = talent.interests ? talent.interests.join(", ") : "";
  const languages = talent.languages ? talent.languages.join(", ") : "";

  return {
    skills: skills,
    interests: interests,
    languages: languages,
    isLoading: false,
  };
}

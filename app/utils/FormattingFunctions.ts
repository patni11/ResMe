export function getFormattedDate(date: Date): string {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const year = date.getFullYear().toString();
  const month = months[date.getMonth()];

  return `${month} ${year}`;
}

type DecimalValue = {
  $numberDecimal: string;
};

type PossibleNumber = Number | DecimalValue;

export function parseDecimal(value: PossibleNumber): number {
  if ("$numberDecimal" in value) {
    return parseFloat(value.$numberDecimal);
  } else {
    return value as number;
  }
}

export function timeAgo(dateParam: Date | string): string | null {
  if (!dateParam) {
    return null;
  }

  const date: Date =
    typeof dateParam === "object" ? dateParam : new Date(dateParam);
  const today: Date = new Date();
  const seconds: number = Math.round((today.getTime() - date.getTime()) / 1000);
  const minutes: number = Math.round(seconds / 60);
  const hours: number = Math.round(minutes / 60);
  const days: number = Math.round(hours / 24);
  const years: number = Math.round(days / 365);

  if (seconds < 60) {
    return "just now";
  } else if (minutes < 60) {
    return `${minutes} minute(s) ago`;
  } else if (hours < 24) {
    return `${hours} hour(s) ago`;
  } else if (days < 365) {
    return `${days} day(s) ago`;
  } else {
    return `${years} year(s) ago`;
  }
}

export function fixExperience(rawExperiences: any) {
  const formattedExperiences = rawExperiences.map((exp: any) => {
    let endDate = exp.endDate;

    // Check if endDate is a string and not 'working', then parse it as a Date.
    if (typeof endDate === "string" && endDate !== "working") {
      endDate = new Date(endDate);
    }

    return {
      ...exp,
      endDate: endDate,
    };
  });
  return formattedExperiences;
}

export function fixStructure(arrayOfObjects: any) {
  arrayOfObjects = arrayOfObjects.map(
    //@ts-ignore
    ({ __v, email, createdAt, updatedAt, ...rest }) => rest
  );
  return arrayOfObjects;
}

export function fixCertificateFormat(certificateState: any) {
  const { certificates, hiddenCertificates, hideAll } = certificateState;
  const fixedCert = fixStructure(certificates);
  return {
    certificates: fixedCert,
    hiddenCertificates,
    hideAll,
  };
}

export function fixHeaderInfo(headerState: any) {
  const { headerInfo, hiddenContacts, hiddenLinks, hideLocation } = headerState;
  delete headerInfo.updatedAt;
  delete headerInfo.createdAt;
  delete headerInfo.__v;
  return {
    headerInfo,
    hideLocation,
    hiddenContacts,
    hiddenLinks,
  };
}

export function fixEducationFormat(educationState: any) {
  const {
    educations,
    hiddenDates,
    hiddenEducations,
    hiddenGPAs,
    hideAll,
    relevantCourseWork,
  } = educationState;
  const fixedEds = fixStructure(educations);
  return {
    educations: fixedEds,
    hiddenDates,
    hiddenEducations,
    hiddenGPAs,
    hideAll,
    relevantCourseWork,
  };
}

export function fixExperienceFormat(experiencesState: any) {
  const { experiences, hiddenExperiences, hideAll } = experiencesState;
  const fixedExps = fixExperience(fixStructure(experiences));
  return {
    experiences: fixedExps,
    hiddenExperiences,
    hideAll,
  };
}

export function fixProjectFormat(projectState: any) {
  const {
    projects,
    hiddenProjects,
    hiddenLocation,
    hideAll,
    hiddenDates,
    hiddenPosition,
  } = projectState;
  const fixedProjects = fixStructure(projects);
  return {
    projects: fixedProjects,
    hiddenDates,
    hiddenLocation,
    hiddenProjects,
    hiddenPosition,
    hideAll,
  };
}

export function fixTalent(talents: any) {
  const { skills, interests, languages } = talents;
  return {
    skills,
    interests,
    languages,
  };
}

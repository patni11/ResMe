import {
  AlignmentType,
  Document,
  HeadingLevel,
  Paragraph,
  TabStopPosition,
  TabStopType,
  TextRun,
  UnderlineType,
  convertInchesToTwip,
  IMargins,
  Table,
  TableRow,
  TableCell,
  BorderStyle,
  WidthType,
  Tab,
  PositionalTab,
  PositionalTabAlignment,
  PositionalTabRelativeTo,
  PositionalTabLeader,
} from "docx";
// import { useEducationsInfo } from "@/store/educationInfo";
// import { useExperiencesInfo } from "@/store/experienceInfo";
import { createResumeHeaderInfo } from "@/store/resumeHeaderInfo";
import { createEducationInfo } from "@/store/educationInfo";
import { getFormattedDate } from "@/app/utils/FormattingFunctions";
import { createCertificateInfo } from "@/store/certificatesInfo";
import { createExperienceInfo } from "@/store/experienceInfo";
import { createProjectsSection } from "@/store/projectsInfo";
import { createTalentsInfo } from "@/store/talentsInfo";
const DocumentCreator = ({
  componentsData,
  resumeId,
  email,
}: {
  componentsData: { type: string; id: string }[];
  resumeId: string;
  email: string;
}) => {
  const document = new Document({
    creator: "ResMe",
    styles: {
      default: {
        heading1: {
          run: {
            size: 54,
            bold: true,
            color: "000000",
          },
          paragraph: {
            spacing: {
              after: 60,
            },
          },
        },
        heading2: {
          run: {
            size: 26,
            bold: true,
            underline: {
              type: UnderlineType.DOUBLE,
              color: "FF0000",
            },
          },
          paragraph: {
            spacing: {
              before: 240,
              after: 120,
            },
          },
        },
        document: {
          run: {
            size: "11pt",
            font: "Times",
          },
          paragraph: {
            alignment: AlignmentType.LEFT,
          },
        },
      },
      paragraphStyles: [
        {
          id: "aside",
          name: "Aside",
          basedOn: "Normal",
          next: "Normal",
          run: {
            color: "999999",
            italics: true,
            size: 22,
          },
          paragraph: {
            indent: {
              left: convertInchesToTwip(0.5),
            },
            spacing: {
              line: 276,
            },
          },
        },
      ],
      //   characterStyles: [
      //     {
      //       id: "strikeUnderlineCharacter",
      //       name: "Strike Underline",
      //       basedOn: "Normal",
      //       quickFormat: true,
      //       run: {
      //         strike: true,
      //         underline: {
      //           type: UnderlineType.SINGLE,
      //         },
      //       },
      //     },
      //   ],
    },
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: 720, // 0.5 inch in twips
              right: 720, // 0.5 inch in twips
              bottom: 720, // 0.5 inch in twips
              left: 720, // 0.5 inch in twips
            },
          },
        },
        children: [
          ...createHeader({ resumeId, email }),
          ...createEducation({ resumeId, email }),
          ...createCertificates({ resumeId, email }),
          ...createExperience({ resumeId, email }),
          ...createProject({ resumeId, email }),
          ...createTalent({ resumeId, email }),
        ],
      },
    ],
  });

  return document;
};
export default DocumentCreator;
// function createHeader({
//   resumeId,
//   email,
// }: {
//   resumeId: string;
//   email: string;
// }): Paragraph[] {
//   const useResumeHeaderInfo = createResumeHeaderInfo(
//     `resumeHeader-${email}-${resumeId}`
//   );
//   const { headerInfo, hideLocation, hiddenContacts, hiddenLinks } =
//     useResumeHeaderInfo.getState();

//   let location = headerInfo?.location ? headerInfo.location : "";
//   location = hideLocation ? location : "";

//   const contactInfo = headerInfo.contactInfo
//     ? headerInfo.contactInfo
//     : [{ contact: "" }];

//   const contacts = contactInfo
//     .filter((info, index) => !hiddenContacts[index][info.contact])
//     .map((info) => info.contact)
//     .join("|");

//   const linksInfo = headerInfo.links
//     ? headerInfo.links
//     : [{ linkName: "", link: "" }];

//   const links = linksInfo
//     .filter((info, index) => !hiddenLinks[index][info.linkName])
//     .map((info) => info.link)
//     .join("|");

//   return [
//     new Paragraph({
//       text: headerInfo.displayName,
//       heading: HeadingLevel.HEADING_4,
//       alignment: AlignmentType.CENTER,

//     }),
//     new Paragraph({
//       alignment: AlignmentType.CENTER,
//       children: [
//         new TextRun(`${contacts} ${links}`),
//         new TextRun({
//           text: location,
//           break: 1,
//         }),
//       ],
//     }),
//   ];
// }

function createHeader({
  resumeId,
  email,
}: {
  resumeId: string;
  email: string;
}) {
  // Assuming createResumeHeaderInfo is a hook-like function that returns the current state
  const { headerInfo, hideLocation, hiddenContacts, hiddenLinks } =
    createResumeHeaderInfo(`resumeHeader-${email}-${resumeId}`).getState();

  let location = headerInfo?.location ? headerInfo.location : "";
  location = hideLocation ? "" : location;

  const contactInfo = headerInfo.contactInfo
    ? headerInfo.contactInfo
    : [{ contact: "" }];

  const contacts = contactInfo
    .filter((info, index) => !hiddenContacts[index][info.contact])
    .map((info) => info.contact)
    .join(" | ");

  const linksInfo = headerInfo.links
    ? headerInfo.links
    : [{ linkName: "", link: "" }];

  const links = linksInfo
    .filter((info, index) => !hiddenLinks[index][info.linkName])
    .map((info) => info.link)
    .join(" | ");

  // Since the email and links are separated by a space and not "|", we need to conditionally add it
  const contactsAndLinks = [contacts, links, location]
    .filter(Boolean)
    .join(" | ");

  return [
    new Paragraph({
      text: headerInfo.displayName.toUpperCase(), // Convert the display name to uppercase
      heading: HeadingLevel.HEADING_1, // Use the title heading level for the name
      alignment: AlignmentType.CENTER,
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [new TextRun(contactsAndLinks)],
      spacing: {
        after: 100, // Adjust as needed
      },
    }),
  ];
}

const sectionHeading = (text: string) => {
  const heading = new Paragraph({
    children: [
      new TextRun({
        text: text,
        bold: true,
        size: 24, // Size in half-points (optional, adjust as needed)
      }),
    ],
    // Add spacing to ensure the border does not touch the text
    spacing: {
      after: 100, // Adjust as needed
    },
    // Set border below the paragraph to create a continuous line
    border: {
      bottom: {
        color: "000000", // Black
        space: 1, // The space above the border, in points
        style: BorderStyle.SINGLE,
        size: 10, // Thickness in eighths of a point
      },
    },
  });
  return heading;
};

function createEducation({
  resumeId,
  email,
}: {
  resumeId: string;
  email: string;
}) {
  // Your assumed state fetching function
  const {
    educations,
    hiddenDates,
    hiddenGPAs,
    hiddenEducations,
    hideAll,
    relevantCourseWork,
  } = createEducationInfo(`educations-${email}-${resumeId}`).getState();

  const educationParagraphs = [];

  if (!hideAll) {
    educationParagraphs.push(sectionHeading("EDUCATION"));
    educations.forEach((education) => {
      if (!hiddenEducations[education._id]) {
        const dateRange = hiddenDates[education._id]
          ? ""
          : `${getFormattedDate(
              new Date(education.startDate)
            )} - ${getFormattedDate(new Date(education.endDate))}`;

        console.log("GPA", education.gpa, education.gpa.toString());

        const gpa = hiddenGPAs[education._id]
          ? ""
          : `GPA: ${education.gpa.$numberDecimal.toString()}`;

        const para1 = new Paragraph({
          children: [
            new TextRun({
              text: education.schoolName,
              bold: true,
            }),
            new TextRun({
              text: "\t" + dateRange,
              bold: true,
            }),
          ],
          tabStops: [
            {
              type: TabStopType.RIGHT,
              position: 10890, // Position value may need to be adjusted based on your document's width
            },
          ],
        });

        const para2 = new Paragraph({
          children: [
            new TextRun({
              text: `${education.degreeType} in ${education.major}`,
              italics: true,
            }),
            new TextRun({
              text: "\t", // Tab character to move to the next tab stop
            }),
            new TextRun({
              text: gpa,
              italics: true,
            }),
          ],
          tabStops: [
            {
              type: TabStopType.RIGHT,
              position: 10890, // Position value may need to be adjusted based on your document's width
            },
          ],
          spacing: {
            after: 120, // The value is in twentieths of a point, so 240 will result in 12 points or around 1/6 of an inch
          },
        });

        // Adding the school and GPA/date paragraph to the education paragraphs
        educationParagraphs.push(para1);
        educationParagraphs.push(para2);

        // Add a thematic break (line) after each education block
      }
    });

    if (relevantCourseWork) {
      const coursesParagraph = new Paragraph({
        children: [
          new TextRun({
            text: "Relevant Coursework: ",
            bold: true,
          }),
          new TextRun(relevantCourseWork),
        ],
        spacing: {
          after: 120, // The value is in twentieths of a point, so 240 will result in 12 points or around 1/6 of an inch
        },
      });
      educationParagraphs.push(coursesParagraph);
    }
  }

  // Returns the education paragraphs which can be included in the Document constructor
  return educationParagraphs;
}

function createCertificates({
  resumeId,
  email,
}: {
  resumeId: string;
  email: string;
}) {
  const { certificates, hiddenCertificates, hideAll } = createCertificateInfo(
    `certificates-${email}-${resumeId}`
  ).getState();

  const certificateParagraphs = [];

  if (!hideAll) {
    const certificatesString = certificates
      .filter((certificate: any) => !hiddenCertificates?.[certificate._id]) // Filter out hidden certificates
      .map(
        (certificate: any) =>
          `${certificate.organization}: ${certificate.certificateName}`
      )
      .join(", ");

    const certificatePara = new Paragraph({
      children: [
        new TextRun({
          text: "Certifications: ",
          bold: true,
        }),
        new TextRun(certificatesString),
      ],
      spacing: {
        after: 120, // The value is in twentieths of a point, so 240 will result in 12 points or around 1/6 of an inch
      },
    });

    certificateParagraphs.push(certificatePara);
  }

  // Returns the education paragraphs which can be included in the Document constructor
  return certificateParagraphs;
}

function createExperience({
  resumeId,
  email,
}: {
  resumeId: string;
  email: string;
}) {
  // Your assumed state fetching function
  const { experiences, hiddenExperiences, hideAll } = createExperienceInfo(
    `experiences-${email}-${resumeId}`
  ).getState();

  const experienceParagraphs = [];

  if (!hideAll) {
    experienceParagraphs.push(sectionHeading("EXPERIENCES"));
    experiences.forEach((experience) => {
      if (!hiddenExperiences[experience._id]) {
        const endDate =
          experience.endDate == "working"
            ? "Current"
            : getFormattedDate(new Date(experience.endDate));
        //GPA DATE, DATE ROLE
        const dateRange = `${getFormattedDate(
          new Date(experience.startDate)
        )} - ${endDate}`;

        const para1 = new Paragraph({
          children: [
            new TextRun({
              text: experience.company,
              bold: true,
            }),
            new TextRun({
              text: "\t" + experience.positionTitle,
              bold: true,
            }),
          ],
          tabStops: [
            {
              type: TabStopType.RIGHT,
              position: 10890, // Position value may need to be adjusted based on your document's width
            },
          ],
        });

        const para2 = new Paragraph({
          children: [
            new TextRun({
              text: `${experience.positionTitle}`,
              italics: true,
            }),
            new TextRun({
              text: "\t", // Tab character to move to the next tab stop
            }),
            new TextRun({
              text: dateRange,
              italics: true,
            }),
          ],
          tabStops: [
            {
              type: TabStopType.RIGHT,
              position: 10890, // Position value may need to be adjusted based on your document's width
            },
          ],
          spacing: {
            after: 120, // The value is in twentieths of a point, so 240 will result in 12 points or around 1/6 of an inch
          },
        });

        console.log("EXP", experience.description);

        // Adding the school and GPA/date paragraph to the education paragraphs
        experienceParagraphs.push(para1);
        experienceParagraphs.push(para2);
        experienceParagraphs.push(...createBulletList(experience.description));
      }
    });
  }

  // Returns the education paragraphs which can be included in the Document constructor
  return experienceParagraphs;
}

function createProject({
  resumeId,
  email,
}: {
  resumeId: string;
  email: string;
}) {
  // Your assumed state fetching function
  const {
    projects,
    hiddenProjects,
    hideAll,
    hiddenDates,
    hiddenLocation,
    hiddenPosition,
  } = createProjectsSection(`projects-${email}-${resumeId}`).getState();

  const projectParagraphs = [];

  if (!hideAll) {
    projectParagraphs.push(sectionHeading("PROJECTS"));
    projects.forEach((project) => {
      if (!hiddenProjects[project._id]) {
        // Initialize an empty string for date range
        let dateRange = "";

        // Only include the date range if not hidden
        if (!hiddenDates) {
          const endDate =
            project.endDate == "working"
              ? "Current"
              : getFormattedDate(new Date(project.endDate));
          dateRange = `${getFormattedDate(
            new Date(project.startDate)
          )} - ${endDate}`;
        }

        // Build the first paragraph with project name and optional location/position
        const para1Children = [
          new TextRun({
            text: project.projectName,
            bold: true,
          }),
        ];

        if (!hiddenPosition && project.positionTitle) {
          para1Children.push(
            new TextRun({
              text: "\t" + project.positionTitle,
              bold: true,
            })
          );
        }

        if (!hiddenLocation && project.location) {
          para1Children.push(
            new TextRun({
              text: "\t" + project.location,
              bold: true,
            })
          );
        }

        const para1 = new Paragraph({
          children: para1Children,
          tabStops: [
            {
              type: TabStopType.RIGHT,
              position: 10890,
            },
          ],
        });

        // Build the second paragraph with position (if not hidden) and dates (if not hidden)
        const para2Children = [];

        if (!hiddenPosition && project.positionTitle) {
          para2Children.push(
            new TextRun({
              text: `${project.positionTitle}`,
              italics: true,
            })
          );
        }

        // Only add tab and date range if dates are not hidden
        if (!hiddenDates) {
          para2Children.push(
            new TextRun({
              text: "\t", // Tab character to move to the next tab stop
            })
          );

          para2Children.push(
            new TextRun({
              text: dateRange,
              italics: true,
            })
          );
        }

        const para2 = new Paragraph({
          children: para2Children,
          tabStops: [
            {
              type: TabStopType.RIGHT,
              position: 10890,
            },
          ],
          spacing: {
            after: 120,
          },
        });

        console.log("EXP", project.description);

        // Adding the project paragraphs
        projectParagraphs.push(para1);
        if (para2Children.length > 0) {
          // Only add the second paragraph if it has content
          projectParagraphs.push(para2);
        }
        projectParagraphs.push(...createBulletList(project.description));

        // Add any additional logic for thematic break or additional content here
      }
    });
  }

  // Returns the project paragraphs which can be included in the Document constructor
  return projectParagraphs;
}

function createTalent({
  resumeId,
  email,
}: {
  resumeId: string;
  email: string;
}) {
  const {
    skills,
    languages,
    interests,
    hideSkills,
    hideLanguages,
    hideInterests,
  } = createTalentsInfo(`talents-${email}-${resumeId}`).getState();

  const talentParagraphs = [];

  if (!hideInterests || !hideLanguages || !hideSkills) {
    talentParagraphs.push(sectionHeading("SKILLS & INTERESTS"));
  }

  if (!hideSkills && skills != "") {
    const skillsParagraph = new Paragraph({
      children: [
        new TextRun({
          text: "Skills: ",
          bold: true,
        }),
        new TextRun(skills),
      ],
      spacing: {
        after: 60,
      },
    });
    talentParagraphs.push(skillsParagraph);
  }

  if (!hideInterests && interests != "") {
    const interestsParagraph = new Paragraph({
      children: [
        new TextRun({
          text: "Interests: ",
          bold: true,
        }),
        new TextRun(interests),
      ],
      spacing: {
        after: 60,
      },
    });
    talentParagraphs.push(interestsParagraph);
  }

  if (!hideLanguages && languages != "") {
    const languagesParagraph = new Paragraph({
      children: [
        new TextRun({
          text: "Languages: ",
          bold: true,
        }),
        new TextRun(languages),
      ],
      spacing: {
        after: 60,
      },
    });
    talentParagraphs.push(languagesParagraph);
  }

  return talentParagraphs;
}

function createBulletList(description: string[]): Paragraph[] {
  const bulletLists: Paragraph[] = [];
  description.forEach((desc: string) => {
    bulletLists.push(
      new Paragraph({
        text: desc,
        style: "bulletList",
        bullet: {
          level: 0, // How deep you want the bullet to be. Maximum level is 9
        },

        indent: {
          left: convertInchesToTwip(0.15), // Decrease left indent as per requirement
          hanging: convertInchesToTwip(0.15), // Adjust hanging to bring bullets closer to the text
        },
      })
    );
  });

  return bulletLists;
}

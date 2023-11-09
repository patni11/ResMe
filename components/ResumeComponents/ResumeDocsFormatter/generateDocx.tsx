import {
  AlignmentType,
  Document,
  HeadingLevel,
  Paragraph,
  TabStopPosition,
  TabStopType,
  TextRun,
} from "docx";
// import { useEducationsInfo } from "@/store/educationInfo";
// import { useExperiencesInfo } from "@/store/experienceInfo";
import { createResumeHeaderInfo } from "@/store/resumeHeaderInfo";
const DocumentCreator = () => {
  const document = new Document({
    sections: [
      {
        children: [...createHeader()],
      },
    ],
  });

  return document;
};
export default DocumentCreator;
function createHeader(): Paragraph[] {
  const useResumeHeaderInfo = createResumeHeaderInfo(resumeHeaderID);
  const { headerInfo, hideLocation, hiddenContacts, hiddenLinks } =
    useResumeHeaderInfo.getState();

  let location = headerInfo?.location ? headerInfo.location : "";
  location = hideLocation ? location : "";

  const contactInfo = headerInfo.contactInfo
    ? headerInfo.contactInfo
    : [{ contact: "" }];

  const contacts = contactInfo
    .filter((info, index) => !hiddenContacts[index][info.contact])
    .map((info) => info.contact)
    .join("|");

  const linksInfo = headerInfo.links
    ? headerInfo.links
    : [{ linkName: "", link: "" }];

  const links = linksInfo
    .filter((info, index) => !hiddenLinks[index][info.linkName])
    .map((info) => info.link)
    .join("|");

  return [
    new Paragraph({
      text: headerInfo.displayName,
      heading: HeadingLevel.TITLE,
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [
        new TextRun(`${contacts} ${links}`),
        new TextRun({
          text: location,
          break: 1,
        }),
      ],
    }),
  ];
}

function createHeading(text: string): Paragraph {
  return new Paragraph({
    text: text,
    heading: HeadingLevel.HEADING_1,
    thematicBreak: true,
  });
}

function createSubHeading(text: string): Paragraph {
  return new Paragraph({
    text: text,
    heading: HeadingLevel.HEADING_2,
  });
}

function createInstitutionHeader(
  institutionName: string,
  dateText: string
): Paragraph {
  return new Paragraph({
    tabStops: [
      {
        type: TabStopType.RIGHT,
        position: TabStopPosition.MAX,
      },
    ],
    children: [
      new TextRun({
        text: institutionName,
        bold: true,
      }),
      new TextRun({
        text: `\t${dateText}`,
        bold: true,
      }),
    ],
  });
}

function createRoleText(roleText: string): Paragraph {
  return new Paragraph({
    children: [
      new TextRun({
        text: roleText,
        italics: true,
      }),
    ],
  });
}

function createBullet(text: string): Paragraph {
  return new Paragraph({
    text: text,
    bullet: {
      level: 0,
    },
  });
}

// tslint:disable-next-line:no-any
function createSkillList(skills: any[]): Paragraph {
  return new Paragraph({
    children: [new TextRun(skills.map((skill) => skill.name).join(", ") + ".")],
  });
}

// tslint:disable-next-line:no-any
function createAchivementsList(achivements: any[]): Paragraph[] {
  return achivements.map(
    (achievement) =>
      new Paragraph({
        text: achievement.name,
        bullet: {
          level: 0,
        },
      })
  );
}

function createInterests(interests: string): Paragraph {
  return new Paragraph({
    children: [new TextRun(interests)],
  });
}

function splitParagraphIntoBullets(text: string): string[] {
  return text.split("\n\n");
}

// tslint:disable-next-line:no-any
function createPositionDateText(
  startDate: any,
  endDate: any,
  isCurrent: boolean
): string {
  const startDateText =
    this.getMonthFromInt(startDate.month) + ". " + startDate.year;
  const endDateText = isCurrent
    ? "Present"
    : `${this.getMonthFromInt(endDate.month)}. ${endDate.year}`;

  return `${startDateText} - ${endDateText}`;
}

function getMonthFromInt(value: number): string {
  switch (value) {
    case 1:
      return "Jan";
    case 2:
      return "Feb";
    case 3:
      return "Mar";
    case 4:
      return "Apr";
    case 5:
      return "May";
    case 6:
      return "Jun";
    case 7:
      return "Jul";
    case 8:
      return "Aug";
    case 9:
      return "Sept";
    case 10:
      return "Oct";
    case 11:
      return "Nov";
    case 12:
      return "Dec";
    default:
      return "N/A";
  }
}

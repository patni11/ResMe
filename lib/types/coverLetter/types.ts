import Dark from "@/components/CoverLetter/Templates/Dark";
import { ReactElement } from "react";

export interface CoverLetterSettings {
  bgColor: string;
  fontColor: string;
  ascentColor: string;
  fontFamily: string;
  fontSize: string;
  headerSize: string;
  documentType: "A4" | "Letter";
}

export type Theme = "light" | "dark";

export type Sidebar = "left" | "right";

export type SidebarState = { open: boolean };

export type Orientation = "horizontal" | "vertical";

export type Layout = {
  theme?: Theme;
  sidebar: Record<Sidebar, SidebarState>;
  page: {
    breakLine: boolean;
    orientation: Orientation;
  };
};

export const initialLayoutState: Layout = {
  theme: "light",
  sidebar: {
    left: { open: true },
    right: { open: true },
  },
  page: {
    breakLine: true,
    orientation: "horizontal",
  },
};

export const initialCoverLetterSettings: CoverLetterSettings = {
  bgColor: "#FFFFFF",
  fontColor: "#050505",
  fontFamily: "Merriweather",
  fontSize: "9",
  ascentColor: "#D64045",
  headerSize: "11",
  documentType: "A4",
};

export interface CoverLetterTemplate {
  id: string;
  name: string;
  image: string;
  component: ReactElement;
}

export interface CoverLetterData {
  userData: {
    name: string;
    email: string;
    phone: string;
    address: string;
  };
  jobDescription: string;
  text: string;
}

export const initialCoverLetterData: CoverLetterData = {
  userData: {
    name: "",
    email: "",
    phone: "",
    address: "",
  },
  jobDescription: "",
  text: "",
};

export type TemplateMeta = {
  id: string;
  name: string;
  preview: StaticImageData;
  component: React.FC;
};

import ResumeCardImageImage from "@/public/resumeCard.png";

export const templateMap: Record<string, TemplateMeta> = {
  temp1: {
    id: "temp1",
    name: "Temp1",
    preview: ResumeCardImageImage,
    component: Dark,
  },
  temp2: {
    id: "temp2",
    name: "Temp2",
    preview: ResumeCardImageImage,
    component: Dark,
  },
  temp3: {
    id: "temp3",
    name: "Temp3",
    preview: ResumeCardImageImage,
    component: Dark,
  },
  temp4: {
    id: "temp4",
    name: "Temp4",
    preview: ResumeCardImageImage,
    component: Dark,
  },
  temp5: {
    id: "temp5",
    name: "Temp4",
    preview: ResumeCardImageImage,
    component: Dark,
  },
  temp6: {
    id: "temp6",
    name: "Temp4",
    preview: ResumeCardImageImage,
    component: Dark,
  },
  temp7: {
    id: "temp7",
    name: "Temp4",
    preview: ResumeCardImageImage,
    component: Dark,
  },
  temp8: {
    id: "temp8",
    name: "Temp4",
    preview: ResumeCardImageImage,
    component: Dark,
  },
};

export type SidebarSection = {
  id: string;
  icon: React.ElementType;
  component: React.ElementType;
};

import Templates from "@/components/CoverLetter/RightSidebar/sections/Templates";
import { PlusCircle } from "lucide-react";
import { StaticImageData } from "next/image";
import Fonts from "@/components/CoverLetter/RightSidebar/sections/Fonts";
import Theme from "@/components/CoverLetter/RightSidebar/sections/Theme";
import Document from "@/components/CoverLetter/RightSidebar/sections/Document";

export const right: SidebarSection[] = [
  {
    id: "templates",
    icon: PlusCircle,
    component: Templates,
  },
  {
    id: "fonts",
    icon: PlusCircle,
    component: Fonts,
  },
  {
    id: "themes",
    icon: PlusCircle,
    component: Theme,
  },
  {
    id: "document",
    icon: PlusCircle,
    component: Document,
  },
];

export const hexColorPattern = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;

export const colorOptions: string[] = [
  "#f44336",
  "#e91e63",
  "#9c27b0",
  "#673ab7",
  "#3f51b5",
  "#4896d5",
  "#03a9f4",
  "#00bcd4",
  "#009688",
  "#4caf50",
  "#8bc34a",
  "#cddc39",
  "#ffeb3b",
  "#ffc107",
  "#000000",
  "#dddddd",
];

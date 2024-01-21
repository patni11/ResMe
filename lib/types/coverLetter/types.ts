import { ReactElement } from "react";
export interface CoverLetterSettings {
  bgColor: string;
  template: string;
  fontColor: string;
  ascentColor: string;
  fontFamily: string;
  fontSize: string;
  headerSize: string;
  documentType: "A4" | "Letter";
  onboarded: boolean;
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
  isEditing: boolean;
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
  isEditing: false,
};

export const initialCoverLetterSettings: CoverLetterSettings = {
  bgColor: "#FFFFFF",
  template: "Gojo",
  fontColor: "#000000",
  fontFamily: "Roboto",
  fontSize: "16",
  ascentColor: "#D64045",
  headerSize: "36",
  documentType: "A4",
  onboarded: false,
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
    website: string;
    phone: string;
    address: string;
  };
  jobDescription: string;
  text: string;
}

export const initialCoverLetterData: CoverLetterData = {
  userData: {
    name: "",
    email: "Email: ",
    website: "Web: ",
    phone: "Phone: ",
    address: "Address: ",
  },
  jobDescription: "Job Description",
  text: `Dear Hiring Manager,`,
};

export type TemplateMeta = {
  id: string;
  name: string;
  preview: StaticImageData;
  component: React.FC;
};

import GojoImage from "@/public/coverLetter/Gojo.png";
import KakarotImage from "@/public/coverLetter/Kakarot.png";
import LightImage from "@/public/coverLetter/Light.png";
import KiluaImage from "@/public/coverLetter/Kilua.png";
import NarutoImage from "@/public/coverLetter/Naruto.png";

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
import AI from "@/components/CoverLetter/RightSidebar/sections/AI";
import Gojo from "@/components/CoverLetter/Templates/Gojo/Gojo";
import Kakarot from "@/components/CoverLetter/Templates/Kakarot/Kakarot";
import YourInfo from "@/components/CoverLetter/RightSidebar/sections/UserData";
import Light from "@/components/CoverLetter/Templates/Light/Light";
import Kilua from "@/components/CoverLetter/Templates/Kilua/Kilua";
import Naruto from "@/components/CoverLetter/Templates/Naruto/Naruto";
//import Tanjiro from "@/components/CoverLetter/Templates/Tanjiro/Tanjiro";

export const templateMap: Record<string, TemplateMeta> = {
  Gojo: {
    id: "Gojo",
    name: "Gojo",
    preview: GojoImage,
    component: Gojo,
  },
  Kakarot: {
    id: "Kakarot",
    name: "Kakarot",
    preview: KakarotImage,
    component: Kakarot,
  },
  Light: {
    id: "Light",
    name: "Light",
    preview: LightImage,
    component: Light,
  },
  Kilua: {
    id: "Kilua",
    name: "Kilua",
    preview: KiluaImage,
    component: Kilua,
  },
  Naruto: {
    id: "Naruto",
    name: "Naruto",
    preview: NarutoImage,
    component: Naruto,
  },
  // Tanjiro: {
  //   id: "Tanjiro",
  //   name: "Tanjiro",
  //   preview: ResumeCardImageImage,
  //   component: Tanjiro,
  // },
};

export const right: SidebarSection[] = [
  {
    id: "AI",
    icon: PlusCircle,
    component: AI,
  },
  {
    id: "YourInfo",
    icon: PlusCircle,
    component: YourInfo,
  },
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
  "#000000",
  "#dddddd",
  "#FFFEFE",
  "#26408B",
  "#48BF84",
  "#D64045",
  "#FFC145",
];

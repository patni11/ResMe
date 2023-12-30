import Dark from "@/components/CoverLetter/Templates/Dark";
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
    name: "Shubh Patni",
    email: "shubhpatni2002@gmail.com",
    website: "https://shubhpatni.com",
    phone: "7742361132",
    address: "291 Saint Botolph Street, Boston MA, 02115",
  },
  jobDescription: "This is the Job Description",
  text: `Dear Ms. Reader,
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas congue, arcu a ornare dictum, nisl neque aliquet est, et ultricies arcu mauris vel velit. Curabitur porta feugiat imperdiet. Duis id turpis scelerisque, cursus mauris iaculis, tempus orci. Nulla ornare eu augue nec pharetra. Aliquam erat volutpat. Suspendisse sagittis venenatis enim, eget porta nibh malesuada ut. Nullam feugiat euismod leo nec congue. Vivamus aliquet tellus pharetra massa rutrum convallis. Integer posuere massa nec iaculis ullamcorper. Curabitur ligula nunc, tincidunt ac lorem facilisis, euismod feugiat tellus. In et consequat augue. Etiam fermentum nibh nisi, vitae mattis dolor consequat vitae. 
  Integer risus nunc, mattis in ornare sit amet, aliquam quis ligula. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Ut mauris massa, iaculis non augue vitae, mattis tincidunt turpis. In laoreet turpis leo, ut laoreet leo blandit feugiat. 
  Nullam vel ornare justo. Vivamus at lectus sodales, molestie orci vel, facilisis mi. In vel sem nec odio facilisis laoreet. Vivamus vitae orci eget erat euismod pretium non ut urna. Mauris quis velit ut libero sollicitudin aliquet. Donec eu leo finibus, euismod lectus sed, accumsan enim. 
  Duis sit amet erat sit amet nulla aliquam ullamcorper sagittis non lectus. Nam eget bibendum lorem, eu suscipit nulla. Phasellus arcu velit, vestibulum viverra malesuada sit amet, varius vitae mauris. Donec mollis laoreet mollis. Nullam malesuada tempus volutpat. Cras aliquam luctus suscipit. In sollicitudin risus ut pulvinar dignissim. 
  Sincerely,`,
};

export type TemplateMeta = {
  id: string;
  name: string;
  preview: StaticImageData;
  component: React.FC;
};

import ResumeCardImageImage from "@/public/resumeCard.png";

export const templateMap: Record<string, TemplateMeta> = {
  Gojo: {
    id: "Gojo",
    name: "Gojo",
    preview: ResumeCardImageImage,
    component: Gojo,
  },
  Kakarot: {
    id: "Kakarot",
    name: "Kakarot",
    preview: ResumeCardImageImage,
    component: Kakarot,
  },
  Light: {
    id: "Light",
    name: "Light",
    preview: ResumeCardImageImage,
    component: Light,
  },
  Kakashi: {
    id: "Kakashi",
    name: "Kakashi",
    preview: ResumeCardImageImage,
    component: Kakashi,
  },
  Kilua: {
    id: "Kilua",
    name: "Kilua",
    preview: ResumeCardImageImage,
    component: Kilua,
  },
  temp6: {
    id: "temp6",
    name: "Temp6",
    preview: ResumeCardImageImage,
    component: Dark,
  },
  temp7: {
    id: "temp7",
    name: "Temp7",
    preview: ResumeCardImageImage,
    component: Dark,
  },
  temp8: {
    id: "temp8",
    name: "Temp8",
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
import AI from "@/components/CoverLetter/RightSidebar/sections/AI";
import Gojo from "@/components/CoverLetter/Templates/Gojo/Gojo";
import Kakarot from "@/components/CoverLetter/Templates/Kakarot/Kakarot";
import YourInfo from "@/components/CoverLetter/RightSidebar/sections/UserData";
import Light from "@/components/CoverLetter/Templates/Light/Light";
import Kakashi from "@/components/CoverLetter/Templates/Kakashi/Kakashi";
import Kilua from "@/components/CoverLetter/Templates/Kilua/Kilua";

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
  "#F1F5F2",
  "#26408B",
  "#48BF84",
  "#D64045",
  "#FFC145",
];

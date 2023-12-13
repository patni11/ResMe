import { ReactElement } from "react";

export interface CoverLetterSettings {
  bgColor: string;
  fontColor: string;
  fontFamily: string;
  fontSize: string;
  headerSize: string;
  documentType: "A4" | "Letter";
}

export const initialCoverLetterSettings: CoverLetterSettings = {
  bgColor: "0xFFFFFF",
  fontColor: "0x000000",
  fontFamily: "Merriweather",
  fontSize: "9",
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

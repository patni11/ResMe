"use server";
import connectMongoDB from "../mongodb";
import { Resume } from "@/models/user";

export async function createResume({
  email,
  resumeId, // This is the custom ID you want to use for the resume
  resumeName,
  skills,
  languages,
  interests,
  educations,
  certificates,
  experiences,
  // projects,
  headerInfo,
}: {
  email: string;
  resumeId: string; // Ensure that this is a valid MongoDB ObjectId string if you want it to be the _id
  resumeName: string;
  skills: string[];
  languages: string[];
  interests: string[];
  educations: any[]; // Replace 'any' with the actual type
  certificates: any[]; // Replace 'any' with the actual type
  experiences: any[]; // Replace 'any' with the actual type
  // projects: any[]; // Replace 'any' with the actual type
  headerInfo: any[]; // Replace 'any' with the actual type
}): Promise<{
  isError: boolean;
  isSuccess: boolean;
  error?: string;
  message?: string;
  statusCode?: string;
}> {
  try {
    connectMongoDB();

    const newResume = new Resume({
      _id: resumeId,
      email,
      resumeName,
      skills,
      languages,
      interests,
      educations,
      certificates,
      experiences,
      //projects,
      headerInfo,
    });
    console.log("Saved Resume");

    await newResume.save();

    return {
      isError: false,
      isSuccess: true,
    };
  } catch (e: any) {
    if (e.code == "11000") {
      //   throw new Error(`You already have that resume. Please try again`);
      return {
        isError: true,
        isSuccess: false,
        error: e.error,
        message: e.message,
        statusCode: e.response.status,
      };
    } else {
      return {
        isError: true,
        isSuccess: false,
        error: e.error,
        message: e.message,
        statusCode: e.code,
      };
    }
  }
}

"use server";
import connectMongoDB from "../mongodb";
import { Resume, User } from "@/models/user";
import { ResumeType } from "../types";
import { UTApi } from "uploadthing/server";
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
  projects,
  headerInfo,
}: {
  email: string;
  resumeId: string; // Ensure that this is a valid MongoDB ObjectId string if you want it to be the _id
  resumeName: string;
  skills: string[];
  languages: string[];
  interests: string[];
  educations: any; // Replace 'any' with the actual type
  certificates: any; // Replace 'any' with the actual type
  experiences: any; // Replace 'any' with the actual type
  projects: any; // Replace 'any' with the actual type
  headerInfo: any; // Replace 'any' with the actual type
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
      projects,
      headerInfo,
      pdfLink: "",
    });
    //console.log("Saved Resume", newResume);

    await newResume.save();

    await User.findOneAndUpdate(
      { email: email },
      {
        $inc: { resumeCount: 1 },
        $push: { resumes: resumeId },
      },
      { new: true } // Return the updated document
    );

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
        statusCode: e.code,
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

export async function fetchResume(resumeId: string): Promise<ResumeType> {
  try {
    //const email = await getUserEmailFromSession();
    await connectMongoDB();
    const resume: ResumeType | null = await Resume.findOne({
      _id: resumeId,
    }).lean();
    if (!resume) {
      throw new Error(`Resume Not Found`);
    }

    return resume;
  } catch (error: any) {
    throw new Error(`Failed to fetch resume: ${error.message}`);
  }
}

export async function getPDFLink(resumeId: string) {
  try {
    // Connect to the MongoDB server
    const db = await connectMongoDB();
    if (!db) {
      throw new Error(`Connection Failed`);
    }

    // Find the resume by ID and only return the pdfLink field
    const resume = await Resume.findOne({ _id: resumeId }, "pdfLink");

    if (!resume) {
      throw new Error(`Resume not found`);
    }

    return resume.pdfLink;
  } catch (err) {
    console.error("Error fetching resume pdfLink:", err);
    throw err; // Rethrow the error for the caller to handle
  }
}

export async function updatePDFLink(resumeId: string, newResumeLink: string) {
  try {
    // Connect to the MongoDB server
    const db = await connectMongoDB();
    if (!db) {
      throw new Error(`Connection Failed`);
    }

    // Update the resume with the new name
    await Resume.findOneAndUpdate(
      { _id: resumeId }, // Ensure that the resume belongs to the user
      {
        $set: { pdfLink: newResumeLink }, // Set the new resume name
      }
    );
  } catch (err) {
    console.error("Error updating resume name:", err);
    throw err; // It's often a good idea to rethrow the error so that the caller can handle it
  }
}

export async function deleteResume(
  resumeId: string,
  email: string
): Promise<{
  isError: boolean;
  isSuccess: boolean;
  error?: string;
  message?: string;
  statusCode?: string;
}> {
  try {
    // Connect to the MongoDB server
    const db = await connectMongoDB();
    if (!db) {
      throw new Error(`Connection Failed`);
    }
    // Get a reference to the database
    // List all collections in the database

    try {
      const existingLink = await getPDFLink(resumeId);
      if (existingLink) {
        // delete from upload thing

        const utapi = new UTApi();
        await utapi.deleteFiles(existingLink);
      }
    } catch (e) {
      console.log("No Resume Link", e);
    }

    await Resume.deleteOne({ _id: resumeId });

    await User.findOneAndUpdate(
      { email: email },
      {
        $inc: { resumeCount: -1 }, // Decrement resumeCount by 1
        $pull: { resumes: resumeId }, // Remove the resumeId from the resumes array
      },
      { new: true } // Return the updated document
    );

    return {
      isError: false,
      isSuccess: true,
    };
  } catch (e: any) {
    return {
      isError: true,
      isSuccess: false,
      error: e.error,
      message: e.message,
      statusCode: e.code,
    };
  }
}

export async function updateResumeName(
  resumeId: string,
  newResumeName: string
) {
  try {
    // Connect to the MongoDB server
    const db = await connectMongoDB();
    if (!db) {
      throw new Error(`Connection Failed`);
    }

    // Update the resume with the new name
    await Resume.findOneAndUpdate(
      { _id: resumeId }, // Ensure that the resume belongs to the user
      {
        $set: { resumeName: newResumeName }, // Set the new resume name
      }
    );
  } catch (err) {
    console.error("Error updating resume name:", err);
    throw err; // It's often a good idea to rethrow the error so that the caller can handle it
  }
}

export async function updateResume({
  email,
  resumeId, // This is the custom ID you want to use for the resume

  skills,
  languages,
  interests,
  educations,
  certificates,
  experiences,
  projects,
  headerInfo,
}: {
  email: string;
  resumeId: string; // Ensure that this is a valid MongoDB ObjectId string if you want it to be the _id

  skills: string[];
  languages: string[];
  interests: string[];
  educations: any; // Replace 'any' with the actual type
  certificates: any; // Replace 'any' with the actual type
  experiences: any; // Replace 'any' with the actual type
  projects: any; // Replace 'any' with the actual type
  headerInfo: any; // Replace 'any' with the actual type
}): Promise<{
  isError: boolean;
  isSuccess: boolean;
  error?: string;
  message?: string;
  statusCode?: string;
}> {
  try {
    connectMongoDB();
    await Resume.findOneAndUpdate(
      { _id: resumeId },
      {
        skills: skills,
        languages: languages,
        interests: interests,
        educaitons: educations,
        certificates: certificates,
        experiences: experiences,
        projects: projects,
        headerInfo: headerInfo,
      }
    );
    return {
      isError: false,
      isSuccess: true,
    };
  } catch (e: any) {
    return {
      isError: true,
      isSuccess: false,
      error: e.error,
      message: e.message,
      statusCode: e.code,
    };
  }
}

export async function fetchResumeSection(
  resumeId: string,
  resumeSection: string
) {
  try {
    //const email = await getUserEmailFromSession();
    await connectMongoDB();
    const sectionInfo = await Resume.findOne({ _id: resumeId })
      .select(resumeSection)
      .lean();
    if (!sectionInfo) {
      throw new Error(`Info Not Found`);
    }

    return sectionInfo;
  } catch (error: any) {
    throw new Error(`Failed to fetch info: ${error.message}`);
  }
}

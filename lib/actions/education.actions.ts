"use server";

import { Education } from "@/models/user";
import connectMongoDB from "../mongodb";
import { revalidatePath } from "next/cache";
import { EducationType } from "@/app/(mainApp)/education/pageTypes";
import mongoose from "mongoose";

export async function fetchEducation(email: string) {
  try {
    await connectMongoDB();
    const education: EducationType[] = await Education.find({
      email: email,
    });

    if (!education) {
      throw new Error(`No Educaiton Found`);
    }
    return education;
  } catch (error: any) {
    console.log("Failed to fetch user", error);
    throw new Error(`Failed to fetch educations: ${error.message}`);
  }
}

export async function updateEducation(
  education: EducationType,
  email: string,
  path?: string
): Promise<void> {
  try {
    connectMongoDB();
    await Education.findOneAndUpdate(
      { _id: education._id },
      {
        schoolName: education.schoolName,
        major: education.major,
        degreeType: education.degreeType,
        gpa: mongoose.Types.Decimal128.fromString(
          education.gpa ? education.gpa?.toString() : ""
        ),
        startDate: education.startDate,
        endDate: education.endDate,
        _id: education._id,
        email: email,
      },
      {
        upsert: true,
      }
    );

    if (path) {
      revalidatePath(path);
    }
  } catch (e) {
    throw new Error(`Failed to create/update education: ${e}`);
  }
}

export async function deleteEducation(id: string, path?: string) {
  const educaiton = await Education.findById(id);
  if (!educaiton) {
    throw new Error("Project not found");
  }

  await Education.deleteOne({ _id: educaiton._id });
  if (path) {
    revalidatePath(path);
  }
}

"use server";

import { Experience } from "@/models/user";
import connectMongoDB from "../mongodb";
import { revalidatePath } from "next/cache";
import { Experience as ExperienceType } from "@/lib/types/types";

export async function fetchExperiences(email: string) {
  try {
    await connectMongoDB();
    const experience: ExperienceType[] = await Experience.find({
      email: email,
    }).lean();
    if (!experience) {
      throw new Error(`No Experience Found`);
    }

    return experience;
  } catch (error: any) {
    console.log("Failed to fetch user", error);
    throw new Error(`Failed to fetch experiences: ${error.message}`);
  }
}

export async function updateExperience(
  experience: ExperienceType,
  email: string,
  path?: string
): Promise<void> {
  try {
    connectMongoDB();
    await Experience.findOneAndUpdate(
      { _id: experience._id },
      {
        company: experience.company,
        location: experience.location,
        positionTitle: experience.positionTitle,
        experienceType: experience.experienceType,
        startDate: experience.startDate,
        endDate: experience.endDate,
        link: experience.link,
        description: experience.description
          .split("\n")
          .filter((item) => item.trim() !== ""),
        _id: experience._id,
        email: email,
      },
      {
        upsert: true,
      }
    );

    revalidatePath(path || "/experience");
  } catch (e) {
    throw new Error(`Failed to create/update experience: ${e}`);
  }
}

export async function deleteExperience(id: string, path?: string) {
  const experience = await Experience.findById(id);
  if (!experience) {
    throw new Error("Project not found");
  }

  await Experience.deleteOne({ _id: experience._id });
  revalidatePath(path || "/experience");
}

"use server";

import { Project } from "@/models/user";
import connectMongoDB from "../mongodb";
import { revalidatePath } from "next/cache";
import { Project as ProjectType } from "@/app/(mainApp)/projects/pageTypes";

export async function fetchUserProjects(email: string) {
  try {
    await connectMongoDB();
    const projects = await Project.find({ email: email });
    if (!projects) {
      throw new Error(`No Projects Found`);
    }

    return projects;
  } catch (error: any) {
    //console.log("Failed to fetch projects", error);
    throw new Error(`Failed to fetch projects: ${error.message}`);
  }
}

export async function updateProject(
  project: ProjectType,
  email: string,
  path?: string
): Promise<void> {
  try {
    connectMongoDB();
    await Project.findOneAndUpdate(
      { _id: project.id },
      {
        projectName: project.projectName,
        location: project.location,
        positionTitle: project.positionTitle,
        startDate: project.startDate,
        endDate: project.endDate,
        description: project.description,
        email: email,
      },
      {
        upsert: true,
      }
    );

    if (path === "/projects") {
      revalidatePath(path);
    }
  } catch (e) {
    throw new Error(`Failed to create/update userData: ${e}`);
  }
}
